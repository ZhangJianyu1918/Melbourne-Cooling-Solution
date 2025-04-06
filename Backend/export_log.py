import boto3
import time
import os
from datetime import datetime, timedelta

logs_client = boto3.client('logs')

# 设置：日志组名称和 S3 bucket
LOG_GROUP_PREFIX = '/aws/lambda/'
LAMBDA_FUNCTION_NAME_LIST = ['get_drinking_fountains', 'get_cooling_place', 'export_log']
S3_BUCKET = 'fit5120-bucket'
S3_PREFIX = 'lambda-logs/'

def lambda_handler(event, context):
    # 设置导出时间范围（前一天）
    now = datetime.utcnow()
    start = int((now - timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0).timestamp() * 1000)
    end = int((now - timedelta(days=1)).replace(hour=23, minute=59, second=59, microsecond=999000).timestamp() * 1000)
    
    
    for function_name in LAMBDA_FUNCTION_NAME_LIST:
        log_group = f'/aws/lambda/{function_name}'
        task_name = f"export-{function_name}-{start}-{end}"
        s3_prefix = f"{S3_PREFIX}{function_name}"
        time.sleep(2)
        try:
            response = logs_client.create_export_task(
                logGroupName=log_group,
                fromTime=start,
                to=end,
                destination=S3_BUCKET,
                destinationPrefix=s3_prefix,
                taskName=task_name
            )
            print(f"[✓] Export task created for {function_name}: {response['taskId']}")
        except Exception as e:
            print(f"[✗] Failed to create export task for {function_name}: {str(e)}")
