import { createContext, useState, useEffect, useContext } from "react";
import { api } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // verificam daca utilizatorul este autentificat 

    useEffect(() => {

        let isMounted = true;

        const checkAuthStatus = async () => {
            try {
                // Încarcă token din localStorage dacă există
                const token = localStorage.getItem('authToken');
                if (token) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }

                console.log('Verificare stare autentificare...');
                const response = await api.get('/auth/me');
                console.log('Răspuns /auth/me:', response.data);

                if (response.data.success) {
                    setUser(response.data.data);
                }
            } catch(error) {
                 // Doar logăm eroarea, fără a bloca interfața
                console.log('Sesiune inactivă sau verificare autentificare eșuată');
                
                if (isMounted) {
                    // Curățăm token-ul doar dacă este eroare 401
                    if (error.response && error.response.status === 401) {
                        localStorage.removeItem('authToken');
                        delete api.defaults.headers.common['Authorization'];
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }

        };

        checkAuthStatus();
        
        return () => {
            isMounted = false;
        };
    }, []);

    // login function
    const login = async (email, password) => {
        setError(null);

        try {
            console.log('Încercare autentificare pentru:', email);
            const response = await api.post('/auth/login', { email, password });
            
            console.log('Răspuns login:', response.data);
            
            if (response.data.success) {
                setUser(response.data.data);
                
                // Salvează token-ul în localStorage pentru backup (deși cookie-ul este principal)
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                    // Setează header-ul pentru toate cererile viitoare
                    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                }
                
                return { success: true };
            } else {
                // Explicitează gestiunea cazului când serverul returnează success: false
                setError(response.data.message || 'Autentificare eșuată');
                return { success: false, error: response.data.message || 'Autentificare eșuată' };
            }
        } catch(error) {
            console.error('Eroare login:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'A apărut o eroare la autentificare');
            return { success: false, error: error.response?.data?.message || 'A apărut o eroare la autentificare' };
        } 
    }

    // register function
    const register = async (userData) => {
        setError(null);
        try {
            const response = await api.post('/auth/signup', userData);
            if (response.data.success) {
                setUser(response.data.data);

                // Salvează token-ul în localStorage
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                }

                return { success: true };
            }
            return { success: false, error: response.data.message || 'Înregistrare eșuată' };
        } catch (err) {
          setError(err.response?.data?.message || 'A apărut o eroare la înregistrare');
          return { success: false, error: err.response?.data?.message || 'A apărut o eroare la înregistrare' };
        }
      };
    
    // logout
    const logout = async () => {
    try {
         // Oprește orice verificare de autentificare în curs 
         if (window.authCheckTimeout) {
            clearTimeout(window.authCheckTimeout);
        }
        
        // Mai întâi curăță starea și localStorage
        setUser(null);
        localStorage.removeItem('authToken');
        delete api.defaults.headers.common['Authorization'];
        
        // Apoi comunică cu serverul pentru a șterge cookie-urile
        await api.post('/auth/logout');
        
        // Force refresh pentru a reseta complet starea aplicației (opțional)
        // window.location.href = '/login';
        
        return { success: true };
    } catch (error) {
        console.error('Eroare logout:', error);
        // Chiar dacă apare o eroare la comunicarea cu serverul,
        // tot resetăm state-ul local pentru siguranță
        setUser(null);
        localStorage.removeItem('authToken');
        delete api.defaults.headers.common['Authorization'];
        
        return { success: false, error: error.response?.data?.message || 'A apărut o eroare la deconectare' };
    }
    };

    const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};