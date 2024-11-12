import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/home",
      element:<Home/>
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
