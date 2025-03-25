import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";


export default function AppRoutes() {
  const routes = [
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes); // we have to send the routes to the browser router and return it below:
  return <RouterProvider router={router} />
  
}


// path: "auth",
//  element: <AuthLayout />, : this is for the url, that is how we want it to be in the browser (it must start with auth (example: auth/register))