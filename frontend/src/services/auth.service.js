
const API_URL = 'http://localhost:5001/api';

class AuthService {

    // metoda pentru login

    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // important pentru cookies
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Autentificare esuată');
            }

            // daca totul e ok, salvam tokenul in localStorage

            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
    }

    // !! transforma un string in boolean
    isAuthenticated() {
        return !!localStorage.getItem('token');
    }

}

export const authService = new AuthService();