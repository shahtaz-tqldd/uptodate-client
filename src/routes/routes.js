import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import BlogDetails from "../pages/Blogs/BlogDetails";
import Bloggers from "../pages/Dashboard.js/Bloggers/Bloggers";
import BlogsDashboard from "../pages/Dashboard.js/BlogsDashboard/BlogsDashboard";
import Dashboard from "../pages/Dashboard.js/Dashboard";
import Users from "../pages/Dashboard.js/Users/Users";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/LoginRegister/Login";
import Register from "../pages/LoginRegister/Register";
import AdminRoute from "./AdminRoute";

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
            },
            {
                path: '*',
                element: <ErrorPage/>
            },
            {
                path: '/dashboard',
                element: <AdminRoute><DashboardLayout /></AdminRoute>,
                children: [
                    {
                        path: '/dashboard',
                        element: <Dashboard/>
                    },
                    {
                        path: '/dashboard/blogs',
                        element: <BlogsDashboard/>
                    },
                    {
                        path: '/dashboard/bloggers',
                        element: <Bloggers/>
                    },
                    {
                        path: '/dashboard/users',
                        element: <Users/>
                    },
                ]
            },
        ]
    }
])