import { useState, useRef } from 'react';

interface SearchCardProps {
    onSearch: (dni: string) => void;
    onClear: () => void;
    isLoading: boolean;
}

export default function SearchCard({ onSearch, onClear, isLoading }: SearchCardProps) {
    const [dni, setDni] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const validate = (value: string): string => {
        if (!value.trim()) return 'El DNI es obligatorio';
        if (!/^\d+$/.test(value)) return 'El DNI solo debe contener dígitos numéricos';
        if (value.length !== 8) return 'El DNI debe tener exactamente 8 dígitos';
        return '';
    };

    const handleSubmit = () => {
        const validationError = validate(dni);
        if (validationError) {
            setError(validationError);
            inputRef.current?.focus();
            return;
        }
        setError('');
        onSearch(dni);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSubmit();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 8);
        setDni(value);
        if (error) setError('');
    };

    const handleClear = () => {
        setDni('');
        setError('');
        onClear();
        inputRef.current?.focus();
    };

    return (
        <div className="glass-card rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="flex flex-col gap-4">
                {/* Input */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={dni}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Ingresa tu DNI (8 dígitos)"
                        aria-label="Número de DNI"
                        aria-describedby={error ? 'dni-error' : 'dni-help'}
                        aria-invalid={!!error}
                        maxLength={8}
                        className={`w-full pl-12 pr-10 py-4 text-base sm:text-lg rounded-xl border-2 transition-all duration-200 outline-none
              ${error
                                ? 'border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                : 'border-gray-200 bg-white focus:border-[#2D7DD2] focus:ring-4 focus:ring-blue-100'
                            }
              placeholder:text-gray-400 font-medium tracking-wider`}
                        id="dni-input"
                    />
                    {dni && (
                        <button
                            onClick={handleClear}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Limpiar campo"
                            type="button"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Error message */}
                {error && (
                    <p id="dni-error" role="alert" className="flex items-center gap-2 text-sm text-red-600 animate-fade-in">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}

                {/* Help text */}
                {!error && (
                    <p id="dni-help" className="text-xs text-gray-400 pl-1">
                        Ingresa los 8 dígitos de tu Documento Nacional de Identidad
                    </p>
                )}

                {/* Search button */}
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#1A3C6E] to-[#2D7DD2] hover:from-[#0F2847] hover:to-[#1A6DC0]
            text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl
            transform hover:-translate-y-0.5 active:translate-y-0
            transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
            flex items-center justify-center gap-3"
                    id="buscar-btn"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Buscando...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Buscar
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
