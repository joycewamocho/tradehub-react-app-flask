function ProductItem({ product }) {

  function handleAddToCart() {
    // Retrieve cart from localStorage or initialize as empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add the current product to the cart
    cart.push(product);

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.name} added to cart`);
  }

  return (
    <li className="cardss" data-testid="product-item">
      <img src={product.image_url} alt={product.name} />
      <h4>{product.name}</h4>
      <p>Description</p>
      <p>Price: {product.price}</p>
      <p>Contact: {product.contact}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </li>
  );
}

export default ProductItem;
