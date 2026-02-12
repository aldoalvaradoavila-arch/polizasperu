import { useState, useEffect } from 'react';
import AdminAPI, { Asegurado, Empresa } from '../services/adminApi';

interface EmpresaAseguradosModalProps {
    empresa: Empresa;
    api: AdminAPI;
    onClose: () => void;
    onUpdate: () => void;
}

export default function EmpresaAseguradosModal({ empresa, api, onClose, onUpdate }: EmpresaAseguradosModalProps) {
    const [asegurados, setAsegurados] = useState<Asegurado[]>([]);
    const [todosAsegurados, setTodosAsegurados] = useState<Asegurado[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [empresaData, todosData] = await Promise.all([
                api.getAseguradosByEmpresa(empresa.ruc),
                api.getAsegurados(),
            ]);
            setAsegurados(empresaData.asegurados);
            setTodosAsegurados(todosData.asegurados);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar datos');
        } finally {
            setLoading(false);
        }
    };

    const handleDesasociar = async (dni: string) => {
        if (!confirm('¿Estás seguro de eliminar todas las pólizas de este asegurado en esta empresa?')) {
            return;
        }

        try {
            await api.desasociarAseguradoDeEmpresa(empresa.ruc, dni);
            setSuccess('Asegurado desasociado exitosamente');
            setTimeout(() => setSuccess(''), 3000);
            loadData();
            onUpdate();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al desasociar');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content modal-content-large" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <h2>Asegurados de {empresa.razon_social}</h2>
                        <p className="text-muted">RUC: {empresa.ruc}</p>
                    </div>
                    <button className="btn-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="modal-body">
                    {error && (
                        <div className="alert alert-error">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {success}
                        </div>
                    )}

                    <div className="section-header">
                        <h3>Lista de Asegurados ({asegurados.length})</h3>
                        <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Asociar Asegurado
                        </button>
                    </div>

                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Cargando...</p>
                        </div>
                    ) : asegurados.length === 0 ? (
                        <div className="empty-state">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <p>No hay asegurados asociados a esta empresa</p>
                            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                                Asociar el primero
                            </button>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>DNI</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Pólizas</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {asegurados.map((asegurado) => (
                                        <tr key={asegurado.id}>
                                            <td className="font-mono">{asegurado.dni}</td>
                                            <td>{asegurado.nombres}</td>
                                            <td>{asegurado.apellido_paterno} {asegurado.apellido_materno}</td>
                                            <td>
                                                <span className="badge badge-info">
                                                    {asegurado.polizas?.length || 0} póliza(s)
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn-icon btn-icon-delete"
                                                    onClick={() => handleDesasociar(asegurado.dni)}
                                                    title="Desasociar"
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>

            {showAddModal && (
                <AsociarAseguradoModal
                    empresa={empresa}
                    aseguradosDisponibles={todosAsegurados.filter(
                        a => !asegurados.find(ea => ea.dni === a.dni)
                    )}
                    api={api}
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => {
                        setShowAddModal(false);
                        setSuccess('Asegurado asociado exitosamente');
                        setTimeout(() => setSuccess(''), 3000);
                        loadData();
                        onUpdate();
                    }}
                />
            )}
        </div>
    );
}

// Modal para asociar asegurado
interface AsociarAseguradoModalProps {
    empresa: Empresa;
    aseguradosDisponibles: Asegurado[];
    api: AdminAPI;
    onClose: () => void;
    onSuccess: () => void;
}

function AsociarAseguradoModal({ empresa, aseguradosDisponibles, api, onClose, onSuccess }: AsociarAseguradoModalProps) {
    const [formData, setFormData] = useState({
        dni: '',
        tipo_seguro: 'SCTR_SALUD',
        numero_contrato_poliza: '',
        fecha_inicio: new Date().toISOString().split('T')[0],
        fecha_fin: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.asociarAseguradoAEmpresa(empresa.ruc, formData);
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al asociar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Asociar Asegurado a {empresa.razon_social}</h2>
                    <button className="btn-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        {error && (
                            <div className="alert alert-error">
                                {error}
                            </div>
                        )}

                        <div className="form-section">
                            <h3>Datos de la Póliza</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Asegurado *</label>
                                    <select
                                        value={formData.dni}
                                        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                                        required
                                    >
                                        <option value="">Seleccionar asegurado...</option>
                                        {aseguradosDisponibles.map((asegurado) => (
                                            <option key={asegurado.dni} value={asegurado.dni}>
                                                {asegurado.dni} - {asegurado.nombres} {asegurado.apellido_paterno}
                                            </option>
                                        ))}
                                    </select>
                                    {aseguradosDisponibles.length === 0 && (
                                        <small style={{ color: '#e74c3c' }}>
                                            Todos los asegurados ya están asociados a esta empresa
                                        </small>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Tipo de Seguro *</label>
                                    <select
                                        value={formData.tipo_seguro}
                                        onChange={(e) => setFormData({ ...formData, tipo_seguro: e.target.value })}
                                        required
                                    >
                                        <option value="SCTR_SALUD">SCTR Salud</option>
                                        <option value="SCTR_PENSION">SCTR Pensión</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Número de Póliza *</label>
                                    <input
                                        type="text"
                                        value={formData.numero_contrato_poliza}
                                        onChange={(e) => setFormData({ ...formData, numero_contrato_poliza: e.target.value })}
                                        placeholder="808407"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Fecha Inicio *</label>
                                    <input
                                        type="date"
                                        value={formData.fecha_inicio}
                                        onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Fecha Fin *</label>
                                    <input
                                        type="date"
                                        value={formData.fecha_fin}
                                        onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading || aseguradosDisponibles.length === 0}
                        >
                            {loading ? 'Asociando...' : 'Asociar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
