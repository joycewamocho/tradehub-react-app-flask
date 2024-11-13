import NavBar from "../components/NavBar";
import Cart from "../components/Cart";

function CartPage(){
    return(
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <h1>cart page</h1>
                <Cart/>
            </main>
           
        </div>
    );

}

export default CartPage