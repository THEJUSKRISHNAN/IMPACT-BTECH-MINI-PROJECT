import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pickle

# Load dataset
df = pd.read_csv("landslide_dataset.csv")

# Define feature columns and target column
feature_columns = [
    "Rainfall_mm", "Slope_Angle", "Soil_Saturation", 
    "Vegetation_Cover", "Earthquake_Activity", "Proximity_to_Water",
    "Soil_Type_Gravel", "Soil_Type_Sand", "Soil_Type_Silt"
]
target_column = "Landslide"  # 0 = No landslide, 1 = Landslide

# Prepare input (X) and target (y) variables
X = df[feature_columns]
y = df[target_column]

# Split dataset into training (80%) and testing (20%) sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Convert to DMatrix format (XGBoost optimized structure)
dtrain = xgb.DMatrix(X_train, label=y_train)
dtest = xgb.DMatrix(X_test, label=y_test)

# Set XGBoost parameters
params = {
    "objective": "binary:logistic",  # Binary classification
    "eval_metric": "logloss",  
    "max_depth": 5,  # Depth of trees
    "eta": 0.1,  # Learning rate
    "subsample": 0.8,  # Fraction of training instances used per tree
    "colsample_bytree": 0.8  # Fraction of features used per tree
}

# Train XGBoost model
model = xgb.train(params, dtrain, num_boost_round=100)

# Make predictions
y_pred_prob = model.predict(dtest)
y_pred = [1 if prob >= 0.5 else 0 for prob in y_pred_prob]  # Convert probabilities to 0/1

# Evaluate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save the trained model
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model training complete. Model saved as 'model.pkl'")