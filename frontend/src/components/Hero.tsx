interface HeroProps {
    children: React.ReactNode;
}

export default function Hero({ children }: HeroProps) {
    return (
        <section className="hero-gradient relative min-h-[520px] sm:min-h-[560px] flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse-ring" />
                <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse-ring" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 bg-white/10 rounded-full animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-3xl mx-auto animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-white/90 text-xs sm:text-sm font-medium">Sistema en línea — Consulta gratuita</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                    Consulta tu Seguro <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">SCTR</span>
                </h1>
                <p className="text-base sm:text-lg text-blue-100/80 mb-10 max-w-xl mx-auto leading-relaxed">
                    Verifica al instante si cuentas con cobertura del Seguro Complementario de Trabajo de Riesgo ingresando tu DNI
                </p>
            </div>

            {/* Search card slot */}
            <div className="relative z-10 w-full max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {children}
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 80V40C240 10 480 0 720 20C960 40 1200 60 1440 40V80H0Z" fill="#F8FAFD" />
                </svg>
            </div>
        </section>
    );
}
