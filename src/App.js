import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/cartPage";


function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/home",
      element:<Home/>
    },
    {
      path:"/cart",
      element: <CartPage/>
    },
    {
      path:"/products",
      element: <ProductPage/>
    }
  ])
  return (
    <div className="App">
      <h1>TradeHub</h1>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
