from flask import Flask, session, request, jsonify
import pyrebase
from bot import get_response
from flask_cors import CORS
import os

from db import get, save

app = Flask(__name__)
CORS(app, origins='*')

config = {
    'apiKey': os.getenv('firebase_apikey'),
    'authDomain': "vegachat.firebaseapp.com",
    'projectId': "vegachat",
    'storageBucket': "vegachat.appspot.com",
    'messagingSenderId': "518749814892",
    'appId': "1:518749814892:web:2924b89034ab4b587bd849",
    'measurementId': "G-XTLSJJLQL5",
    'databaseURL': ''
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

app.secret_key = 'secret'

@app.route('/')
def message():
    return "Hey there. Veguinha's house"

@app.route('/auth', methods=['POST', 'GET'])
def authentication():
    data = request.json

    if 'user' in session:
        return jsonify({
            'success': True,
            'email': session['user']
        })

    if request.method == 'POST':
        email = data.get('email')
        password = data.get('pwd')
        type = data.get('type')

        try:
            if type == 'login':
                user = auth.sign_in_with_email_and_password(email, password)
                session['user'] = email
                user['localId']
                return jsonify({
                    'success': True,
                    'email': user['email'],
                    'uid': user['localId']
                })

        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e)
            })
        
        try:
            if type == 'register':
                user = auth.create_user_with_email_and_password(email, password)
                verify = auth.send_email_verification(user['idToken'])
                print(verify)

                return jsonify({
                    'success': True,
                    'email': user['email'],
                    'uid': user['localId'],
                })
        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e)
            })

        try:
            if type == 'reset':
                auth.send_password_reset_email(email)
                return jsonify({
                    'success': True,
                    'email': email
                })
        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e)
            })


@app.route('/predict', methods=['POST'])
def chat(): 
    data = request.json
    messages_remaning = int(request.headers['Messages-Remaining'])
    authorization = str(request.headers['Authorization'])

    if(len(authorization) < 1 and messages_remaning < 1):
        return jsonify({"error": "No messages left"})

    user_input = data.get('input')
    user_id = data.get('userId')
    bot_response = get_response(user_id, user_input)

    if "error" in bot_response:
        return jsonify({"error": bot_response['error']})

    if (len(authorization) > 1):
        messages = {
            'usermail': authorization,
            'message': {
                'id': data.get('messageId'),
                'content': user_input,
                'result': bot_response['result']
            }
        }
        save(messages)
        response = { 'result': bot_response['result'], 'source': bot_response['source'] }
        return jsonify(response)
    
    else:
        response = { 'result': bot_response['result'], 'source': bot_response['source'] }
        return jsonify(response)

@app.route('/messages', methods=['GET'])
def getMessages():
    authorization = str(request.headers['Authorization'])

    if (len(authorization) <= 1):
        return []

    response = get(authorization)

    return jsonify(response)

@app.route('/save', methods=['POST'])
def saveMessages():
    data = request.json
    authorization = str(request.headers['Authorization'])

    if (len(authorization) <= 1):
        return jsonify({"error": "Invalid authorization"})

    messages_before = data.get('messages')

    for item in messages_before:
        message_schema = {
            'usermail': authorization,
            'message': item
        }
        save(message_schema)

    return jsonify({'status': 'success'})



if __name__ == '__main__':
    app.run(port=8000)