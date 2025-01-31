import React from "react";
import DashNav from "./DashNav";
import "./Dash.css";

function SellerDash() {
  const [products, setProducts] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [editingProduct, setEditingProduct] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    contact: "",
  });

  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser) {
      fetch(`/seller-dashboard?user_id=${storedUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, []);

  // Handle the Edit button click
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
      contact: product.contact,
    });
  };

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Handle form submission (update product)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Send the updated data to the server (backend)
    fetch(`/products/${editingProduct.id}`, {
      method: "PATCH", // Correct HTTP method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        // Update the products state with the updated product
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setEditingProduct(null); // Close the edit form
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  // Handle delete button click
  const handleDeleteClick = (productId) => {
    // Send the delete request to the server (backend)
    fetch(`/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        // Remove the deleted product from the local state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div>
      <header>
        <DashNav />
      </header>
      <main className="container mt-5">
        <h2 className="text-center mb-4">{user?.username}'s Dashboard</h2>

        <div className="row">
          {products.length ? (
            products.map((product) => (
              <div
                key={product.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <div className="card shadow-lg h-100 border-light rounded">
                  <img
                    src={product.image_url}
                    className="card-img-top"
                    alt={product.name}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderTopLeftRadius: "0.25rem",
                      borderTopRightRadius: "0.25rem",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">{product.name}</h5>
                    <p className="card-text text-muted text-truncate">
                      {product.description}
                    </p>
                    <h6 className="text-primary mt-auto">Price: {product.price}</h6>
                    <p className="card-text text-muted">Contact: {product.contact}</p>
                  </div>
                  <div className="card-footer text-center">
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit Product
                    </button>
                    <button
                      className="btn btn-outline-danger w-100 mt-2"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center text-muted">No products found</p>
            </div>
          )}
        </div>

        {editingProduct && (
          <div className="modal show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Product</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditingProduct(null)}
                  ></button>
                </div>
                <form onSubmit={handleFormSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        name="name"
                        value={editFormData.name}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="description"
                        className="form-control"
                        name="description"
                        value={editFormData.description}
                        onChange={handleFormChange}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        className="form-control"
                        name="price"
                        value={editFormData.price}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image_url" className="form-label">
                        Image URL
                      </label>
                      <input
                        type="text"
                        id="image_url"
                        className="form-control"
                        name="image_url"
                        value={editFormData.image_url}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contact" className="form-label">
                        Contact Information
                      </label>
                      <input
                        type="text"
                        id="contact"
                        className="form-control"
                        name="contact"
                        value={editFormData.contact}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setEditingProduct(null)}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SellerDash;
