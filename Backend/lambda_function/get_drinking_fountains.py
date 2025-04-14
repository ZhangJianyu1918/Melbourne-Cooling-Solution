import json
import boto3 # type: ignore
import os
import base64
from decimal import Decimal
from Crypto.Cipher import AES # type: ignore
from Crypto.Util.Padding import pad, unpad # type: ignore
import pymysql
from botocore.exceptions import ClientError


rds_host = os.environ['RDS_HOST']
db_user = os.environ['DB_USER']
db_password = os.environ['DB_PASSWORD']
db_name = os.environ['DB_NAME']

# 从环境变量中读取 AES 密钥和初始化向量
AES_KEY = os.environ['AES_KEY'].encode('utf-8')
AES_IV = os.environ['AES_IV'].encode('utf-8')

# 加密函数
def encrypt_data(data):
    try:
        if not data:
            raise ValueError("No data to encrypt")
        
        # 将数据转换为 JSON 字符串
        data_json = json.dumps(data, cls=DecimalEncoder)
        
        # 将字符串转换为字节数据
        data_bytes = data_json.encode('utf-8')
        
        # 创建 AES 加密器
        cipher = AES.new(AES_KEY, AES.MODE_CBC, AES_IV)
        
        # 填充数据，确保其长度是 AES 块大小的倍数
        padded_data = pad(data_bytes, AES.block_size)
        
        # 加密数据
        encrypted_bytes = cipher.encrypt(padded_data)
        
        # 将加密后的字节数据转换为 base64 编码的字符串
        encrypted_data = base64.b64encode(encrypted_bytes).decode('utf-8')
        
        print(f"Encrypted data: {encrypted_data}")
        return encrypted_data
    except Exception as e:
        print(f"Encryption failed: {e}")
        return None

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)


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
            sql = "SELECT * FROM drinking_fountains"
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
                'data': encrypt_data(data)
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