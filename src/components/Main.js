import React from "react"
import ProductList from "./ProductList"

function Main(){
    const[products,setProducts]=React.useState([])

    React.useEffect(()=>{
        fetch("https://my-json-server.typicode.com/joycewamocho/tradehub-react-app/products")
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