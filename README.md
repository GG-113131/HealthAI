# HealthAI
# 🩺 Health Suite: MedLog & TumorSense

A full-featured health app offering tools for personal health tracking and AI-powered brain tumor detection.

- ✅ **MedLog** – Log and manage health metrics, medications, and treatments  
- 🧠 **TumorSense** – Detect brain tumors from MRI scans using AI (TensorFlow)

📱 Built with **Thunkable** (mobile), **Flask** (backend), and **React + Vite** (web).  
🔐 User authentication and data storage powered by **Firebase**.

---

## 🚀 Live Links

- 📱 **Mobile App Demo Video** – [Watch here](#)
- 🌐 **TumorSense Web App** – [https://your-vercel-app-url.vercel.app](https://your-vercel-app-url.vercel.app)
- 🔗 **API Endpoint** – [https://api-6903.onrender.com/predict](https://api-6903.onrender.com/predict)

---

## 🧰 Tech Stack

| Layer         | Stack                                    |
|---------------|-------------------------------------------|
| Frontend      | Thunkable (Mobile), Vite + React (Web)    |
| Backend       | Flask (Python), Render Web Service        |
| ML Model      | TensorFlow, Teachable Machine (TFLite)    |
| Image Uploads | Cloudinary                                |
| User Data     | Firebase (Auth + Firestore DB)            |

---

## 🧠 TumorSense Workflow

1. User uploads an MRI image via Thunkable or Web App  
2. Image is stored on **Cloudinary**  
3. The image URL is sent via `POST /predict` to the Flask API  
4. The TFLite model returns a prediction with confidence  

---

## 📋 MedLog Features

- Add general health data (e.g. symptoms, BP, sugar levels)  
- Track medications and active treatments  
- Data automatically synced with Firebase Firestore  
- Secure login with Firebase Authentication  

---

## 📡 API Usage

### `POST /predict`

**Request Example:**
```json
{
  "image_url": "https://link-to-mri-image.jpg"
}
