import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Login from './routes/login';
import Home from './routes/home';
import Hotels,{loader as hotelLoader} from './routes/hotels';
import ErrorPage from './error';
import Profile,{loader as profileLoader} from './routes/profile';
import Menu from './routes/menu';
import Address from './routes/address';
import AddHotels from './routes/addHotels';
import AddMenu from './routes/addMenu';
import Coupons,{loader as couponLoader} from './routes/coupons';
import AddCoupons from './routes/addCoupons';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
 
  {
    path: `/home`,
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: `/home/hotels`,
        element: <Hotels />,
        loader: hotelLoader
      },
      {
        path: `/home/hotels/add`,
        element: <AddHotels />,
      },
     
      {
        path: `/home/profile`,
        element: <Profile />,
        loader:profileLoader
      },
      {
        path: `/home/menu`,
        element: <Menu />,
       
      },
      {
        path: `/home/menu/add`,
        element: <AddMenu />,
       
      },
      {
        path: `/home/coupons`,
        element: <Coupons />,
        loader:couponLoader
      },
      {
        path: `/home/coupons/add`,
        element: <AddCoupons />,
      },
      {
        path: `/home/profile/address`,
        element: <Address />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
