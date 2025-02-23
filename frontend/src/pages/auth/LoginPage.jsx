import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const LoginPage = () => {

  // folosim hookul useAuth in cazul in care este deja logat
  const {login} = useAuth();
  // ne cream o structura in care sa tinem datele din formular
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })


  // stare pentru a tine mesajul de eroare si loading
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // handler pentru schimbarea valorii din input

  const handleChange = (e) => {
    // setam valoarea din formular in formData
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevenim comportamentul default al formularului
    setLoading(true); // setam loading la true
    setError(''); // resetam eroarea

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password
        })
    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || 'Înregistrarea a eșuat');
    }

    // Redirect la login după înregistrare reușită
    window.location.href = '/dashboard';

    } catch (error) {
      setError(error.message || 'A aparut o eroare la autentificare');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className='card-title'>
              Conectare
            </h2>

            {/** input pentru email */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  name='email'
                  className='input w-full'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              {/* input pentru parola */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='password'
                  name='password'
                  className='input w-full'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div role="alert" className="alert alert-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ?
                  <button className="btn">
                    <span className="loading loading-spinner justify-center"></span>
                    loading
                  </button> : 'Conectare'}
              </button>

              <p className="text-center text-sm mt-4">
                Nu ai cont încă?{' '}
                <a href="/signup" className="link link-primary">
                  Înregistrează-te
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


export default LoginPage