import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = os.environ.get("SQLALCHEMY_TRACK_MODIFICATIONS")
    S3_BUCKET = os.environ.get("S3_IMAGE_BUCKET_NAME")
    S3_KEY = os.environ.get("S3_ACCESS_KEY_ID")
    S3_SECRET = os.environ.get("S3_SECRET_ACCESS_KEY")
    S3_LOCATION = f"http://{S3_BUCKET}.s3.amazonaws.com/"
    S3_REGION = os.environ.get("BUCKET_REGION")