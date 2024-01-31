'''Turns CSV to JSON'''

import csv
import json

# Define the CSV input file and JSON output file paths
csv_file_path = 'C:/Users/IT-User/OneDrive/UmschulungPrivat/apt1-project/public/CSV/apt1Quiz.csv'
json_file_path = 'C:/Users/IT-User/OneDrive/UmschulungPrivat/apt1-project/src/JSON/quizlet.json'

# Initialize an empty list to store the CSV data
data = []

# Read the CSV file and convert it to a list of dictionaries
with open(csv_file_path, mode='r', newline='', encoding='utf-8-sig') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        data.append(row)

# Write the data to a JSON file
with open(json_file_path, mode='w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=2)

print(f'CSV data has been successfully converted to JSON and saved to {json_file_path}')
