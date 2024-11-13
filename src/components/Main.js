import React from "react"
import ProductList from "./ProductList"

function Main(){
    const[products,setProducts]=React.useState([])

    React.useEffect(()=>{
        fetch("http://localhost:3001/products")
        .then((res)=>res.json())
        .then((data)=>setProducts(data))
    },[])


    return(
        <div>
            <ProductList products={products}/>
        </div>
    );
}
export default Main