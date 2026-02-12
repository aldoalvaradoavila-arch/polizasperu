import type { BusquedaResultado } from '../types';

interface ResultCardProps {
    data: BusquedaResultado;
}

function formatDate(dateStr: string): string {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
}

function BadgeEstado({ estado }: { estado: string }) {
    const isActivo = estado === 'ACTIVO';
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
        ${isActivo
                    ? 'bg-[#E6F9F1] text-[#0E9E6B] ring-1 ring-[#0E9E6B]/20'
                    : 'bg-[#FDECEA] text-[#C0392B] ring-1 ring-[#C0392B]/20'
                }`}
        >
            {isActivo ? (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            ) : (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            )}
            {isActivo ? 'VIGENTE' : 'VENCIDO'}
        </span>
    );
}

function PolizaBlock({ poliza }: { poliza: ResultCardProps['data']['polizas'][0] }) {
    const isSalud = poliza.tipo === 'SCTR_SALUD';
    const label = isSalud ? 'SCTR — Salud' : 'SCTR — Pensión';
    const numLabel = isSalud ? 'N° Contrato' : 'N° Póliza';
    const icon = isSalud ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
        </svg>
    ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    return (
        <div className={`rounded-xl p-5 transition-all duration-200 hover:shadow-md
      ${isSalud ? 'bg-blue-50/60 border border-blue-100' : 'bg-amber-50/60 border border-amber-100'}`}>
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSalud ? 'bg-blue-100 text-[#2D7DD2]' : 'bg-amber-100 text-amber-600'}`}>
                        {icon}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-base">{label}</h4>
                        <p className="text-sm text-gray-500">{numLabel}: <span className="font-semibold text-gray-700">{poliza.numero}</span></p>
                    </div>
                </div>
                <BadgeEstado estado={poliza.estado} />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/80 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Inicio</p>
                    <p className="text-sm font-semibold text-gray-800">{formatDate(poliza.fecha_inicio)}</p>
                </div>
                <div className="bg-white/80 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Fin</p>
                    <p className="text-sm font-semibold text-gray-800">{formatDate(poliza.fecha_fin)}</p>
                </div>
            </div>
        </div>
    );
}

export default function ResultCard({ data }: ResultCardProps) {
    const { asegurado, empresa, polizas } = data;
    const fullName = `${asegurado.nombres} ${asegurado.apellido_paterno} ${asegurado.apellido_materno}`;

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up" id="resultado">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#1A3C6E] to-[#2D7DD2] px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-blue-200 text-xs font-medium uppercase tracking-wider">Asegurado</p>
                            <h3 className="text-white font-bold text-lg">{fullName}</h3>
                            <p className="text-blue-200 text-sm">DNI: {asegurado.dni}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-5">
                    {/* Empresa */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Empresa contratante</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <p className="text-xs text-gray-400">Razón social</p>
                                <p className="text-sm font-semibold text-gray-800">{empresa.razon_social}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">RUC</p>
                                <p className="text-sm font-semibold text-gray-800">{empresa.ruc}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Actividad económica</p>
                                <p className="text-sm font-semibold text-gray-800">{empresa.actividad}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Sede</p>
                                <p className="text-sm font-semibold text-gray-800">{empresa.sede}</p>
                            </div>
                        </div>
                    </div>

                    {/* Pólizas */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Coberturas activas</h4>
                        {polizas.map((p) => (
                            <PolizaBlock key={p.tipo} poliza={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
