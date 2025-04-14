import json
import boto3
import os
import base64
from decimal import Decimal
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad

AES_KEY = b'MelbourneCooling'
AES_IV = b'MelbourneCooling'

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

def decrypt_data(encrypted_data):
    try:
        encrypted_bytes = base64.b64decode(encrypted_data)
        cipher = AES.new(AES_KEY, AES.MODE_CBC, AES_IV)
        decrypted_bytes = unpad(cipher.decrypt(encrypted_bytes), AES.block_size)
        return json.loads(decrypted_bytes.decode("utf-8"))
    except Exception as e:
        print(f"Decryption failed: {e}")
        return None

def encrypt_data(data):
    try:
        if not data:
            raise ValueError("No data to encrypt")
        
        data_json = json.dumps(data, cls=DecimalEncoder)
        cipher = AES.new(AES_KEY, AES.MODE_CBC, AES_IV)
        padded_data = pad(data_json.encode('utf-8'), AES.block_size)
        encrypted_bytes = cipher.encrypt(padded_data)
        encrypted_data = base64.b64encode(encrypted_bytes).decode('utf-8')
        print(f"Encrypted data: {encrypted_data}")
        return encrypted_data
    except Exception as e:
        print(f"Encryption failed: {e}")
        return None


dynamodb = boto3.resource('dynamodb')
TABLE_NAME = os.getenv('DYNAMODB_TABLE', 'cooling_places')

def lambda_handler(event, context):
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',  # 允许所有源访问
        'Access-Control-Allow-Methods': 'GET,OPTIONS',  # 允许的 HTTP 方法
        'Access-Control-Allow-Headers': 'Content-Type'  # 允许的头部
    }
    table = dynamodb.Table(TABLE_NAME)
    print("Lambda function started")

    try:
        print(f"Using DynamoDB table: {TABLE_NAME}")
        response = table.scan()
        items = response.get('Items', [])
        
        print(f"Retrieved items: {items}")
        encrypted_data = encrypt_data(items)
        print(f"Encrypted data: {encrypted_data}")
        if not encrypted_data:
            return {
                'statusCode': 500,
                'body': json.dumps({'error': 'Encryption failed or no data to encrypt'}),
                'headers': headers
            }
        
        return {
            'statusCode': 200,
            'body': encrypted_data,
            'headers': headers
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}),
            'headers': headers
        }
