import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/cartPage";
import SignUp from "./components/SignUp";
import "./App.css";
import BuyerDashBoard from "./components/BuyerDashboard";
import SellerDashboard from "./components/SellerDashboard";
import Logout from "./components/Logout";
import SellerDash from "./components/sellerDash";




function App() {
  const router=createBrowserRouter([
   
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/cart",
      element: <CartPage/>
    },
    {
      path:"/products",
      element: <ProductPage/>
    },
    {
      path:"/signup",
      element: <SignUp/>
    },
    {
      path:"/buyer-dashboard",
      element: <BuyerDashBoard/>
    },
    {
      path:"/seller-dashboard",
      element: <SellerDashboard/>
    },
    {
      path:"/logout",
      element: <Logout/>
    },
    {
      path:"/dash",
      element: <SellerDash/>
    }

  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
