export default function Footer() {
    return (
        <footer id="contacto" className="bg-[#0F2847] text-gray-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D7DD2] to-[#1A3C6E] flex items-center justify-center">
                                <span className="text-white font-extrabold text-sm">PP</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">PolizasPeru</h3>
                                <p className="text-xs text-gray-400">S.A. EPS / Seguros SA</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Proveedor de Seguro Complementario de Trabajo de Riesgo (SCTR)
                            para empresas peruanas.
                        </p>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm">
                                <svg className="w-4 h-4 text-[#2D7DD2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                contacto@polizasperu.pe
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <svg className="w-4 h-4 text-[#2D7DD2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                (01) 200-4000
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <svg className="w-4 h-4 text-[#2D7DD2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Lima, Perú
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="hover:text-white transition-colors cursor-pointer">Política de Privacidad</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Términos de Uso</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Ley N° 29733 — Datos Personales</li>
                            <li className="hover:text-white transition-colors cursor-pointer">D.S. N° 003-98-SA</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-700/50 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} PolizasPeru S.A. — Todos los derechos reservados.
                    </p>
                    <p className="text-xs text-gray-500">
                        Esta consulta no almacena ni recopila datos personales.
                    </p>
                </div>
            </div>
        </footer>
    );
}
