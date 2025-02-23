import { useState, useEffect } from 'react';


const TokenTest = () => {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const testToken = async () => {
            try {
                // Facem un request către endpoint-ul protejat
                const response = await fetch('http://localhost:5001/api/test-auth', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setStatus('Token valid: ' + data.message);
                } else {
                    setStatus('Token invalid sau expirat');
                }
            } catch (error) {
                setStatus('Eroare la verificarea token-ului: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        testToken();
    }, []);

    if (loading) {
        return <div className="text-center p-4">Se verifică token-ul...</div>;
    }

    return (
        <div className="card bg-base-100 shadow-xl m-4">
            <div className="card-body">
                <h2 className="card-title">Status Token</h2>
                <p className={status.includes('valid') ? 'text-success' : 'text-error'}>
                    {status}
                </p>
                <div className="card-actions mt-4">
                    <button 
                        className="btn btn-primary"
                        onClick={() => {
                            console.log('Token stocat:', localStorage.getItem('token'));
                        }}
                    >
                        Afișează Token în Consolă
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TokenTest;