import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Gold from "../pages/Gold";

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
            }
        ]
    }
])

export default router