import sys
import json
import pickle
import pandas as pd

# Load the pre-trained model
with open('SalaryPrediction.pkl', 'rb') as f:
    model = pickle.load(f)
    
# Read data from stdin
json_data = sys.stdin.read()
data = json.loads(json_data)

# Perform the prediction
df = pd.DataFrame(data, orient='index', columns=['role, salary'])
predictions = model.predict(df)
print(predictions)