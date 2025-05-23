from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image, ImageOps
import numpy as np
import requests
from io import BytesIO
import tensorflow as tf

# Load class labels
with open("labels.txt", "r") as f:
    class_names = [line.strip().split(" ", 1)[1] for line in f.readlines()]

# Load TFLite model and allocate tensors
interpreter = tf.lite.Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()

# Get input and output details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        image_url = data.get("image_url")
        if not image_url:
            return jsonify({"error": "Missing 'image_url' in request"}), 400

        # Download and preprocess the image
        response = requests.get(image_url)
        image = Image.open(BytesIO(response.content)).convert("RGB")
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
        input_data = np.expand_dims(normalized_image_array, axis=0).astype(np.float32)

        # Set tensor to input data
        interpreter.set_tensor(input_details[0]['index'], input_data)

        # Run inference
        interpreter.invoke()

        # Get prediction results
        output_data = interpreter.get_tensor(output_details[0]['index'])
        index = np.argmax(output_data)
        predicted_class = class_names[index]
        confidence = float(output_data[0][index])

        return jsonify({
            "class": predicted_class,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("✅ Flask server running on http://localhost:5000")
    app.run(port=5000)
