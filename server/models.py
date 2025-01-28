from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)
class Role(db.Model,SerializerMixin):
    __tablename__ ="roles"

    id= db.Column(db.Integer,primary_key=True)
    role= db.Column(db.String(50),nullable=False)

class User(db.Model,SerializerMixin):
    __tablename__="users"

    id = db.Column(db.Integer,primary_key=True)
    username= db.Column(db.String(255),nullable=False)
    email=db.Column(db.String(255), nullable=False, unique=True,index=True)
    password=db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"))

class Product(db.Model,SerializerMixin):
    __tablename__="products"

    id= db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String,nullable=False)
    description=db.Column(db.String,nullable=False)
    price = db.Column(db.Integer,nullable=False)
    image_url = db.Column(db.String,nullable=False)
    contact= db.Column(db.String,nullable=False)

class UserProduct(db.Model,SerializerMixin):
    __tablename__= "user_products"

    id = db.Column(db.Integer,primary_key=True)
    user_id =db.Column(db.Integer, db.ForeignKey("users.id"))
    product_id =db.Column(db.Integer, db.ForeignKey("products.id"))
    quantity=db.Column(db.Integer,nullable=False, default=1)

class Order(db.Model,SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer,primary_key=True)
    user_products_id= db.Column(db.Integer, db.ForeignKey("user_products.id"))
    total_price =db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    