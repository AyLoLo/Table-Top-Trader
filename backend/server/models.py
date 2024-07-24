from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
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


class Board_Game(db.Model, SerializerMixin):
    __tablename__ = 'board_games'

    # Fields
    board_game_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)

    # Relationships
    posts = db.relationship('Post',
                            back_populates='boardgame',
                            cascade="all, delete-orphan")

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


class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"

    # Fields

    post_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey("users.user_id"), nullable=False)
    boardgame_id = db.Column(db.Integer,
                             db.ForeignKey("board_games.id"), nullable=False)

    # IMAGE WOULD BE A LINK REF

    description = db.Column(db.String(500), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.now)

    # Relationships
    user = db.relationship('User', back_populates='posts')
    boardgame = db.relationship('Boardgame', back_populates='posts')

    def __repr__(self):
        return f'<Post id="{self.post_id}" title="{self.title}">'

    def to_dict(self):
        return {
            "id": self.post_id,
            "title": self.title,
            "user_id": self.user_id,
            "boardgame_id": self.boardgame_id,
            "description": self.description,
            "location": self.location,
            "date_created": self.date_created.isoformat()
        }
