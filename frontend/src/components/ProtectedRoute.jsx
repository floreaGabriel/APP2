import { Navigate, Outlet} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const {isAuthenticated, loading} = useAuth();

    // daca nu se incarca, afisam un spinner, buton de loading

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        )
    }

    // daca nu este autentificat, redirectam catre login

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // daca este autentificat afisam child routes
    return <Outlet />;
};

export default ProtectedRoute;