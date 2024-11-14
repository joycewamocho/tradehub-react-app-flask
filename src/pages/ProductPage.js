import ProductForm from "../components/ProductForm";
import SellerNavbar from "../components/SellerNav";


function ProductPage(){
    return(
        <>
        <header>
        <SellerNavbar/>
        </header>
        <main>
            <ProductForm/>
        </main>
        </>
        

    );
}

export default ProductPage