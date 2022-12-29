import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import BlogDetails from "../pages/Blogs/BlogDetails";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/LoginRegister/Login";
import Register from "../pages/LoginRegister/Register";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Homepage/>
            },
            {
                path: '/blogs/:id',
                element: <BlogDetails/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            }
        ]
    }
])