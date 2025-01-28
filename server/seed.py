from models import db, Role, User, Product, UserProduct, Order
from app import app

# Drop existing tables and recreate them
with app.app_context():
    print("Dropping all tables...")
    db.drop_all()
    print("Creating all tables...")
    db.create_all()

    # Seed Roles
    print("Seeding roles...")
    admin_role = Role(role="Admin")
    seller_role = Role(role="Seller")
    buyer_role = Role(role="Buyer")
    db.session.add_all([admin_role, seller_role, buyer_role])

    # Seed Users
    print("Seeding users...")
    user1 = User(username="admin_user", email="admin@example.com", password="admin123", role=admin_role)
    user2 = User(username="john_seller", email="john@example.com", password="seller123", role=seller_role)
    user3 = User(username="jane_buyer", email="jane@example.com", password="buyer123", role=buyer_role)
    db.session.add_all([user1, user2, user3])

    # Seed Products
    print("Seeding products...")
    product1 = Product(
        name="Laptop",
        description="A high-performance laptop for work and gaming.",
        price=1200,
        image_url="https://example.com/laptop.jpg",
        contact="seller@example.com"
    )
    product2 = Product(
        name="Smartphone",
        description="Latest smartphone with advanced features.",
        price=800,
        image_url="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        contact="seller@example.com"
    )
    product3 = Product(
        name="Headphones",
        description="Noise-cancelling over-ear headphones.",
        price=150,
        image_url="https://images.stockcake.com/public/6/9/7/6975704e-2812-47f6-8f4f-9267dc0b0e23_large/black-wireless-headphones-stockcake.jpg",
        contact="seller@example.com"
    )
    db.session.add_all([product1, product2, product3])

    # Seed UserProducts
    print("Seeding user products...")
    user_product1 = UserProduct(user=user2, product=product1, quantity=1)
    user_product2 = UserProduct(user=user2, product=product2, quantity=3)
    user_product3 = UserProduct(user=user2, product=product3, quantity=2)
    db.session.add_all([user_product1, user_product2, user_product3])

    # Seed Orders
    print("Seeding orders...")
    order1 = Order(user_product=user_product1, total_price=1200)
    order2 = Order(user_product=user_product2, total_price=2400)  # 3 * 800
    order3 = Order(user_product=user_product3, total_price=300)  # 2 * 150
    db.session.add_all([order1, order2, order3])

    # Commit all changes
    print("Committing changes to the database...")
    db.session.commit()

    print("Database seeded successfully!")
