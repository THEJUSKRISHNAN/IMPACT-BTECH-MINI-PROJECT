# **IMPACT: Integrated Modeling for Predictive Analysis and Crisis Tracking**  

## **Overview**  
IMPACT is an advanced disaster management system that integrates predictive analysis and crisis tracking to enhance emergency response and preparedness. This project provides real-time insights into landslide risks, weather conditions, and evacuation planning.  

## **Features**  
- **Landslide Risk Prediction:** Uses machine learning to predict the likelihood of landslides based on environmental factors.  
- **Weather Forecasting:** Fetches real-time weather updates to aid disaster preparedness.  
- **Chatbot Assistance:** Provides instant guidance on emergency response and preparedness.  
- **Emergency Evacuation Route Finder:** Suggests safe locations and evacuation routes during a crisis.  
- **SMS Alert System:** Sends emergency notifications and safety updates.  

## **Tech Stack**  

### **Frontend**  
- React (Vite)  
- Tailwind CSS  
- React Router  

### **Backend**  
- Flask 
- Machine Learning Model (XGBoost for landslide risk prediction)  
- API Integration for real-time weather data  

## **Installation**  

### **Clone the Repository**  
```bash
git clone https://github.com/THEJUSKRISHNAN/IMPACT-BTECH-MINI-PROJECT.git
cd IMPACT-BTECH-MINI-PROJECT
```

### **Frontend Setup**  
```bash
cd frontend
npm install
npm run dev
```

### **Backend Setup**  
```bash
cd backend
python -m venv venv
source venv/bin/activate   # For macOS/Linux
venv\Scripts\activate      # For Windows
pip install -r requirements.txt
python app.py
```

## **Usage**  
- Access the frontend at **[http://localhost:5173](http://localhost:5173)**  
- The backend runs at **[http://127.0.0.1:5000](http://127.0.0.1:5000)**  


