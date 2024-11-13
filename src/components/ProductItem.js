function ProductItem({product}){
    return(
        <li className="cardss" data-testid="product-item">
        <img src={product.image} alt={product.name} />
        <h4>{product.name}</h4>
        <p>Description</p>
        <p>Price: {product.price}</p>
        <p>contact:{product.contact}</p>
        <button>add to cart</button>
        
      </li>
    );
    
}

export default ProductItem