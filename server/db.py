from pymongo import MongoClient, errors
import os

connection_string = os.getenv("connection_string")
client = MongoClient(connection_string)
db_connection = client["Cluster0"]

collection = db_connection.get_collection('user_messages')

def get(email):
    search_filter = {"usermail": email}
    response = collection.find(search_filter)

    try:
        response = collection.find(search_filter)
        messages = [item.get('message') for item in response]
        return messages
    except errors.PyMongoError as e:
        print(f"An error occurred: {e}")
        return []

def save(message):
    try:
        collection.insert_one(message)
    except errors.PyMongoError as e:
        print(f"An error occurred: {e}")