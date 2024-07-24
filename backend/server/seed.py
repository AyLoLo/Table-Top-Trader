from app import app
from models import db, User, Board_Game, Post, Review

with app.app_context():

    users = []
    
    posts = []

    reviews = []

    board_games = []

    db.session.add_all[users]
    db.session.add_all[posts]
    db.session.add_all[reviews]
    db.session.add_all[board_games]
    db.session.commit()

    print("Database Successfully Seeded")
