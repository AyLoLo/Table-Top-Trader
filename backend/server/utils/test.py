import os
import boto3
from flask import Flask

from s3_utils import upload_file_to_s3


app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
# ran python -c 'import secrets; print(secrets.token_hex())' in terminal
# os.urandom(24)

app.config.from_object('config.Config')

s3 = boto3.client(
    "s3",
    aws_access_key_id=app.config["S3_KEY"],
    aws_secret_access_key=app.config["S3_SECRET"]
)


def upload_img():
    upload_file_to_s3()