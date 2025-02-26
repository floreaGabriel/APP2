import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
    const {user, isAuthenticated, logout} = useAuth();

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div className="navbar bg-base-100 shadow-md">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex="0" className="menu dropdown-content z-[1] mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/">Acasă</Link></li>
                <li><Link to="/events">Evenimente</Link></li>
                <li><Link to="/debug">Debug</Link></li>
                {isAuthenticated && (
                  <li><Link to="/dashboard">Dashboard</Link></li>
                )}
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl">EMA</Link>
          </div>
          
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><Link to="/">Acasă</Link></li>
              <li><Link to="/events">Evenimente</Link></li>
              {isAuthenticated && (
                <li><Link to="/dashboard">Dashboard</Link></li>
              )}
            </ul>
          </div>
          
          <div className="navbar-end">
            {isAuthenticated ? (
              <div className="dropdown dropdown-end">
                <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Avatar" />
                  </div>
                </div>
                <ul tabIndex="0" className="menu dropdown-content z-[1] mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                  <li className="menu-title font-semibold">{user.firstname} {user.lastname}</li>
                  <li><Link to="/profile">Profilul meu</Link></li>
                  <li><Link to="/settings">Setări</Link></li>
                  <li><button onClick={handleLogout}>Deconectare</button></li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-ghost">Autentificare</Link>
                <Link to="/register" className="btn btn-primary">Înregistrare</Link>
              </div>
            )}
          </div>
        </div>
      );
}

export default Navbar;