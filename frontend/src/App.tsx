import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchCard from './components/SearchCard';
import ResultCard from './components/ResultCard';
import NotFoundCard from './components/NotFoundCard';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';
import { buscarAsegurado } from './services/api';
import type { BusquedaResponse } from './types';

type AppState = 'idle' | 'loading' | 'found' | 'not-found' | 'error';

export default function App() {
    const [state, setState] = useState<AppState>('idle');
    const [result, setResult] = useState<BusquedaResponse | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSearch = async (dni: string) => {
        setState('loading');
        setErrorMsg('');
        try {
            const data = await buscarAsegurado(dni);
            setResult(data);
            setState(data.encontrado ? 'found' : 'not-found');

            // Scroll to result
            setTimeout(() => {
                document.getElementById('resultado')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                document.getElementById('no-resultado')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (err: unknown) {
            console.error(err);
            if (
                err &&
                typeof err === 'object' &&
                'response' in err &&
                err.response &&
                typeof err.response === 'object' &&
                'data' in err.response &&
                err.response.data &&
                typeof err.response.data === 'object' &&
                'error' in err.response.data
            ) {
                setErrorMsg((err.response as { data: { error: string } }).data.error);
            } else {
                setErrorMsg('Error al conectar con el servidor. Intente nuevamente.');
            }
            setState('error');
        }
    };

    const handleClear = () => {
        setState('idle');
        setResult(null);
        setErrorMsg('');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Hero + Search */}
                <Hero>
                    <SearchCard
                        onSearch={handleSearch}
                        onClear={handleClear}
                        isLoading={state === 'loading'}
                    />
                </Hero>

                {/* Results area */}
                <section className="py-10 px-4 sm:px-6 lg:px-8 -mt-4">
                    {state === 'found' && result && result.encontrado && (
                        <ResultCard data={result} />
                    )}

                    {state === 'not-found' && (
                        <NotFoundCard />
                    )}

                    {state === 'error' && (
                        <div className="max-w-lg mx-auto animate-fade-in-up">
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-red-700 font-medium text-sm">{errorMsg}</p>
                            </div>
                        </div>
                    )}

                    {state === 'loading' && (
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                                <div className="h-6 w-48 animate-shimmer rounded-lg" />
                                <div className="h-4 w-full animate-shimmer rounded-lg" />
                                <div className="h-4 w-3/4 animate-shimmer rounded-lg" />
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="h-24 animate-shimmer rounded-xl" />
                                    <div className="h-24 animate-shimmer rounded-xl" />
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Informative section */}
                <InfoSection />
            </main>

            <Footer />
        </div>
    );
}
