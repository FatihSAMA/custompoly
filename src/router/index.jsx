import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import Home from "../pages/Home"
import Gold from "../pages/Gold"
import Success from "../pages/Success"

const router = createBrowserRouter([
    {
        path : "/",
        element : <MainLayout />,
        children : [
            {
                index : true,
                element : <Home />
            },
            {
                path : "gold",
                element : <Gold />
            },
            {
                path : "success",
                element : <Success />
            }
        ]
    }
])

export default router