from flask import Flask,make_response,request,jsonify
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

class SellerDashboardResource(Resource):
    def get(self):
        # Get and validate user_id
        user_id = request.args.get('user_id')
        if not user_id:
            return make_response({"error": "User ID is required"}, 400)

        try:
            user_id = int(user_id)
        except ValueError:
            return make_response({"error": "Invalid user ID"}, 400)

        # Fetch user
        user = User.query.get(user_id)
        if not user:
            return make_response({"error": "User not found"}, 404)

        # Fetch products efficiently using a join
        products = (
            db.session.query(Product)
            .join(UserProduct, Product.id == UserProduct.product_id)
            .filter(UserProduct.user_id == user.id)
            .all()
        )

        # Convert products to dictionary format
        return make_response([product.to_dict() for product in products], 200)

api.add_resource(SellerDashboardResource, '/seller-dashboard')


class RoleResource(Resource):
    def get(self):
        role_name = request.args.get('name')

        if not role_name:
            return {"error": "Role name is required"}, 400  
        
        role = Role.query.filter(Role.role.ilike(f"%{role_name}%")).first()
        
        if role:
            return {"id": role.id, "role": role.role}, 200  
        else:
            return {"error": "Role not found"}, 404
        return make_response(role.to_dict())

    def post(self):
        data = request.get_json()

        if not data or "role" not in data:
            return {"error": "Missing role field"}, 400 

        new_role = Role(role=data["role"])
        db.session.add(new_role)
        db.session.commit()

        return {"message": "Role added successfully", "id": new_role.id}, 201

api.add_resource(RoleResource,'/roles')

class UserResource(Resource):
    def get(self):
        users=[]
        for user in User.query.all():
            users.append(user.to_dict())
        if users:
            response = make_response(users,200)
            return response
        else:
            return make_response({"message":"users not found"},404)
    def post(self):
        data = request.get_json()
        new_user = User(
            username =data['username'],
            email=data['email'],
            password=data['password'],
            role_id=data['role_id']
        )
        db.session.add(new_user)
        db.session.commit()

        if new_user:
            return make_response(new_user.to_dict(),201)
        else:
            return make_response({'message': 'Error occured'},400)
api.add_resource(UserResource,'/users')

class UserByID(Resource):
    def get(self,id):
        user= User.query.filter(User.id == id).first()
        if user:
            return make_response(user.to_dict(),200)
        else:
            return make_response(f"user with id {id} not found",404)

    def patch(self,id):
        user=User.query.filter(User.id == id).first()
        data= request.get_json()
        if user:
            user.username=data['username']
            user.email=data['email']
            user.password=data['password']
            user.role_id=data['role_id']

            db.session.commit()
            return make_response(user.to_dict(),201)
        else:
            return make_response(f"user with id {id}, not found", 404)

    def delete(self,id):
        user= User.query.filter(User.id == id ).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            
            body={
                "deleted successful":True,
                "message":"user deleted."
            }
            return make_response(body,200)
        else:
            return make_response(F"user with id  {id}  was not found",404)
class ProductResource(Resource):
    def get(self):
        products = []
        for product in Product.query.all():
            products.append(product.to_dict())
        if products:
            response = make_response(products, 200)
            return response
        else:
            return make_response({"message": "products Not Found"}, 404)

   
    def post(self):
        data = request.get_json()

         # Ensure 'seller_id' is included in the request data
        seller_id = data.get('seller_id')
        if not seller_id:
            return make_response({"error": "seller_id is required"}, 400)

        # Check if the seller (User) exists
        user = User.query.get(seller_id)
        if not user:
            return make_response({"error": "User not found"}, 404)

        # Create the new product (without user_id)
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            image_url=data['image_url'],
            contact=data['contact']
        )

        # Add the new product to the session
        db.session.add(new_product)
        db.session.commit()

        # Create the UserProduct association (for many-to-many relation)
        user_product = UserProduct(user_id=seller_id, product_id=new_product.id)
        db.session.add(user_product)
        db.session.commit()

        # Return the newly created product with success response
        return make_response(new_product.to_dict(), 201)

api.add_resource(ProductResource,'/products')

class ProductByID(Resource):
    def get(self,id):
        product = Product.query.filter(Product.id == id).first()
        if product:
            return make_response(product.to_dict(),200)
        else:
            return make_response({'message':"product not found"},404)

    def patch(self,id):
        product = Product.query.filter(Product.id == id).first()
        data = request.get_json()
        if product:
            product.name =data['name']
            product.description=data['description']
            product.price=data['price']
            product.image_url=data['image_url']
            product.contact=data['contact']

            db.session.commit()
            return make_response(product.to_dict(),201)
        else:
            return  make_response(f"The product with id {id} was not found",404)

    def delete(self,id):
        product = Product.query.filter(Product.id == id).first()

        if product:
            db.session.delete(product)
            db.session.commit()

            body={
                "deleted successful":True,
                "message":"Product deleted."
            }
            return make_response(body,200)
        else:
            return make_response(f"product with id {id} not found",404)
api.add_resource(ProductByID,'/products/<int:id>')


class UserProductResource(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()  # FIX: Use .first()
        
        if not user:
            return make_response({"message": f"user with id {id} not found"}, 404)  # FIX: Correct string formatting
        
        products = [product.to_dict() for product in user.products]  # FIX: Ensure user.products is iterable
        
        return make_response(products, 200)

api.add_resource(UserProductResource, '/users/<int:id>/products')

class OrderResource(Resource):
    def get(self):
        orders=[]
        for order in Order.query.all():
            orders.append(order.to_dict())
        if orders:
            return make_response(orders,200)
        else:
            return {"message":"orders not found"},404
api.add_resource(OrderResource,'/orders')


if __name__ == "__main__":
    app.run(port=5555, debug=True)