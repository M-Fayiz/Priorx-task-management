import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "../page/auth pages/signUp.page";
import LoginPage from "../page/auth pages/login.page";
import PriorixLanding from "../page/landing page/landing.page";
import NotFoundPage from "../page/not found/not-found.page";
import VerifyEmail from "@/page/auth pages/verify.page";
import { TaskPage } from "@/page/task/task.page";
import { Protected_Router } from "@/components/protectedRouter";
import { AnalyticsPage } from "@/page/task/analytical.page";



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
  {
    path: "/dashboard",
    element:<Protected_Router/>,
    children: [
      { index: true, element: <TaskPage /> }, 
      { path: "tasks", element: <TaskPage /> }, 
      { path: "analytics", element: <AnalyticsPage /> }, 
    ],
  },
]);

export default Router