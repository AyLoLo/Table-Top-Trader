import re

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
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
        if not (5 <= value <= 25) and (re.search(r'[^\w-]|_')):
            raise ValueError("Username must be between 5 and 25 characters")
        return value
    
    @validates('email')
    def validate_email(self, key, value):
        if not (5 <= value <= 120):
            raise ValueError("Email must be between 5 and 120 characters")
        return value

    @validates('first_name')
    def validate_first_name(self, key, value):
        if not (3 <= value <= 25) and not (value[0].isupper()):
            raise ValueError("First name must begin with a capital and be between 2 and 26 characters")
        return value
    
    @validates('last_name')
    def validate_last_name(self, key, value):
        if not (2 <= value <= 25) and not (value[0].isuppper()):
            raise ValueError('Last name must begin with a capital and between 1 and 26 characters')
        return value
        
    @validates('password')
    def validate_password_hash(self, key, value):
        if not (8 <= value <= 25):
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
    board_game_id = db.Column(db.Integer,
                             db.ForeignKey("board_games.board_game_id"),
                             nullable=False)

    # IMAGE WOULD BE A LINK REF

    description = db.Column(db.String(500), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.now)

    # Relationships
    user = db.relationship('User', back_populates='posts')
    board_games = db.relationship('Board_Game', secondary=board_game_posts, back_populates="posts")

    def __repr__(self):
        return f'<Post id="{self.post_id}" title="{self.title}">'

    def to_dict(self):
        return {
            "id": self.post_id,
            "title": self.title,
            "user_id": self.user_id,
            "board_game_id": self.board_game_id,
            "description": self.description,
            "location": self.location,
            "date_created": self.date_created.isoformat()
        }


class Board_Game(db.Model, SerializerMixin):
    __tablename__ = 'board_games'

    # Fields
    board_game_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)

    # Relationships
    posts = db.relationship('Post', secondary=board_game_posts, back_populates="board_games")

    def to_dict(self):
        return {
            "id": self.board_game_id,
            "title": self.title,
            "price": str(self.price)  # Convert to string for serialization
        }


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    # Fields
    review_id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer,
                            db.ForeignKey("users.user_id"), nullable=False)
    subject_id = db.Column(db.Integer,
                           db.ForeignKey("users.user_id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500))
    date_created = db.Column(db.DateTime, default=datetime.now)

    # Relationships
    reviewer = db.relationship('User', foreign_keys=[reviewer_id],
                               back_populates="given_reviews")
    subject = db.relationship('User', foreign_keys=[subject_id],
                              back_populates="recieved_reviews")

    def __repr__(self):
        return f'<Review id="{self.review_id} rating="{self.rating}">'

    def to_dict(self):
        return {
            "id": self.review_id,
            "reviewer_id": self.reviewer_id,
            "subject_id": self.subject_id,
            "rating": self.rating,
            "comment": self.comment,
            "date_created": self.date_created.isoformat()
        }
