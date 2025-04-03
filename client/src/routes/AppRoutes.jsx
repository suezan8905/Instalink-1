import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import { lazy, Suspense } from "react";
// LAZY LOADING are performance technique that work together to improve web application speed. SUSPENSE: Lets you display a fallback until its children have finished loading. Morelike keeping the page busy
import { LazySpinner } from "../components/Spinner";
import Home from "../pages/home/Home";
import ForgottenPassword from "../pages/forgottenpassword/ForgottenPassword";

const AuthLayout = lazy(() => import("../layout/AuthLayout"));
// This is because we are trying to lazy load Auth, hence no need to import manually
const RootLayout = lazy(() => import("../layout/RootLayout"));

export default function AppRoutes() {
  const routes = [
    {
      path: "auth",
      // this is us trying to pass the props to the parent, so it
      element: (
        <Suspense fallback={<LazySpinner />}>
          <AuthLayout />,
        </Suspense>
        // can effect the children (login and register)
      ),

      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgottenpassword",
          element: <ForgottenPassword />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <RootLayout />
        </Suspense>
      ),
    },
  ];
  const router = createBrowserRouter(routes); // we have to send the routes to the browser router and return it below:
  return <RouterProvider router={router} />;
}

// path: "auth",
//  element: <AuthLayout />, : this is for the url, that is how we want it to be in the browser (it must start with auth (example: auth/register))
