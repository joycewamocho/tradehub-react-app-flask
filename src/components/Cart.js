import React from "react";
function Cart(){
    const[cartItems, setCartItems]=React.useState([])
    const[total,setTotal]=React.useState("0")

    React.useEffect(()=>{
        fetch("https://my-json-server.typicode.com/joycewamocho/tradehub-react-app/cart")
        .then((res)=>res.json())
        .then((items)=>{
            setCartItems(items);
            calculateTotal(items);
        })
    },[])

    const calculateTotal=(items)=>{
        const totalPrice=items.reduce((sum ,item)=>sum + parseFloat(item.price),0)
        setTotal(totalPrice)
    }

    const handleDelete=(id)=>{
        fetch(`https://my-json-server.typicode.com/joycewamocho/tradehub-react-app/cart/${id}`,{
            method:"DELETE",
        })
        .then(()=>{
            const updatedCart =cartItems.filter((item)=> item.id !== id)
            setCartItems(updatedCart)
            calculateTotal(updatedCart)
        })

    }
    return(
        <div className="container d-flex justify-content-center my-5">
            <div 
               className="card shadow-lg p-4 bg-light rounded" 
               style={{ width: "100%", maxWidth: "600px", border: "none" }}
            >
        <div className="card-header text-white text-center bg-dark rounded">
            <h4 className="mb-0">🛒 Shopping Cart</h4>
       </div>
    <div className="card-body">
      <ul className="list-unstyled">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="d-flex justify-content-between align-items-center mb-3"
          >
            <div>
              <h5 className="mb-1">{item.name}</h5>
              <p className="text-muted mb-1">Price: <strong>${item.price}</strong></p>
            </div>
            <button onClick={()=>(handleDelete(item.id))} className="btn btn-outline-danger btn-sm">Remove</button>
          </li>
        ))}
      </ul>
    </div>
    <div className="card-footer d-flex justify-content-between align-items-center bg-white">
      <h5>Total:</h5>
      <h5><strong>${total}</strong></h5>
    </div>
  </div>
</div>


    );
}

export default Cart;