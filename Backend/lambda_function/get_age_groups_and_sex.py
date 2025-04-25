import json
import pymysql
import os
from decimal import Decimal
import boto3
from botocore.exceptions import ClientError
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import base64

# 环境变量配置
rds_host = os.environ['RDS_HOST']
db_user = os.environ['DB_USER']
db_password = os.environ['DB_PASSWORD']
db_name = os.environ['DB_NAME']
AES_KEY = os.environ['AES_KEY'].encode('utf-8')
AES_IV = os.environ['AES_IV'].encode('utf-8')

# 初始化 KMS 客户端（如需要使用）
kms_client = boto3.client('kms')

# 加密数据函数
def encrypt_data(data):
    try:
        data_json = json.dumps(data, cls=DecimalEncoder)
        data_bytes = data_json.encode('utf-8')
        padded_data = pad(data_bytes, AES.block_size)

        cipher = AES.new(AES_KEY, AES.MODE_CBC, AES_IV)
        encrypted_bytes = cipher.encrypt(padded_data)
        encrypted_data = base64.b64encode(encrypted_bytes).decode('utf-8')

        return encrypted_data
    except Exception as e:
        print(f"Encryption failed: {e}")
        return None

# JSON 编码器处理 Decimal 类型
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super().default(obj)

# 主处理函数
def lambda_handler(event, context):
    try:
        connection = pymysql.connect(
            host=rds_host,
            user=db_user,
            password=db_password,
            database=db_name
        )

        with connection.cursor() as cursor:
            sql = "SELECT * FROM age_groups_and_sex"
            cursor.execute(sql)
            rows = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]

            data = []
            for row in rows:
                row_dict = {}
                for key, value in zip(columns, row):
                    row_dict[key] = float(value) if isinstance(value, Decimal) else value
                data.append(row_dict)

        encrypted = encrypt_data(data)

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET'
            },
            'body': json.dumps({
                'message': 'Successfully',
                'data': encrypted
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
