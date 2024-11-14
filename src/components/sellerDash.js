import React from "react"
import DashNav from "./DashNav"
import "./Dash.css";
function SellerDash(){
    const [products,setProducts]=React.useState([])
    const user=JSON.parse(localStorage.getItem("user"))

    React.useEffect(()=>{
        if(user&& user.role==="seller"){
            fetch(`http://localhost:3001/products?sellerId=${user.id}`)
            .then((res)=>res.json())
            .then((data)=>setProducts(data))
        }
    
    },[user])
    return(
        <div>
            <header>
                <DashNav/>

            </header>
            <main className="container mt-5">
  <h2 className="text-center mb-4">{user?.name}'s Dashboard</h2>

  <div className="row">
    {products.length ? (
      products.map((product) => (
        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card shadow-lg h-100 border-light rounded">
            <img
              src={product.image}
              className="card-img-top"
              alt={product.name}
              style={{ height: "250px", objectFit: "cover", borderTopLeftRadius: "0.25rem", borderTopRightRadius: "0.25rem" }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-truncate">{product.name}</h5>
              <p className="card-text text-muted text-truncate">{product.description}</p>
              <h6 className="text-primary mt-auto">Price: ${product.price}</h6>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-outline-primary w-100">Edit Product</button>
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
</main>

    </div>
        
    );
}
export default SellerDash