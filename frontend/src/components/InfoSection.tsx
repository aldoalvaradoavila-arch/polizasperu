export default function InfoSection() {
    const cards = [
        {
            title: 'SCTR — Salud',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                </svg>
            ),
            color: 'blue',
            items: [
                'Atención médica por accidentes de trabajo',
                'Hospitalización y cirugías',
                'Medicamentos y rehabilitación',
                'Prótesis y aparatos ortopédicos',
                'Enfermedades profesionales MINSA',
            ],
        },
        {
            title: 'SCTR — Pensión',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'amber',
            items: [
                'Pensión de invalidez (temporal o permanente)',
                'Pensión de sobrevivencia',
                'Gastos de sepelio',
                'Indemnización por deterioro laboral',
                'Cobertura según D.S. 003-98-SA',
            ],
        },
    ];

    return (
        <section id="informacion" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFD]">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#1A3C6E]/10 text-[#1A3C6E] text-xs font-bold uppercase tracking-widest mb-4">
                        Información
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                        ¿Qué cubre el Seguro SCTR?
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                        El Seguro Complementario de Trabajo de Riesgo es obligatorio para empresas con actividades de alto riesgo,
                        según el Decreto Supremo N° 003-98-SA.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                        >
                            <div className={`px-6 pt-6 pb-4 ${card.color === 'blue' ? 'bg-gradient-to-r from-blue-50 to-blue-100/40' : 'bg-gradient-to-r from-amber-50 to-amber-100/40'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${card.color === 'blue' ? 'bg-[#2D7DD2]/10 text-[#2D7DD2]' : 'bg-amber-500/10 text-amber-600'} group-hover:scale-110 transition-transform duration-300`}>
                                        {card.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
                                </div>
                            </div>
                            <div className="px-6 py-5">
                                <ul className="space-y-3">
                                    {card.items.map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                                            <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${card.color === 'blue' ? 'text-[#2D7DD2]' : 'text-amber-500'}`} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
