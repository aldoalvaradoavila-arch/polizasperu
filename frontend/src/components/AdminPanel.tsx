import { useState, useEffect } from 'react';
import AdminAPI, { Asegurado, Empresa } from '../services/adminApi';
import AseguradosManager from './AseguradosManager';
import EmpresasManager from './EmpresasManager';
import './AdminPanel.css';

interface AdminPanelProps {
    apiKey: string;
    onLogout: () => void;
}

type Tab = 'dashboard' | 'asegurados' | 'empresas';

export default function AdminPanel({ apiKey, onLogout }: AdminPanelProps) {
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [asegurados, setAsegurados] = useState<Asegurado[]>([]);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const api = new AdminAPI(apiKey);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError('');
        try {
            const [aseguradosData, empresasData] = await Promise.all([
                api.getAsegurados(),
                api.getEmpresas(),
            ]);
            setAsegurados(aseguradosData.asegurados);
            setEmpresas(empresasData.empresas);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar datos');
            if (err instanceof Error && err.message.includes('No autorizado')) {
                setTimeout(onLogout, 2000);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            onLogout();
        }
    };

    return (
        <div className="admin-panel">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <div className="admin-logo">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span>PolizasPeru</span>
                    </div>
                    <p className="admin-subtitle">Panel de Administración</p>
                </div>

                <nav className="admin-nav">
                    <button
                        className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        Dashboard
                    </button>

                    <button
                        className={`nav-item ${activeTab === 'asegurados' ? 'active' : ''}`}
                        onClick={() => setActiveTab('asegurados')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        Asegurados
                        <span className="badge">{asegurados.length}</span>
                    </button>

                    <button
                        className={`nav-item ${activeTab === 'empresas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('empresas')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Empresas
                        <span className="badge">{empresas.length}</span>
                    </button>
                </nav>

                <div className="admin-sidebar-footer">
                    <button className="btn-logout" onClick={handleLogout}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {error && (
                    <div className="alert alert-error">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Cargando datos...</p>
                    </div>
                ) : (
                    <>
                        {activeTab === 'dashboard' && (
                            <Dashboard asegurados={asegurados} empresas={empresas} />
                        )}
                        {activeTab === 'asegurados' && (
                            <AseguradosManager
                                asegurados={asegurados}
                                empresas={empresas}
                                api={api}
                                onUpdate={loadData}
                            />
                        )}
                        {activeTab === 'empresas' && (
                            <EmpresasManager
                                empresas={empresas}
                                api={api}
                                onUpdate={loadData}
                            />
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

// Dashboard Component
function Dashboard({ asegurados, empresas }: { asegurados: Asegurado[]; empresas: Empresa[] }) {
    const totalPolizas = asegurados.reduce((sum, a) => sum + (a.polizas?.length || 0), 0);

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Vista general del sistema</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card stat-primary">
                    <div className="stat-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>{asegurados.length}</h3>
                        <p>Asegurados</p>
                    </div>
                </div>

                <div className="stat-card stat-success">
                    <div className="stat-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>{empresas.length}</h3>
                        <p>Empresas</p>
                    </div>
                </div>

                <div className="stat-card stat-warning">
                    <div className="stat-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>{totalPolizas}</h3>
                        <p>Pólizas Totales</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-info">
                <div className="info-card">
                    <h3>Bienvenido al Panel de Administración</h3>
                    <p>Desde aquí puedes gestionar todos los asegurados y empresas del sistema.</p>
                    <ul>
                        <li>✅ Agregar nuevos asegurados con sus pólizas</li>
                        <li>✅ Editar información existente</li>
                        <li>✅ Eliminar registros</li>
                        <li>✅ Gestionar empresas contratantes</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
