import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 2;
            }

            move() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            }
        }

        // Create particles
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }

        // Animation
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw particles and connections
            particles.forEach(particle => {
                particle.move();

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(29, 78, 216, 0.4)';
                ctx.fill();

                // Draw connections
                particles.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(29, 78, 216, ${0.2 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="flex flex-col w-full min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 w-full h-full bg-gradient-to-br from-base-100 to-base-200"
                style={{ zIndex: 0 }}
            />

            {/* Navbar transparent */}
            <div className="navbar bg-transparent fixed top-0 z-50 backdrop-blur-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">EMA</a>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-24 md:w-80 bg-base-100 bg-opacity-50 hidden md:block"
                    />
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Profile"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge badge-primary">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main content with full height sections */}
            <main className="flex-1 relative z-10">
                {/* Hero section taking full viewport height */}
                <section className="min-h-screen flex items-center justify-center px-4 pt-16">
                    <div className="hero-content text-center">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Event Management Application
                            </h1>
                            <p className="text-lg md:text-xl mb-8 text-base-content opacity-90 px-4">
                                Transformă-ți evenimentele în experiențe memorabile.
                                Platforma completă pentru organizarea și gestionarea evenimentelor,
                                conectând organizatori și participanți într-un mod elegant și eficient.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/signup" className="btn btn-primary btn-lg">
                                    Caută Evenimente
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features section taking full width */}
                <section className="min-h-screen bg-base-200/50 backdrop-blur-sm px-4 py-16">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                            Caracteristici Principale
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="card bg-base-100/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                                <div className="card-body">
                                    <div className="badge badge-primary mb-2">Pentru Organizatori</div>
                                    <h3 className="card-title text-2xl">Management Complet</h3>
                                    <p className="text-base-content/80">Gestionează evenimente, participanți și resurse într-un singur loc.</p>
                                </div>
                            </div>

                            <div className="card bg-base-100/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                                <div className="card-body">
                                    <div className="badge badge-secondary mb-2">Pentru Participanți</div>
                                    <h3 className="card-title text-2xl">Descoperă Evenimente</h3>
                                    <p className="text-base-content/80">Găsește și participă la evenimente care te inspiră.</p>
                                </div>
                            </div>

                            <div className="card md:col-span-2 lg:col-span-1 bg-base-100/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                                <div className="card-body">
                                    <div className="badge badge-accent mb-2">Analytics</div>
                                    <h3 className="card-title text-2xl">Date & Statistici</h3>
                                    <p className="text-base-content/80">Insights valoroase pentru optimizarea evenimentelor tale.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;