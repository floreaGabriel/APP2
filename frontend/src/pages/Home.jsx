import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">EMA - Event Management Application</h1>
            <p className="py-6">
              Platformă completă pentru gestionarea și participarea la evenimente.
              Descoperă, organizează și trăiește experiențe memorabile.
            </p>
            <Link to="/events" className="btn btn-primary mr-2">Explorează Evenimente</Link>
            <Link to="/register" className="btn btn-outline">Înscrie-te Acum</Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ce oferim</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-200">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-xl">Descoperă Evenimente</h3>
                <p>Găsește evenimente interesante în orașul tău sau online, filtrează după interesele tale.</p>
              </div>
            </div>
            
            <div className="card bg-base-200">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-xl">Organizează cu Ușurință</h3>
                <p>Instrumente complete pentru crearea și gestionarea evenimentelor tale de succes.</p>
              </div>
            </div>
            
            <div className="card bg-base-200">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-xl">Participă și Conectează</h3>
                <p>Înregistrare simplă, bilete digitale și oportunități de networking.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-primary text-primary-content">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pregătit să începi?</h2>
          <p className="mb-8 max-w-lg mx-auto">Creează-ți contul acum și descoperă toate funcționalitățile EMA.</p>
          <Link to="/register" className="btn btn-secondary">Înregistrează-te Gratuit</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;