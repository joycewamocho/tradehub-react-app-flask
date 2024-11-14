function ProductItem({product}){

  function handleAddToCart(){
    fetch("http://localhost:3001/cart",{
      method:"POST",
      headers:{
        "Content-Type":"Application/JSON",
      },
      body:JSON.stringify(product)
    })
    alert(`${product.name} added to cart`)

  }
    return(
        <li className="cardss" data-testid="product-item">
        <img src={product.image} alt={product.name} />
        <h4>{product.name}</h4>
        <p>Description</p>
        <p>Price: {product.price}</p>
        <p>contact:{product.contact}</p>
        <button onClick={handleAddToCart}>add to cart</button>
        
      </li>
    );
    
}

export default ProductItem