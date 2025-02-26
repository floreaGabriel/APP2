import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Debug = () => {
  const { user, isAuthenticated } = useAuth();
  const [meResponse, setMeResponse] = useState(null);
  const [meError, setMeError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [testResponse, setTestResponse] = useState(null);
  const [cookieInfo, setCookieInfo] = useState('Verificare...');

  const checkAuthCookie = () => {
    // Doar pentru debug - afișează toate cookie-urile disponibile
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const tokenCookie = cookies.find(c => c.startsWith('token='));
    
    if (tokenCookie) {
      setCookieInfo(`Cookie 'token' găsit: ${tokenCookie.substring(6, 20)}...`);
    } else {
      setCookieInfo('Cookie-ul "token" nu există');
    }
  };

  const testAuthEndpoint = async () => {
    try {
      const response = await api.get('/auth/me');
      setMeResponse(response.data);
      setMeError(null);
    } catch (error) {
      console.error('Eroare la testarea /auth/me:', error);
      setMeError(error.response?.data || { error: error.message });
      setMeResponse(null);
    }
  };

  const testConnection = async () => {
    try {
      // Endpoint simplu care nu necesită autentificare, doar pentru testare
      const response = await api.get('/');
      setTestResponse(response.data);
    } catch (error) {
      setTestResponse(error.response?.data || { error: error.message });
    }
  };

  useEffect(() => {
    checkAuthCookie();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pagină de Debug Autentificare</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Stare Autentificare</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <tbody>
                  <tr>
                    <td className="font-semibold">isAuthenticated</td>
                    <td>{JSON.stringify(isAuthenticated)}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">User</td>
                    <td>
                      <pre className="text-xs whitespace-pre-wrap">
                        {user ? JSON.stringify(user, null, 2) : 'null'}
                      </pre>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Token (localStorage)</td>
                    <td className="break-all text-xs">
                      {token ? `${token.substring(0, 20)}...` : 'null'}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Cookie Info</td>
                    <td>{cookieInfo}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary" onClick={checkAuthCookie}>
                Verifică Cookie-uri
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Testare API</h2>
            <div className="space-y-4">
              <div>
                <button className="btn btn-primary w-full mb-2" onClick={testAuthEndpoint}>
                  Testează /auth/me
                </button>
                {meResponse && (
                  <div className="bg-success/20 p-2 rounded">
                    <pre className="text-xs whitespace-pre-wrap">
                      {JSON.stringify(meResponse, null, 2)}
                    </pre>
                  </div>
                )}
                {meError && (
                  <div className="bg-error/20 p-2 rounded">
                    <pre className="text-xs whitespace-pre-wrap">
                      {JSON.stringify(meError, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              <div>
                <button className="btn btn-secondary w-full mb-2" onClick={testConnection}>
                  Testează Conexiune API
                </button>
                {testResponse && (
                  <div className="bg-info/20 p-2 rounded">
                    <pre className="text-xs whitespace-pre-wrap">
                      {JSON.stringify(testResponse, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debug;