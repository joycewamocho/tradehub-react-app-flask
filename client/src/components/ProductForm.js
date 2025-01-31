import "./Form.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    contact: "",
    image_url: "",
    seller_id: "", // Will be populated after user is fetched
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData((prevData) => ({
        ...prevData,
        seller_id: storedUser.id,
      }));
    } else {
      navigate("/login"); // Redirect to login page if no user data
    }
  }, [navigate]);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!user) return; // Prevent submission if user is not found

    const productData = { ...formData, seller_id: user.id };

    fetch("/products", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product added:", data);
        setFormData({
          name: "",
          description: "",
          price: "",
          contact: "",
          image_url: "",
          seller_id: user.id,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching user data
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-8 col-lg-6">
        <h3 className="text-center mb-4">Product Information</h3>
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Product Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              min="0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">Contact Information</label>
            <input
              type="tel"
              className="form-control"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
              pattern="^\+?[0-9]{1,4}?[-. ]?[0-9]{1,3}[-. ]?[0-9]{1,4}[-. ]?[0-9]{1,4}$"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Product Image URL</label>
            <input
              type="url"
              className="form-control"
              id="image"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="Enter product image URL"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
