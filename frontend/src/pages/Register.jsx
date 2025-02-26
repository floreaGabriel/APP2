import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    roles: ['PARTICIPANT'], // Default role
  });
  
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        roles: [...formData.roles.filter(role => role !== 'PARTICIPANT' && role !== 'ORGANIZER'), e.target.value]
      });
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setFormError('Parolele nu coincid');
      return false;
    }
    
    if (formData.password.length < 8) {
      setFormError('Parola trebuie să aibă cel puțin 8 caractere');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    // Eliminăm confirmPassword înainte de a trimite datele către API
    const { confirmPassword, ...userData } = formData;
    
    try {
      // Adăugăm status-ul implicit
      userData.status = 'ACTIVE';
      
      const { success, error } = await register(userData);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setFormError(error || 'A apărut o eroare la înregistrare');
      }
    } catch (err) {
      setFormError('A apărut o eroare la înregistrare');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-8">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center">Înregistrare</h2>
          
          {formError && (
            <div className="alert alert-error mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formError}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Prenume</span>
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Prenume"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nume</span>
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Nume"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nume utilizator</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nume utilizator"
                className="input input-bordered w-full"
                required
              />
            </div>
            
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  minLength="8"
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirmă parola</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmă parola"
                  className="input input-bordered w-full"
                  required
                  minLength="8"
                />
              </div>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tip de cont</span>
              </label>
              <div className="flex space-x-4">
                <label className="label cursor-pointer">
                  <input 
                    type="radio" 
                    name="role" 
                    value="PARTICIPANT" 
                    className="radio radio-primary" 
                    checked={formData.roles.includes('PARTICIPANT')}
                    onChange={handleRoleChange}
                  />
                  <span className="label-text ml-2">Participant</span>
                </label>
                <label className="label cursor-pointer">
                  <input 
                    type="radio" 
                    name="role" 
                    value="ORGANIZER" 
                    className="radio radio-primary" 
                    checked={formData.roles.includes('ORGANIZER')}
                    onChange={handleRoleChange}
                  />
                  <span className="label-text ml-2">Organizator</span>
                </label>
              </div>
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
                  'Înregistrare'
                )}
              </button>
            </div>
          </form>
          
          <div className="divider my-4">SAU</div>
          
          <p className="text-center">
            Ai deja un cont? 
            <Link to="/login" className="link link-primary ml-1">
              Autentifică-te
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;