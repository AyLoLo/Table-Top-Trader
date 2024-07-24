import ipdb
import os

from flask import Flask, make_response, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate 
from flask_bcrypt import Bcrypt
from flask_restful import Api, Resource
from flask_cors import CORS

from models import db, User, Board_Game, Post, Review

app = Flask(__name__)
app.secret_key = app.config
# # Configurations
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///boardgames.db'  # Update this to your database URI
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a random secret key
