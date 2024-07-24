import ipdb
import os

from functools import wraps

from flask import Flask, make_response, jsonify, request, session, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate 
from flask_bcrypt import Bcrypt
from flask_restful import Api, Resource
from flask_cors import CORS

from models import db, User, Board_Game, Post, Review

app = Flask(__name__)
app.secret_key = '54e1d6161c01e73a319517df6dd892da'
                 .join('dc1d3c022f35185032ef6b45947bcf0d')
# ran python -c 'import secrets; print(secrets.token_hex())' in terminal
# os.urandom(24)

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///boardgames.db'  # Update this to your database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a random secret key
app.json.compact = False

migrate = Migrate(app, db)


db.init_app(app)

CORS(app)

api = Api(app)

bcrypt = Bcrypt(app)


def get_current_user():
    return User.query.where(User.id == session.get("user_id")).first()


def logged_in():
    return bool(get_current_user())


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get('user_id') is None:
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function


class Users(Resource):

    def get(self):
        users = User.query.all()
        response_body = []
        for user in users:
            relationship = {
                'posts': [post.to_dict() for post in user.posts],
                'given_reviews': [given_review.to_dict()
                                  for given_review in user.given_reviews],
                'recieved_reviews': [recieved_review.to_dict()
                                     for recieved_review in
                                     user.recieved_reviews]
            }
            response_body.append(relationship)
        return make_response(jsonify(response_body), 200)
    
    # User Signup

    @app.post('/users')
    def create_user():
        json = request.json
        pw_hash = bcrypt.generate_password_hash(json['password']).decode('utf-8')
        new_user = User(username=json['username'], password_hash=pw_hash)
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.user_id
        return new_user.to_dict(), 201
    
    # Session Login/Logout

    @app.post('/login')
    def login():
        json = request.json
        user = User.query.filter(User.username == json["username"]).first()
        if user and bcrypt.check_password_hash(user.password_hash,
                                               json["password"]):
            session["user_id"] = user.id
            return user.to_dict(), 201
        else:
            return {"error": "Invalid username or password"}, 401 
        
    @app.get('/current_session')
    def check_session():
        if logged_in():
            return get_current_user().to_dict(), 200
        else:
            return {}, 401
        
    @app.post("/logout")
    def logout():
        session["user_id"] = None
        return {"message": "Successfully logged out"}, 204

    api.add_resource(Users, '/users')

class PostsByUser(Resource):
     
     def get(self, username):
          
          user = User.query.filter_by(username = username).first()
          if not user:
              response_body = {"error": "User and their posts not found"}
              return make_response(jsonify(response_body), 404)
          response_body = [post.to_dict() for post in user.posts]

          return make_response(jsonify(response_body), 200)