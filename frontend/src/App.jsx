import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Debug from './pages/Debug';
import './App.css';


// Pagina Profile placeholder simplă
const ProfilePage = () => (
  <div className="container mx-auto py-8 px-4">
    <h1 className="text-3xl font-bold mb-8">Profilul meu</h1>
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Informații profil</h2>
        <p>Pagină în construcție</p>
      </div>
    </div>
  </div>
);

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Rute publice */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/debug" element={<Debug />} />

                {/* Rute protejate */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
                
                {/* Rută pentru 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
