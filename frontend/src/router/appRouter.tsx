import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "../page/auth pages/signUp.page";
import LoginPage from "../page/auth pages/login.page";
import PriorixLanding from "../page/landing page/landing.page";
import NotFoundPage from "../page/not found/not-found.page";
import VerifyEmail from "@/page/auth pages/verify.page";



const Router = createBrowserRouter([
    {
        path:'/',
        element:<PriorixLanding/>

    },
    {
        path:'*',
        element:<NotFoundPage/>

    },
  {
    path: "/auth",
    children: [
      { index: true, element: <SignUpPage /> }, 
      { path: "signup", element: <SignUpPage /> }, 
      { path: "login", element: <LoginPage />  }, 
      { path: "verify-email", element: <VerifyEmail />  }, 
     
     
    ],
  },
]);

export default Router