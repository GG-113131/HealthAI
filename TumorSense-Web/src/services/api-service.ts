
interface PredictionResponse {
  class: string;
  confidence: number;
}

// Function to upload image to Cloudinary
export const uploadToCloudinary = async (file: File): Promise<string> => {
  try {
    const CLOUDINARY_CLOUD_NAME = "dhkx7ugw0";
    const UPLOAD_PRESET = "ml_default"; // Using unsigned upload preset

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Cloudinary error:", data);
      throw new Error(data.error?.message || "Failed to upload image");
    }

    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

// Function to get prediction from API
export const getPrediction = async (imageUrl: string): Promise<PredictionResponse> => {
  try {
    const response = await fetch("https://api-6903.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_url: imageUrl }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to get prediction");
    }

    return data;
  } catch (error) {
    console.error("Error getting prediction:", error);
    throw error;
  }
};

// Combined function to handle the full process
export const processImage = {
  uploadToCloudinary,
  getPrediction,
  async process(file: File): Promise<{
    imageUrl: string;
    diagnosis: string;
    confidence: number;
  }> {
    // Upload to Cloudinary
    const imageUrl = await uploadToCloudinary(file);
    
    // Get prediction
    const prediction = await getPrediction(imageUrl);
    
    // Return combined result
    return {
      imageUrl,
      diagnosis: prediction.class,
      confidence: Math.round(prediction.confidence * 100),
    };
  }
};
