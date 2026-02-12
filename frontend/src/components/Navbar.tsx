interface NavbarProps {
    onAdminClick?: () => void;
}

export default function Navbar({ onAdminClick }: NavbarProps) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3 group" aria-label="PolizasPeru - Inicio">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D7DD2] to-[#1A3C6E] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                            <span className="text-white font-extrabold text-sm tracking-tight">PP</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-[#1A3C6E] leading-tight">PolizasPeru</span>
                            <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase hidden sm:block">Seguros SCTR</span>
                        </div>
                    </a>

                    {/* Navegación */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        <a
                            href="#informacion"
                            className="text-sm font-medium text-gray-600 hover:text-[#2D7DD2] transition-colors duration-200"
                        >
                            ¿Qué es SCTR?
                        </a>
                        {onAdminClick && (
                            <button
                                onClick={onAdminClick}
                                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#2D7DD2] px-3 py-2 rounded-lg transition-colors duration-200"
                                title="Panel de Administración"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                Admin
                            </button>
                        )}
                        <a
                            href="#contacto"
                            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-white bg-[#1A3C6E] hover:bg-[#2D7DD2] px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Contacto
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
