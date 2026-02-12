export default function NotFoundCard() {
    return (
        <div className="max-w-lg mx-auto animate-fade-in-up" id="no-resultado">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-amber-50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    No se encontraron seguros
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    No se encontraron seguros registrados para el DNI ingresado.
                    Verifica que el número sea correcto.
                </p>

                <div className="bg-blue-50 rounded-xl p-4 text-left">
                    <p className="text-xs font-semibold text-[#2D7DD2] uppercase tracking-wider mb-2">¿Necesitas ayuda?</p>
                    <p className="text-sm text-gray-600">
                        Contacta a <span className="font-semibold text-[#1A3C6E]">PolizasPeru</span> para verificar tu cobertura
                        o solicitar información sobre nuestros seguros SCTR.
                    </p>
                </div>
            </div>
        </div>
    );
}
