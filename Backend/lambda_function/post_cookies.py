import json
import os

def lambda_handler(event, context):

    password = event.get('password', '')
    correct_password = os.environ['CORRECT_PASSWORD']

    if password == correct_password:
        response = {
            'statusCode': 200,
            'body': json.dumps('Correct password!')
        }
    else:
        response = {
            'statusCode': 401,
            'body': json.dumps('Incorrect password!')
        }
    
    return response
