
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ImageUpload } from "@/components/ui/image-upload";
import { ResultsCard } from "@/components/ui/results-card";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Alert } from "@/components/ui/alert";
import { processImage } from "@/services/api-service";

// Define the processing steps
const processingSteps = [
  { id: "upload", message: "Uploading Image" },
  { id: "pushing", message: "Pushing to API" },
  { id: "preprocess", message: "Preprocessing Image" },
  { id: "scanning", message: "Scanning for Tumors" },
  { id: "generating", message: "Generating Results" },
];

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [processing, setProcessing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [processingStartTime, setProcessingStartTime] = useState<number | null>(null);

  const handleImageUpload = (url: string, file: File) => {
    setUploadedImage(url);
    setOriginalFile(file);
    setProcessing(true);
    setCurrentStep(0);
    setProcessingStartTime(Date.now());

    // Process the image with real-time tracking
    processImageWithTracking(file);
  };

  const processImageWithTracking = async (file: File) => {
    try {
      // Start with uploading step
      setCurrentStep(0);
      
      // Track upload to Cloudinary
      const uploadStartTime = Date.now();
      const imageUrl = await processImage.uploadToCloudinary(file);
      
      // Move to pushing to API step
      setCurrentStep(1);
      
      // Track prediction API call
      const predictionStartTime = Date.now();
      const prediction = await processImage.getPrediction(imageUrl);
      
      // Calculate how long the process took
      const processDuration = (Date.now() - uploadStartTime) / 1000;
      
      // Move through remaining steps with short delays
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCurrentStep(3);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCurrentStep(4);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Set the results
      setDiagnosis(prediction.class);
      setConfidence(Math.round(prediction.confidence * 100));
      
      // Show the results after a short delay
      setTimeout(() => {
        setProcessing(false);
        setShowResults(true);
      }, 500);
      
    } catch (error) {
      console.error("Error processing image:", error);
      setDiagnosis("Error in analysis");
      setConfidence(0);
      setProcessing(false);
      setShowResults(true);
    }
  };

  const handleNewScan = () => {
    setShowResults(false);
    setUploadedImage(null);
    setCurrentStep(-1);
    setDiagnosis("");
    setConfidence(0);
    setOriginalFile(null);
    setProcessingStartTime(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background */}
      <BackgroundPaths />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {!showResults && !processing ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <ImageUpload onUpload={handleImageUpload} />
            </motion.div>
          ) : showResults ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md space-y-6"
            >
              <ResultsCard 
                imageSrc={uploadedImage || undefined}
                diagnosis={diagnosis}
                confidence={confidence}
              />
              
              {/* Rainbow Button */}
              <div className="flex justify-center">
                <RainbowButton onClick={handleNewScan}>
                  New Scan
                </RainbowButton>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Processing State */}
      {processing && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 w-full max-w-md px-4"
          >
            <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            
            <div className="space-y-3">
              {processingSteps.map((step, index) => (
                <Alert 
                  key={index}
                  variant={index < currentStep ? "success" : index === currentStep ? "info" : "default"}
                  className={`transition-all duration-300 ${
                    index < currentStep ? "border-emerald-500/50 text-emerald-500" : 
                    index === currentStep ? "border-blue-500/50" : 
                    "opacity-40 border-white/10 text-white/50"
                  } bg-black/80`}
                  icon={
                    index < currentStep ? (
                      <div className="h-4 w-4 rounded-full bg-emerald-500" />
                    ) : index === currentStep ? (
                      <div className="h-4 w-4 rounded-full border-2 border-blue-500 animate-pulse" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-white/20" />
                    )
                  }
                >
                  <p className="text-sm">{step.message}</p>
                </Alert>
              ))}
            </div>
            
            <p className="text-lg font-medium text-white text-center mt-4">
              {currentStep < processingSteps.length 
                ? processingSteps[currentStep]?.message || "Processing..." 
                : "Completed"}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Index;
