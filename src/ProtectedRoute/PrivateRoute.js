import { Navigate, Outlet } from "react-router-dom";

const userId = localStorage.getItem("userId")

export default function PrivateRoute() {



    return (
        userId ? (<Outlet />) : (<Navigate to='/login' />)
    )
}