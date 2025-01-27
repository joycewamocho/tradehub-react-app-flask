import React from "react";

function Cart() {
  const [cartItems, setCartItems] = React.useState([]);
  const [total, setTotal] = React.useState("0");

  React.useEffect(() => {
    fetch("http://localhost:3001/cart")
      .then((res) => res.json())
      .then((items) => {
        setCartItems(items);
        calculateTotal(items);
      });
  }, []);

  const calculateTotal = (items) => {
    const totalPrice = items.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0
    );
    setTotal(totalPrice.toFixed(2));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/cart/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    });
  };

  function handleBuy(item) {
    alert(`Please contact ${item.contact}`);
  }

  return (
    <div className="container my-5">
      <div
        className="card shadow-lg p-4 bg-light rounded mx-auto"
        style={{
          width: "100%",
          maxWidth: "600px",
          border: "none",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div className="card-header text-white text-center bg-dark rounded">
          <h4 className="mb-0">🛒 Shopping Cart</h4>
        </div>
        <div className="card-body">
          {cartItems.length > 0 ? (
            <ul className="list-unstyled">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3"
                >
                  <div>
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-muted mb-1">
                      Price: <strong>${item.price}</strong>
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mt-2 mt-md-0">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-outline-danger btn-sm me-2"
                    >
                      Remove
                    </button>

                    <button
                      onClick={() => handleBuy(item)}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Buy
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center bg-white">
          <h5 className="mb-0">Total:</h5>
          <h5>
            <strong>${total}</strong>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Cart;
