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
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    
    # WILL BE USING BCRYPT FOR PASSWORD
    password_hash = db.Column(db.String(120), nullable=False)
    
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    
    # FIGURE OUT DATETIME 
    date_created = db.Column(db.Datetime, default=datetime.now)

    # Login/Signup Data
    def __repr__(self):
        return f'`<User id = "{self.user_id}" username="{self.username}">`'
    
    def to_dict(self):
        return {
            "user_id": self.user_id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email
        }


class Boardgame(db.Model, SerializerMixin):
    __tablename__ = 'board_games'

    # Fields

    board_game_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    price = db.colummn(db.Decimal(10, 2), nullable=False)


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    # Fields

    review_id = db.Column(db.Integer, primary_key=True)
    reviewer = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    subject = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500))
    date_created = db.Column(db.Datetime, default=datetime.now)


class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"

    # Fields

    post_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    user = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)

    # IMAGE WOULD BE A LINK REF

    description = db.Column(db.String(500), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.Datetime, default=datetime.now)
