import React from 'react';

const SignUpPage = () => {
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        birthDate: '',
        role: 'PARTICIPANT',
        subscriptionPlan: 'FREE',
        companyName: '',
        companyDescription: ''
    });

    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validări
        if (formData.password !== formData.confirmPassword) {
            setError('Parolele nu coincid!');
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Parola trebuie să aibă cel puțin 8 caractere!');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    username: formData.email, // folosim email-ul ca username
                    roles: [formData.role],
                    status: 'ACTIVE',
                    ...(formData.role === 'ORGANIZER' && {
                        organizerProfile: {
                            companyName: formData.companyName,
                            description: formData.companyDescription,
                            subscriptionPlan: formData.subscriptionPlan,
                            verificationStatus: 'PENDING'
                        }
                    })
                })
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Înregistrarea a eșuat');
            }

            // Redirect la login după înregistrare reușită
            window.location.href = '/login';
            
        } catch (error) {
            setError(error.message || 'A apărut o eroare la înregistrare');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const renderPricingCards = () => {
        if (formData.role !== 'ORGANIZER') return null;

        const plans = [
            {
                name: 'FREE',
                price: '0',
                features: [
                    'Până la 2 evenimente active',
                    'Statistici de bază',
                    'Suport email',
                    'Personalizare limitată'
                ],
                disabledFeatures: [
                    'Export date',
                    'Integrări API',
                    'Suport prioritar'
                ]
            },
            {
                name: 'PREMIUM',
                price: '29',
                popular: true,
                features: [
                    'Până la 10 evenimente active',
                    'Statistici avansate',
                    'Suport prioritar',
                    'Personalizare completă',
                    'Export date'
                ],
                disabledFeatures: [
                    'Integrări API'
                ]
            },
            {
                name: 'ENTERPRISE',
                price: '99',
                features: [
                    'Evenimente nelimitate',
                    'Statistici complete',
                    'Suport 24/7',
                    'Personalizare completă',
                    'Export date',
                    'Integrări API'
                ],
                disabledFeatures: []
            }
        ];

        return (
            <div className="grid grid-cols-1 gap-6 w-full max-w-4xl">
                {plans.map((plan) => (
                    <div 
                        key={plan.name}
                        className={`card w-96 bg-base-100 shadow-sm ${formData.subscriptionPlan === plan.name ? 'ring-2 ring-purple-500' : ''}`}
                        onClick={() => handleChange({ target: { name: 'subscriptionPlan', value: plan.name } })}
                    >
                        <div className="card-body">
                            {plan.popular && <span className="badge badge-xs badge-warning">Most Popular</span>}
                            <div className="flex justify-between">
                                <h2 className="text-3xl font-bold">{plan.name}</h2>
                                <span className="text-xl">${plan.price}/mo</span>
                            </div>
                            <ul className="mt-6 flex flex-col gap-2 text-xs">
                                {plan.features.map((feature) => (
                                    <li key={feature}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                                {plan.disabledFeatures.map((feature) => (
                                    <li key={feature} className="opacity-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="line-through">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <button 
                                    className={`btn btn-block ${formData.subscriptionPlan === plan.name ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => handleChange({ target: { name: 'subscriptionPlan', value: plan.name } })}
                                >
                                    {formData.subscriptionPlan === plan.name ? 'Selected' : 'Select'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 flex justify-center py-12">
            <div className="flex gap-8 max-w-7xl mx-4">
                {/* Form Section */}
                <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg h-fit">
                    <div>
                        <h2 className="text-2xl font-semibold text-center text-white">
                            Creează cont nou
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-300">Prenume</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 mt-1 text-gray-300 focus:outline-none focus:border-purple-500"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300">Nume</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 mt-1 text-gray-300 focus:outline-none focus:border-purple-500"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 mt-1 text-gray-300 focus:outline-none focus:border-purple-500"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-300">Parolă</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 mt-1 text-gray-300 focus:outline-none focus:border-purple-500"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300">Confirmă parola</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 mt-1 text-gray-300 focus:outline-none focus:border-purple-500"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300">Data nașterii</label>
                            <input
                                type="date"
                                name="birthDate"
                                className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 mt-1 text-gray-300 focus:outline-none focus:border-purple-500"
                                value={formData.birthDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300">Tip cont</label>
                            <select
                                name="role"
                                className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 mt-1 text-gray-300 focus:outline-none focus:border-purple-500"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="PARTICIPANT">Participant</option>
                                <option value="ORGANIZER">Organizator</option>
                            </select>
                        </div>

                        {formData.role === 'ORGANIZER' && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm text-gray-300">Numele Companiei</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 text-gray-300 focus:outline-none focus:border-purple-500"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required={formData.role === 'ORGANIZER'}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm text-gray-300">Descriere Companie</label>
                                    <textarea
                                        name="companyDescription"
                                        className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 text-gray-300 focus:outline-none focus:border-purple-500"
                                        rows="4"
                                        value={formData.companyDescription}
                                        onChange={handleChange}
                                        required={formData.role === 'ORGANIZER'}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            {error && (
                                <div className="text-red-500 text-sm mb-4">
                                    {error}
                                </div>
                            )}
                            <button 
                                type="submit" 
                                className={`w-full bg-purple-600 text-white rounded-md py-2 px-4 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Se creează contul...' : 'Creează cont'}
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-400">
                                Ai deja cont?{' '}
                                <a href="/login" className="text-purple-400 hover:text-purple-300">
                                    Conectează-te
                                </a>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Pricing Cards Section */}
                {formData.role === 'ORGANIZER' && (
                    <div className="flex flex-col gap-6">
                        {renderPricingCards()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUpPage;