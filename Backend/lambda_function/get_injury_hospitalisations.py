import json
import pymysql
import os
from decimal import Decimal
import boto3
from botocore.exceptions import ClientError

rds_host = os.environ['RDS_HOST']
db_user = os.environ['DB_USER']
db_password = os.environ['DB_PASSWORD']
db_name = os.environ['DB_NAME']


# 初始化 KMS 客户端
kms_client = boto3.client('kms')

def decrypt_data(encrypted_data):
    try:
        # 解密数据
        response = kms_client.decrypt(
            CiphertextBlob=encrypted_data
        )
        # 解密后的明文数据
        plaintext = response['Plaintext']
        return plaintext.decode('utf-8')  # 返回明文字符串
    except ClientError as e:
        print(f"Error decrypting data: {e}")
        return None


def convert_decimal(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    elif isinstance(obj, list):
        return [convert_decimal(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: convert_decimal(value) for key, value in obj.items()}
    return obj

def lambda_handler(event, context):
    try:
        connection = pymysql.connect(
            host=rds_host,
            user=db_user,
            password=db_password,
            database=db_name
        )

        with connection.cursor() as cursor:
            sql = "SELECT * FROM injury_hospitalisations"
            cursor.execute(sql)
            rows = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]

            # 将每行转换为字典，并将 Decimal 转为 float
            data = []
            for row in rows:
                row_dict = {}
                for key, value in zip(columns, row):
                    if isinstance(value, Decimal):
                        row_dict[key] = float(value)
                    else:
                        row_dict[key] = value
                data.append(row_dict)

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET'
            },
            'body': json.dumps({
                'message': 'Succesfully',
                'data': data
            }, ensure_ascii=False)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET'
            }, 
            'body': json.dumps({'error': str(e)})
            
        }
