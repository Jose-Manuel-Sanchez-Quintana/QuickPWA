import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ isAllowed, redirectTo = "/landing", children }) => {
    if (!isAllowed) {
        return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet />
}