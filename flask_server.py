import os
import json
import random
from flask import Flask, request, jsonify, render_template, Blueprint
import requests
from dotenv import load_dotenv

load_dotenv()

CHATGPT_API_KEY = os.getenv('CHATGPT_API_KEY')

app = Flask(__name__)

quiz_bp = Blueprint('quiz', __name__,
                    template_folder='it_quiz/templates',
                    static_folder='it_quiz/static',
                    static_url_path='/it_quiz/static')



@app.route('/api/chatgpt', methods=['POST'])
def chatgpt():
    try:
        data = request.json
        user_answer = data.get('userAnswer')
        system_content = data.get('systemContent')
        correct_answer = data.get('correctAnswer')
        question = data.get('question')

        payload = {
            "model": "gpt-4",
            "messages": [
                {
                    "role": "system",
                    "content": system_content,
                },
                {
                    "role": "user",
                    "content": f'"""1. {question}""", """2. {correct_answer}""", """3. {user_answer}""" ',
                },
            ],
        }

        headers = {
            'Authorization': f'Bearer {CHATGPT_API_KEY}',
            'Content-Type': 'application/json'
        }

        response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=payload, timeout=30)
        response.raise_for_status()  # Raise an HTTPError if the HTTP request returned an unsuccessful status code

        assistant_reply = response.json().get('choices', [])[0].get('message', {}).get('content', '')
        return jsonify({ 'reply': assistant_reply })
    except requests.exceptions.RequestException as e:
        # Log the error and respond with a server error
        print(f"An error occurred: {e}")
        return jsonify({ "error": "An error occurred on the server." }), 500
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred on the server."}), 500



@quiz_bp.route('/quiz')
def quiz():
    return render_template('indexReact.html')



@app.route('/')
def welcome():
    print("Welcome endpoint was called")
    return render_template('index.html')



@app.route('/quizlet', methods=['GET'])
def quizlet():
    try:
        question_number = int(request.args.get('questionNumber'))
        with open('it_quiz/JSONData/quizQuestions.json', 'r', encoding='utf-8') as file:
            data = json.load(file)
            random_elements = get_random_elements_from_array(question_number, data)
            return jsonify(random_elements)
        
    except FileNotFoundError:
        return jsonify({"error": "File not found."}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error parsing JSON data."}), 500
    except ValueError as ve:
        print(f"Value Error: {ve}")
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred on the server."}), 500
    


@app.route('/ihkQuestions', methods=['GET'])
def ihk_questions():
    try:
        question_number = int(request.args.get('questionNumber'))

        with open('it_quiz/JSONData/ihkQuestions.json', 'r', encoding='utf-8') as file:
            data = json.load(file)

            questions = data.get('aufgaben', []) # Empty arr is default value if key 'aufgaben' is not found
            if question_number < 0 or question_number >= len(questions):
                return jsonify({"error": "Invalid question number."}), 400

            question = questions[question_number]
            return jsonify(question)

    except FileNotFoundError:
        return jsonify({"error": "File not found."}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error parsing JSON data."}), 500
    except ValueError as ve:
        print(f"Value Error: {ve}")
        return jsonify({"error": "Invalid input."}), 400
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred on the server."}), 500
    


def get_random_elements_from_array(num, arr):
    if num <= 0:
        raise ValueError("Number of elements must be greater than 0")

    if num >= len(arr):
        return arr[:]  # Return a copy of the entire array

    random_elements = []
    copied_input_arr = arr[:]

    for _ in range(num):
        random_index = random.randrange(len(copied_input_arr))
        random_elements.append(copied_input_arr.pop(random_index))

    return random_elements

app.register_blueprint(quiz_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
