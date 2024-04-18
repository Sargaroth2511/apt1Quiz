import json

source_path = 'S:\\it-quiz\\src\\JSON\\realQuestions.JSON'
destination_path = 'S:\\it-quiz\\src\\JSON\\realQuestionsIndexed.JSON'

def addIndexToQuestions():

    try:
        with open(source_path, mode='r', encoding='utf-8') as source_file:
            data = json.load(source_file)
            questions = data['aufgaben']

            for index, question in enumerate(questions):
                question['index'] = index
                print(question)

        with open(destination_path, mode='w', encoding='utf-8') as destination_file:
            json.dump(data, destination_file, ensure_ascii=False, indent=2)

    except Exception as e:
        print(f'Ein Fehler ist aufgetreten: {e}')


addIndexToQuestions()
