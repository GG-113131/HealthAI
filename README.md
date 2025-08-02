# MedLog + TumorSense: Personal Health Tracker with AI Brain Tumor Detection

Welcome to **MedLog**, a comprehensive personal health tracking app designed to help you manage your medications, health metrics, and treatments securely and efficiently. Alongside MedLog, this project includes **TumorSense**, an advanced AI-powered feature for brain tumor detection from MRI scans.

---

## 🚀 Overview

### MedLog – Your Personal Health Companion
MedLog is a secure, easy-to-use health tracking app that enables users to:
- Log and monitor general health data such as symptoms and vitals
- Track medications including name, dosage, and frequency
- Record ongoing and past treatments
- Securely save all personal health data with Firebase Firestore
- Authenticate via Firebase Authentication (email or Google login)

### TumorSense – AI Brain Tumor Detection
TumorSense leverages artificial intelligence to detect brain tumors from MRI images quickly and accurately.

- Upload MRI scans and receive instant predictions
- Powered by a lightweight, efficient AI model trained with TensorFlow and Teachable Machine
- Available both as an integrated feature in MedLog and as a standalone web app in this repo

---

## 💻 Project Components

| Component           | Description                                       | Technology Stack                              |
|---------------------|-------------------------------------------------|-----------------------------------------------|
| **MedLog (Mobile)** | Personal health tracker app                      | Thunkable (cross-platform mobile)              |
| **TumorSense (Web)**| AI-based brain tumor detection web app          | React + Vite, hosted on Vercel                  |
| **Backend API**     | AI prediction service for brain tumor detection | Flask (Python), hosted on Render                 |
| **ML Model**        | Brain tumor CNN model                             | TensorFlow, Teachable Machine (TFLite format)  |
| **Image Handling**  | MRI image upload and storage                      | Cloudinary                                      |
| **User Data & Auth**| Secure data storage and Authentication           | Firebase Authentication + Firestore             |

---

## 🧠 TumorSense – AI Brain Tumor Detection

TumorSense processes grayscale MRI images to detect the presence or absence of brain tumors with high accuracy and speed.

### Model Details
- **Architecture:** Convolutional Neural Network (CNN)
- **Framework:** TensorFlow + Teachable Machine
- **Input:** 224 x 224 pixels grayscale MRI images
- **Inference time:** ~0.3 seconds (on Render’s 0.1 CPU, 512MB RAM instance)

### Usage
Users upload an MRI image via the mobile app or web app; the image is stored on Cloudinary, then the URL is sent to the Flask API backend for prediction.

---

## 📡 API Endpoint

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

Features:
- Upload MRI images from your phone
- Cloudinary integration for image hosting
- Secure user authentication with Firebase Auth
- Seamless interaction with the Flask API for tumor detection
- Personal health management with MedLog

---

## 🌐 Web App (React + Vite)

- Access TumorSense as a standalone brain tumor detection web app
- Upload MRI images directly through your browser
- Powered by the same Flask backend API hosted on Render
- Visit [TumorSense Web App](https://health-ai-seven.vercel.app/) to try

---

## 🔐 Security & Data Privacy

- User data is encrypted and securely stored using Firebase Firestore
- Authentication via Firebase ensures secure user access (supports email & Google sign-in)
- Images are uploaded to Cloudinary with secure URLs

---

## 📊 Model Training & Accuracy

The included model was trained and evaluated using MRI datasets to ensure reliable accuracy.  
![Model Metrics](ReadMe%20Assets/Model%20Metrics.png)

---

## 🎥 Demo Videos and Live Links

- **Mobile App Demo Video:** Watch a walkthrough of MedLog and TumorSense on mobile [Watch here](https://drive.google.com/file/d/1l4Vp8z7neR-Px5p4L53N2KrDT4VRJyWR/view?usp=sharing)
- **TumorSense Web App:** Experience the standalone AI tumor detection in your browser [https://health-ai-seven.vercel.app/](https://health-ai-seven.vercel.app/)
- **API Endpoint:** Direct prediction service URL (for developers) [https://api-6903.onrender.com/predict](https://api-6903.onrender.com/predict)

---

## 👨‍💻 Developers & Contributors

- Goutham Krishna D  
- Govind Krishna D  
*Students at Indian School Al Seeb, Muscat, Oman*

---

## 📂 Repository Structure & Additional Info

This GitHub repo includes:
- The full MedLog mobile app project (Thunkable)
- The TumorSense React web app code
- Flask backend API for tumor prediction
- Machine learning model files and training resources

---

Thank you for exploring **MedLog + TumorSense** — your all-in-one solution for personal health management and brain tumor detection via AI.
