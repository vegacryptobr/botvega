from pymongo import MongoClient

connection_string = 'mongodb+srv://contato:CteiAQXCUEndmLfy@cluster0.0rsinh8.mongodb.net/?retryWrites=true&w=majority'
client = MongoClient(connection_string)
db_connection = client["Cluster0"]

collection = db_connection.get_collection('user_messages')

def get(email):
    search_filter = {"usermail": email}
    response = collection.find(search_filter)

    messages = []

    for item in response:
        messages.append(item.get('message'))

    return messages

def save(message):
    collection.insert_one(message)
