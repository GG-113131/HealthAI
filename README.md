# HealthAI: Personal Health Management & AI Brain Tumor Detection

Welcome to **HealthAI**, an all-in-one health platform where you can track personal health, manage medications, and instantly screen for brain tumors from MRI scans using advanced AI.

---

## 🚀 Overview

### What is HealthAI?
HealthAI is a modern health companion—log your health metrics, medications, and treatments in one place. Plus, harness the power of AI with **TumorSense** to analyze MRI scans for brain tumors with just a few taps.

**Main Features:**
- **MedLog:** Track general health data, symptoms, medications, and treatments
- **TumorSense:** Upload and analyze MRI scans for brain tumor detection using AI
- **Secure Cloud Storage:** All health information is safely stored with Firebase
- **Cross-Platform:** Available on mobile (Thunkable) and web (React + Vite)

---

## 💡 Key Features

### 📋 MedLog – Health Tracking

- Log and monitor symptoms, vitals, and general health data
- Record and manage your medications: name, dose, frequency
- Track ongoing and past treatments
- Securely save your personal health data in the cloud
- Sign in easily with email or Google (Firebase Auth)

### 🧠 TumorSense – AI Brain Tumor Detection

- Instantly detect brain tumors from uploaded MRI images
- Powered by a convolutional neural network (TensorFlow + Teachable Machine, TFLite)
- Works seamlessly within HealthAI and as a standalone web app (included in this repo)

---

## 💻 Tech Stack & Components

| Component               | Description                                       | Technology                                 |
|-------------------------|-------------------------------------------------|--------------------------------------------|
| **HealthAI App**        | Full-featured health platform (med log + AI)    | Thunkable (Mobile), React + Vite (Web)    |
| **TumorSense (Web)**    | Standalone brain tumor detection web app        | React + Vite, hosted on Vercel             |
| **Backend API**         | AI prediction endpoint                           | Flask (Python), hosted on Render           |
| **AI Model**            | TumorSense AI (CNN for MRI scans)                | TensorFlow, Teachable Machine (TFLite)     |
| **Image Management**    | MRI image upload and storage                      | Cloudinary                                 |
| **User Data & Auth**    | Secure data storage and authentication            | Firebase Firestore + Auth                   |

---

## 🧪 TumorSense Model Details

- **Architecture:** Convolutional Neural Network (CNN)  
- **Framework:** TensorFlow + Teachable Machine (TFLite)  
- **Input:** 224 x 224 px grayscale MRI images  
- **Speed:** ~0.3 seconds inference on low-resource cloud  
- **Output:** Tumor class and confidence score (see API example below)  

---

## 🔌 API: Brain Tumor Prediction

### POST `/predict`

Send a JSON payload with the MRI image URL for brain tumor classification.

**Request Example:**
{
"image_url": "https://link-to-mri-image.jpg"
}

text

**Response Example:**
{
"class": "Healthy",
"confidence": 0.9989
}

text

---

## 📱 Mobile App (Thunkable)

- Upload MRI images directly from your phone  
- Images are uploaded securely via Cloudinary  
- Results delivered instantly from the Flask API  
- All health data (med log, symptoms, medications) managed in-app  

---

## 🌐 TumorSense Web App

- Analyze MRI scans and get instant results  
- Direct interface to the backend AI prediction service  
- Try it now: [https://health-ai-seven.vercel.app/](https://health-ai-seven.vercel.app/)  

---

## 📄 TumorSense Web App Documentation

For detailed explanations, model training code, deployment (Render) instructions, and additional metrics related to the TumorSense web app, please see:

[📎 Download TumorSense Web App Documentation (PDF)](ReadMe%20Assets/TumorSenseWEB%20Documentation.pdf)

---

## 📊 Model Performance

The model was trained and evaluated with brain MRI datasets for reliable accuracy and fast inference time.

![Model Metrics](ReadMe%20Assets/Model%20Metrics.png)

---

## 🔐 Security & Privacy

- User health data is encrypted and securely stored in Firebase Firestore  
- Authentication is provided via Firebase Authentication (email & Google sign-in)  
- MRI images are stored on Cloudinary with secure URLs   

---

## 🎥 Demo & Live Links

- **Mobile App Demo Video:**  
  [Watch here](https://drive.google.com/file/d/1l4Vp8z7neR-Px5p4L53N2KrDT4VRJyWR/view?usp=sharing)  

- **TumorSense Web App:**  
  [https://health-ai-seven.vercel.app/](https://health-ai-seven.vercel.app/)  

- **TumorSense API Endpoint:**  
  [https://api-6903.onrender.com/predict](https://api-6903.onrender.com/predict)  

---

## 👨💻 Authors

- Goutham Krishna D  
- Govind Krishna D  
*Students, Indian School Al Seeb, Muscat, Oman*

---

## 📂 Repository Contents

This repository includes:
- Full HealthAI mobile/web app (MedLog + TumorSense)  
- Standalone TumorSense web app (React + Vite)  
- Flask AI backend server  
- Machine learning model files and training assets  

---

Thank you for choosing **HealthAI** — your companion for smarter, connected healthcare and instant AI diagnostics.
