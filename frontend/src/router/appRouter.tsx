import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "../page/auth pages/signUp.page";
import LoginPage from "../page/auth pages/login.page";
import PriorixLanding from "../page/auth pages/landing page/landing.page";





const Router = createBrowserRouter([
    {
        path:'/',
        element:<PriorixLanding/>

    },
  {
    path: "/auth",
    children: [
      { index: true, element: <SignUpPage /> }, 
      { path: "signup", element: <SignUpPage /> }, 
      { path: "login", element: <LoginPage />  }, 
     
    ],
  },
]);

export default Router