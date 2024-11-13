import "./Form.css";
import React from 'react'

function ProductForm() {
    const[formData,setFormData]=React.useState({
        name:"",
        description:"",
        price:"",
        contact:"",
        image:"",

    })

    function handleChange(event){
        setFormData({
            ...formData,
            [event.target.name]:event.target.value

        })
    }

    function handleSubmit(event){
        event.preventDefault();
        fetch("http://localhost:3001/products",{
            method:"POST",
            headers:{
                "Content-Type":"Application/JSON",
            },
            body:JSON.stringify(formData)
        })
        .then((res)=>res.json())
        .then((data)=>console.log(data))

    }
    

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-8 col-lg-6">
        <h3 className="text-center mb-4">Product Information</h3>
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Product Name
            </label>
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
            <label htmlFor="description" className="form-label">
              Product Description
            </label>
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
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">
              Contact Information
            </label>
            <input
              type="tel"
              className="form-control"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Product Image URL
            </label>
            <input
              type="url"
              className="form-control"
              id="image"
              name="image"
              value={formData.image}
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
