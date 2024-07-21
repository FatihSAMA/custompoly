import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Gold from "../pages/Gold";
import Test from "../pages/Test";

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
                path : "test",
                element : <Test />
            }
        ]
    }
])

export default router