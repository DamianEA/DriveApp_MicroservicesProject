import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ allowedRoles }) {
const storedUser = sessionStorage.getItem('user');

if (!storedUser) {
    return <Navigate to="/login" replace />;
}

const user = JSON.parse(storedUser);

if (allowedRoles && !allowedRoles.includes(user.role)) {

    return <Navigate to="/login" replace />;
}

return <Outlet />;
}

export default ProtectedRoute;