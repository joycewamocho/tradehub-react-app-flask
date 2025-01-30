from models import db, Role, User, Product, UserProduct, Order
from app import app

# Drop existing tables and recreate them
with app.app_context():
    print("Dropping all tables...")
    db.drop_all()
    print("Creating all tables...")
    db.create_all()

    # Seed Roles
    def seed_roles():
        roles = ["Buyer", "Seller"]
    
        for role_name in roles:
            role = Role.query.filter_by(role=role_name).first()
            if not role:
                new_role = Role(role=role_name)
                db.session.add(new_role)
        
        db.session.commit()
        print("Roles seeded successfully!")

    seed_roles()  # ✅ Call function after database initialization

    # Seed Users
    def seed_users():
        buyer = Role.query.filter_by(role="Buyer").first()  # Fix: Query 'Buyer' role correctly
        seller = Role.query.filter_by(role="Seller").first()  # Fix: Query 'Seller' role correctly

        if not all([buyer, seller]):
            print("Error: One or more roles are missing. Ensure roles are seeded first.")
            return

        # Fix: Use the correct role references for user creation
        user1 = User(username="john_seller", email="john@example.com", password="seller123", role=seller)
        user2 = User(username="jane_buyer", email="jane@example.com", password="buyer123", role=buyer)
        
        db.session.add_all([user1, user2])
        db.session.commit()
        print("Users seeded successfully!")

    seed_users()

    # Seed Products
    print("Seeding products...")
    product1 = Product(name="Laptop", description="A high-performance laptop for work and gaming.",
                       price=1200, image_url="https://images.unsplash.com/photo-1517336714731-489689fd1ca8", contact="seller@example.com")
    product2 = Product(name="Smartphone", description="Latest smartphone with advanced features.",
                       price=800, image_url="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9", contact="seller@example.com")
    product3 = Product(name="Headphones", description="Noise-cancelling over-ear headphones.",
                       price=150, image_url="https://images.stockcake.com/public/6/9/7/6975704e-2812-47f6-8f4f-9267dc0b0e23_large/black-wireless-headphones-stockcake.jpg", contact="seller@example.com")
    db.session.add_all([product1, product2, product3])
    db.session.commit()
    print("Products seeded successfully!")

    # Seed UserProducts
    print("Seeding user products...")
    user1 = User.query.filter_by(username="john_seller").first()
    if user1:
        user_product1 = UserProduct(user=user1, product=product1, quantity=1)  # Add missing user_product1 assignment
        user_product2 = UserProduct(user=user1, product=product2, quantity=1)
        user_product3 = UserProduct(user=user1, product=product3, quantity=2)
        db.session.add_all([user_product1, user_product2, user_product3])  # Corrected to include all products
        db.session.commit()
        print("User products seeded successfully!")

    # Seed Orders
    print("Seeding orders...")
    order1 = Order(user_product=user_product1, total_price=1200)  # 1 * 1200
    order2 = Order(user_product=user_product2, total_price=800)  # 1 * 800
    order3 = Order(user_product=user_product3, total_price=300)  # 2 * 150
    db.session.add_all([order1, order2, order3])  # Corrected to include all orders
    db.session.commit()
    print("Orders seeded successfully!")

    print("Database seeded successfully!")
