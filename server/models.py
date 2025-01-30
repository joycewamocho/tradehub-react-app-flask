from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)
class Role(db.Model,SerializerMixin):
    __tablename__ ="roles"

    id= db.Column(db.Integer,primary_key=True)
    role= db.Column(db.String(50),nullable=False)

    # relationship
    users = db.relationship('User', back_populates="role")
    serialize_rules =('-users',)

class User(db.Model,SerializerMixin):
    __tablename__="users"

    id = db.Column(db.Integer,primary_key=True)
    username= db.Column(db.String(255),nullable=False)
    email=db.Column(db.String(255), nullable=False, unique=True,index=True)
    password=db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"),nullable=False)
    
    # relationships
    user_products= db.relationship('UserProduct',back_populates='user', cascade="all, delete-orphan")
    role= db.relationship('Role',back_populates="users")

    # Association Proxies
    products = association_proxy('user_products', 'product')  # Get products directly
    orders = association_proxy('user_products', 'orders')  # Get orders directly

    serialize_rules = ('-user_products', 'role',)


class Product(db.Model,SerializerMixin):
    __tablename__="products"

    id= db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String,nullable=False)
    description=db.Column(db.String,nullable=False)
    price = db.Column(db.Integer,nullable=False)
    image_url = db.Column(db.String,nullable=False)
    contact= db.Column(db.String,nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'contact': self.contact
        }
    
    # relationship
    user_products = db.relationship('UserProduct', back_populates='product',cascade="all, delete-orphan")

     # Association Proxies
    users = association_proxy('user_products', 'user')  # Get users directly
    orders = association_proxy('user_products', 'orders') #Get orders directly

    serialize_rules =('-user_products',)

class UserProduct(db.Model,SerializerMixin):
    __tablename__= "user_products"

    id = db.Column(db.Integer,primary_key=True)
    user_id =db.Column(db.Integer, db.ForeignKey("users.id"),nullable=False)
    product_id =db.Column(db.Integer, db.ForeignKey("products.id"))
    quantity=db.Column(db.Integer,nullable=False,default=1)
    
    # relationships
    user =db.relationship('User',back_populates='user_products')
    product = db.relationship('Product', back_populates='user_products')
    orders = db.relationship('Order', back_populates='user_product',cascade="all, delete-orphan")

    serialize_rules =("-product", "-user",)

class Order(db.Model,SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer,primary_key=True)
    user_products_id= db.Column(db.Integer, db.ForeignKey("user_products.id"),nullable=False)
    total_price =db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    # relationship
    user_product = db.relationship('UserProduct', back_populates="orders",cascade="all, delete-orphan",single_parent=True)

     # Association Proxies
    user = association_proxy('user_product', 'user')  # Get user directly
    product = association_proxy('user_product', 'product')  # Get product directly

    serialize_rules =('-user_product',)


    
    