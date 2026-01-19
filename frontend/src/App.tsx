import { RouterProvider } from "react-router-dom"
import Router from "./router/appRouter"
import { useAuthStore } from "./store/auth.store"
import { useEffect } from "react"
import { Spinner } from "./components/spinner"


function App() {
const checkAuth = useAuthStore((s) => s.checkAuth)
  const status = useAuthStore((s) => s.status)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (status === "checking") {
    return <Spinner/>
  }


  return (
    <>

   <RouterProvider router={Router}/>
    
    </>
  )
}

export default App
