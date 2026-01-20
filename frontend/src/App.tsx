import { RouterProvider } from "react-router-dom"
import Router from "./router/appRouter"
import { useAuthStore } from "./store/auth.store"
import { useEffect } from "react"
import { Spinner } from "./components/spinner"
import { Toaster } from "sonner";

function App() {
const checkAuth = useAuthStore((s) => s.checkAuth)
  const status = useAuthStore((s) => s.status)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (status === "checking") {
    return <Spinner variant="theme"/>
  }


  return (
    <>

   <RouterProvider router={Router}/>
    <Toaster />
    </>
  )
}

export default App
