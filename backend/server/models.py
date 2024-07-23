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
    username = db.column