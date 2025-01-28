from flask import flask,make_response,request,jsonify
from models import db,Role,User,Product,UserProduct,Order
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)
api=Api(app)


