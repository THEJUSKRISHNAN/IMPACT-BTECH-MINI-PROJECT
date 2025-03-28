import pickle
import numpy as np
import pandas as pd
import xgboost as xgb
# from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from flask import Flask, request, jsonify, send_from_directory
from together import Together
import textwrap

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load trained model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

# Define feature columns (must match the model training phase)
feature_columns = [
    "Rainfall_mm", "Slope_Angle", "Soil_Saturation", 
    "Vegetation_Cover", "Earthquake_Activity", "Proximity_to_Water",
    "Soil_Type_Gravel", "Soil_Type_Sand", "Soil_Type_Silt"
]

# Twilio Credentials (Get from Twilio Dashboard)
TWILIO_SID = "twilio_sid_here"
TWILIO_AUTH_TOKEN = "twilio_auth_token_here"
TWILIO_PHONE_NUMBER = "twilio_ponenumber_here"  # Twilio phone number
ADMIN_PHONE_NUMBERS = ["+911234567892"]

# SendGrid API Key (Get from SendGrid Dashboard)
SENDGRID_API_KEY = "your_sendgrid_api_key"
ADMIN_EMAILS = ["email here"]

# Function to send SMS alert
def send_sms_alert(message):
    client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)

    for phone in ADMIN_PHONE_NUMBERS:
        try:
            message_response = client.messages.create(
                body=message,
                from_=TWILIO_PHONE_NUMBER,
                to=phone
            )
            print(f"✅ SMS sent to {phone}! Message SID: {message_response.sid}")
        except Exception as e:
            print(f"❌ SMS Error for {phone}: {e}")

# Function to send Email alert
def send_email_alert(subject, message):
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        for email in ADMIN_EMAILS:
            email_message = Mail(
                from_email="alert@example.com",
                to_emails=email,
                subject=subject,
                plain_text_content=message
            )
            sg.send(email_message)
    except Exception as e:
        print(f"Email Error: {e}")

@app.route("/")
def home():
    return "Landslide Prediction API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Convert data to a Pandas DataFrame
        df = pd.DataFrame([data], columns=feature_columns)
        df = df.apply(pd.to_numeric, errors="coerce")

        # Convert DataFrame to DMatrix format
        dmatrix = xgb.DMatrix(df)

        # Make prediction
        prediction_prob = float(model.predict(dmatrix).item())  # Ensure it's a scalar
        prediction = int(prediction_prob >= 0.5)  # Convert probability to 0 or 1

        # Determine risk level
        risk_level = "High" if prediction == 1 else "Low"

        response = {
            "risk_level": risk_level,
            "prediction_prob": prediction_prob
        }


        # If High Risk, send notifications
        if risk_level == "High":
            alert_message = f"🚨 Landslide Alert! Risk Level: HIGH (Probability: {round(prediction_prob * 100, 4)}).Evacuate quickly"
            # send_sms_alert(alert_message)
            # send_email_alert("Landslide Alert!", alert_message)

        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": str(e)})


# Initialize the Together client
client = Together(api_key="api_key_here")

PROMPT_TEMPLATES = {
    '1': "Provide structured information about the causes of landslides in 100 words.",
    '2': "Explain the warning signs of an impending landslide in 100 words, clearly organized.",
    '3': "Describe the preventive measures to reduce landslide risks in 100 words.",
    '4': "Outline emergency response and safety tips for landslides in 100 words, formatted properly.",
    '5': "Summarize the impact of landslides on the environment and infrastructure in 100 words.",
    '6': "List landslide-prone areas and key risk factors in 100 words.",
    '7': "Debunk common myths and provide facts about landslides in 100 words.",
    '8': "Highlight the role of afforestation in preventing landslides in 100 words.",
    '9': "[Custom] User-defined prompt."
}

def generate_response(category, custom_prompt=None):
    """ Generates a structured AI response limited to 100 words. """
    
    # Construct prompt
    if category == '9' and custom_prompt:
        prompt_text = f"Write a structured response in exactly 100 words: {custom_prompt}"
    else:
        prompt_text = PROMPT_TEMPLATES.get(category, "Invalid category")

    messages = [{"role": "user", "content": prompt_text}]
    
    # Call Together API for response generation
    completion = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        messages=messages
    )

    response_text = completion.choices[0].message.content.strip() if completion.choices else "No response generated."

    # Ensure response is exactly 100 words
    words = response_text.split()
    if len(words) > 100:
        response_text = " ".join(words[:100])  # Trim to 100 words

    # Format response properly
    return "\n\n".join(textwrap.wrap(response_text, width=80))


@app.route("/get-response", methods=["POST"])
def get_bot_response():
    """ Handles requests from the frontend and returns AI-generated responses. """
    
    data = request.json
    category = data.get("category")
    custom_prompt = data.get("custom_prompt", "")

    response = generate_response(category, custom_prompt)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)

