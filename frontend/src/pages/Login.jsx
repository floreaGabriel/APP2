import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {

    // ca un fel de initializare de variabile
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formError, setFormError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormError('');

        try {
            const { success, error } = await login(formData.email, formData.password);
        
        if (success) {
            console.log('Login successful, redirecting...');
            navigate('/dashboard');
        } else {
            console.error('Login failed:', error);
            setFormError(error || 'A apărut o eroare la autentificare');
        }
        } catch(err) {
            console.error('Exception in login:', err);
            setFormError('A apărut o eroare la autentificare');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
          <div className="card w-full max-w-md bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold text-center">Autentificare</h2>
              
              {formError && (
                <div className="alert alert-error mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formError}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemplu@email.com"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Parolă</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Parolă"
                    className="input input-bordered w-full"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Ai uitat parola?</a>
                  </label>
                </div>
                
                <div className="form-control mt-6">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Se procesează...
                      </>
                    ) : (
                      'Autentificare'
                    )}
                  </button>
                </div>
              </form>
              
              <div className="divider my-4">SAU</div>
              
              <p className="text-center">
                Nu ai un cont? 
                <Link to="/register" className="link link-primary ml-1">
                  Înregistrează-te
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
};

export default Login;