'''Simple File to add Index and Learning Field to quilet Data'''

import json

# Input and output file paths
INPUT_FILE = 'helper/quizlet.json'
OUTPUT_FILE = 'helper/quizletWithIndexAndLF.json'

# Load JSON data from the input file
with open(INPUT_FILE, 'r', encoding='utf-8') as input_file:
    data = json.load(input_file)

# Add an index and custom key-value pair to each object
for index, obj in enumerate(data):
    obj["index"] = index
    if index in range(0, 69):
        obj["LF"] = "LF1"
    if index in range(69, 234):
        obj["LF"] = "LF2"
    if index in range(234, 621):
        obj["LF"] = "LF3"
    if index in range(621, 870):
        obj["LF"] = "LF4"
    if index in range(870, 920):
        obj["LF"] = "LF5"
    if index in range(920, 1213):
        obj["LF"] = "LF6"
    if index in range(1213, 1450):
        obj["LF"] = "LF7"

# Serialize the modified data and save it to the output file
with open(OUTPUT_FILE, 'w', encoding='utf-8') as output_file:
    json.dump(data, output_file, indent=4, ensure_ascii=False)

print("JSON data has been modified and saved to", OUTPUT_FILE)
