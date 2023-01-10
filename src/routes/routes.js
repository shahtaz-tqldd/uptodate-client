import { createBrowserRouter } from "react-router-dom";
import PaymentCondition from "../components/PaymentCondition";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import BloggerRequestPage from "../pages/BloggerRequest/BloggerRequestPage";
import BlogDetails from "../pages/Blogs/BlogDetails";
import Payment from "../pages/CheckOut/Payment";
import PaymentSuccess from "../pages/CheckOut/PaymentSuccess";
import BloggerRequest from "../pages/Dashboard.js/Bloggers/BloggerRequest";
import Bloggers from "../pages/Dashboard.js/Bloggers/Bloggers";
import BlogsDashboard from "../pages/Dashboard.js/BlogsDashboard/BlogsDashboard";
import CategoriesPage from "../pages/Dashboard.js/CatogoriesPage/CategoriesPage";
import Dashboard from "../pages/Dashboard.js/Dashboard";
import FavouritePost from "../pages/Dashboard.js/Profile/FavouritePost";
import SavedPost from "../pages/Dashboard.js/Profile/SavedPost";
import Users from "../pages/Dashboard.js/Users/Users";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/LoginRegister/Login";
import Register from "../pages/LoginRegister/Register";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

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
                element: <BlogDetails />,
                loader: async({params})=> await fetch(`http://localhost:5000/blogs/${params.id}`)
            },
            {
                path: '/blogger-request',
                element: <BloggerRequestPage />
            },
            {
                path: '/payment-condition',
                element: <PaymentCondition />
            },
            {
                path: '/payment',
                element: <PrivateRoute><Payment/></PrivateRoute>
            },
            {
                path: '/payment/success',
                element: <PrivateRoute><PaymentSuccess/></PrivateRoute>
            },
            {
                path: '/dashboard/saved',
                element: <PrivateRoute><SavedPost/></PrivateRoute>
            },
            {
                path: '/dashboard/favourite',
                element: <PrivateRoute><FavouritePost/></PrivateRoute>
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
                        path: '/dashboard/blogger-request',
                        element: <BloggerRequest/>
                    },
                    {
                        path: '/dashboard/categories',
                        element: <CategoriesPage/>
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