import sys
import json
import pickle
import pandas as pd

# Load the pre-trained model
with open('SalaryPrediction.pkl', 'rb') as f:
    model, le_role, le_location = pickle.load(f)
    
# Read data from stdin
json_data = sys.stdin.read()
data = json.loads(json_data)

# Perform the prediction
new_data = pd.DataFrame({
    'role': [data.role],
    'location': [data.location]
})

new_data['role'] = le_role.transform(new_data['role'])
new_data['location'] = le_location.transform(new_data['location'])

prediction = model.predict(new_data)
