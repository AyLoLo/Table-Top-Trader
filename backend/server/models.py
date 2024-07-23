from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # Fields
    id = db.column(db.Integer, primary_key=True)
    username = db.column(db.String(50), nullable=False, unique=True)
    password_hash = db.column(db.String(120), nullable=False)
    first_name = db.column(db.String(50), nullable=False)
    last_name = db.column(db.String(50), nullable=False)
    email = db.column(db.String(120), nullable=False)

    # Login/Signup Data

    def __repr__(self):
        return f'`<User id = "{self.id}" username="{self.username}">`'
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email
        }