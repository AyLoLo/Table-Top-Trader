import re
from typing import List

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Mapped
from sqlalchemy import ForeignKey, MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import datetime

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

board_game_posts = db.Table('board_game_posts',
                            metadata,
                            db.Column('board_game_id', db.ForeignKey('board_games.board_game_id'), primary_key=True),
                            db.Column('post_id', db.ForeignKey('posts.post_id'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # Fields
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)

    # WILL BE USING BCRYPT FOR PASSWORD
    password_hash = db.Column(db.String(120), nullable=False)

    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)

    # FIGURE OUT DATETIME
    date_created = db.Column(db.DateTime, default=datetime.now)

    # RELATIONSHIPS
    posts = db.relationship('Post',
                            back_populates='user',
                            cascade="all, delete-orphan")

    given_reviews = db.relationship('Review',
                                    foreign_keys='Review.reviewer_id',
                                    back_populates='reviewer',
                                    cascade="all, delete-orphan")

    recieved_reviews = db.relationship('Review',
                                       foreign_keys='Review.subject_id',
                                       back_populates='subject',
                                       cascade="all, delete-orphan")

    @validates('username')
    def validate_username(self, key, value):
        if not (5 <= len(value) <= 25):
            raise ValueError("Username must be between 5 and 25 characters")
        if not (re.search(r'^[a-zA-Z0-9_]*$', value)):
            raise ValueError("Username must contain only letters and numbers")
        if User.query.filter_by(username=value).first():
            raise ValueError("Username already exists")
        return value
    
    @validates('email')
    def validate_email_len(self, key, value):
        if not (5 <= len(value) <= 120):
            raise ValueError("Email must be between 5 and 120 characters")
        if not (re.search(r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)', value)):
            raise ValueError("Email is not valid")
        if User.query.filter_by(email=value).first():
            raise ValueError("Email already exists")
        return value
    
    @validates('first_name')
    def validate_first_name(self, key, value):
        if not (3 <= len(value) <= 25):
            raise ValueError("First name must be between 2 and 26 characters")
        return value

    @validates('last_name')
    def validate_last_name(self, key, value):
        if not (2 <= len(value) <= 25):
            raise ValueError('Last name must be between 1 and 26 characters')
        return value
        
    @validates('password')
    def validate_password_hash(self, key, value):
        if not (8 <= len(value) <= 25):
            raise ValueError('Password must be between 7 and 26 characters') 
        return value
        
    # Login/Signup Data
    def __repr__(self):
        return f'`<User id = "{self.user_id}" username="{self.username}">`'

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "date_created": self.date_created.isoformat()
        }


class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"

    # Fields

    post_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey("users.user_id"), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    longitude = db.Column(db.Numeric, nullable=False)
    latitude = db.Column(db.Numeric, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.now)

    # Relationships
    user = db.relationship("User", back_populates="posts")
    board_games = db.relationship("Board_Game", secondary=board_game_posts, back_populates="posts")
    images = db.relationship("Post_Image", backref="post")

    def __repr__(self):
        return f'<Post id="{self.post_id}" title="{self.title}">'

    def to_dict(self):
        return {
            "id": self.post_id,
            "title": self.title,
            "user": self.user.to_dict(), 
            "description": self.description,
            "longitude": self.longitude,
            "latitude": self.latitude,
            "price": self.price,
            "images": [image.to_dict() for image in self.images],
            "date_created": self.date_created.isoformat()
        }


class Post_Image(db.Model, SerializerMixin):
    __tablename__ = 'post_images'

    post_image_id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, ForeignKey("posts.post_id"))
    post_image_key = db.Column(db.String(250), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.now)

    def __repr__(self):
        return f'<Post_Image id="{self.post_image_id} post_id="{self.post_id} post_image_key="{self.post_image_key}">'

    def to_dict(self):
        return {
            "post_image_key": self.post_image_key,
            "date_created": self.date_created.isoformat()
        }
    
class Board_Game(db.Model, SerializerMixin):
    __tablename__ = 'board_games'

    # Fields
    board_game_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    # Relationships
    posts = db.relationship('Post', secondary=board_game_posts, back_populates="board_games")

    def to_dict(self):
        return {
            "id": self.board_game_id,
            "title": self.title
        }

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    # Fields
    review_id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer,
                            db.ForeignKey("users.user_id"), 
                            nullable=False)
    subject_id = db.Column(db.Integer,
                           db.ForeignKey("users.user_id"), 
                           nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500))
    date_created = db.Column(db.DateTime, default=datetime.now)

    # Relationships
    reviewer = db.relationship('User', foreign_keys=[reviewer_id],
                               back_populates="given_reviews")
    subject = db.relationship('User', foreign_keys=[subject_id],
                              back_populates="recieved_reviews")

    def __repr__(self):
        return f'<Review id="{self.review_id}" rating="{self.rating}">'

    def to_dict(self):
        return {
            "id": self.review_id,
            "reviewer_id": self.reviewer_id,
            "subject_id": self.subject_id,
            "rating": self.rating,
            "comment": self.comment,
            "date_created": self.date_created.isoformat()
        }

class Zipcode(db.Model, SerializerMixin):
    __tablename__ = "zipcodes"
    zipcode = db.Column(db.String, primary_key=True)
    longitude = db.Column(db.Numeric, nullable=False)
    latitude = db.Column(db.Numeric, nullable=False)

    def __repr__(self):
        return f'<Zipcode id="{self.zipcode}">'
    
    def to_dict(self):
        return {
            "zipcode": self.zipcode,
            "longitutde": self.longitude,
            "latitude": self.latitude
        }