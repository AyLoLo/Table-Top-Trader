import boto3
from botocore.exceptions import NoCredentialsError
from flask import current_app as app

def upload_file_to_s3(file, bucket_name, acl="public-read"):
    s3 = boto3.client(
        "s3",
        aws_access_key_id=app.config["S3_KEY"],
        aws_secret_access_key=app.config["S3_SECRET"]
    )
    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        print("Something Happened: ", e)
        return e
    return f"{app.config['S3_LOCATION']}{file.filename}"
