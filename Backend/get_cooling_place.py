import json
import boto3
import os

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
    
    try:
        response = table.scan()
        items = response.get('Items', [])
        
        return {
            'statusCode': 200,
            "headers": headers,
            'body': json.dumps(items),
            
        }
    except Exception as e:
        return {
            'statusCode': 500,
            "headers": headers,
            'body': json.dumps({'error': str(e)}),
            
        }
