import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/auth.service.js';

// Creăm contextul
const AuthContext = createContext(null);

// Cream un provider care va înconjura aplicația
export const AuthProvider = ({ children }) => {
    // Starea pentru utilizatorul curent și loading
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verificăm dacă există un token salvat când se încarcă aplicația
    useEffect(() => {
        const checkAuth = () => {
            // Verificăm dacă există un token
            if (authService.isAuthenticated()) {
                setUser({ isAuthenticated: true });
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    // Funcția de login care va fi disponibilă în tot proiectul
    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            setUser({ isAuthenticated: true, ...response.user });
            return response;
        } catch (error) {
            throw error;
        }
    };

    // Funcția de logout
    const logout = () => {
        authService.logout();
        setUser(null);
        // Aici putem adăuga și redirecționarea către pagina de login
        window.location.href = '/login';
    };

    // Valorile pe care le vom expune în context
    const value = {
        user,           // datele utilizatorului
        loading,        // starea de loading
        login,          // funcția de login
        logout,        // funcția de logout
        isAuthenticated: !!user // helper pentru a verifica rapid autentificarea
    };

    // Dacă aplicația încă se încarcă, putem afișa un indicator de loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // Returnăm provider-ul cu toate valorile necesare
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Cream un hook personalizat pentru a accesa mai ușor contextul
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth trebuie folosit în interiorul unui AuthProvider');
    }
    return context;
};