import { useState, useEffect } from 'react';
import AdminAPI, { Asegurado, Poliza } from '../services/adminApi';

interface AseguradoPolizasModalProps {
    asegurado: Asegurado;
    api: AdminAPI;
    onClose: () => void;
    onUpdate: () => void;
}

export default function AseguradoPolizasModal({ asegurado, api, onClose, onUpdate }: AseguradoPolizasModalProps) {
    const [polizas, setPolizas] = useState<Poliza[]>(asegurado.polizas || []);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingPoliza, setEditingPoliza] = useState<Poliza | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAgregar = () => {
        setEditingPoliza(null);
        setShowAddModal(true);
    };

    const handleEditar = (poliza: Poliza) => {
        setEditingPoliza(poliza);
        setShowAddModal(true);
    };

    const handleEliminar = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar esta póliza?')) {
            return;
        }

        try {
            await api.eliminarPoliza(id);
            setSuccess('Póliza eliminada exitosamente');
            setTimeout(() => setSuccess(''), 3000);
            // Recargar pólizas
            const aseguradosData = await api.getAsegurados();
            const aseguradoActualizado = aseguradosData.asegurados.find(a => a.dni === asegurado.dni);
            if (aseguradoActualizado) {
                setPolizas(aseguradoActualizado.polizas || []);
            }
            onUpdate();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content modal-content-large" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <h2>Pólizas de {asegurado.nombres} {asegurado.apellido_paterno}</h2>
                        <p className="text-muted">DNI: {asegurado.dni}</p>
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
                        <h3>Lista de Pólizas ({polizas.length})</h3>
                        <button className="btn btn-primary btn-sm" onClick={handleAgregar}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Agregar Póliza
                        </button>
                    </div>

                    {polizas.length === 0 ? (
                        <div className="empty-state">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            <p>No hay pólizas registradas para este asegurado</p>
                            <button className="btn btn-primary" onClick={handleAgregar}>
                                Agregar la primera
                            </button>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Número de Póliza</th>
                                        <th>Empresa</th>
                                        <th>Fecha Inicio</th>
                                        <th>Fecha Fin</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {polizas.map((poliza) => (
                                        <tr key={poliza.id}>
                                            <td>
                                                <span className={`badge ${poliza.tipo_seguro === 'SCTR_SALUD' ? 'badge-info' : 'badge-warning'}`}>
                                                    {poliza.tipo_seguro === 'SCTR_SALUD' ? 'SCTR Salud' : 'SCTR Pensión'}
                                                </span>
                                            </td>
                                            <td className="font-mono">{poliza.numero_contrato_poliza}</td>
                                            <td>{poliza.empresa?.razon_social || 'N/A'}</td>
                                            <td>{new Date(poliza.fecha_inicio).toLocaleDateString()}</td>
                                            <td>{new Date(poliza.fecha_fin).toLocaleDateString()}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="btn-icon btn-icon-edit"
                                                        onClick={() => handleEditar(poliza)}
                                                        title="Editar"
                                                    >
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="btn-icon btn-icon-delete"
                                                        onClick={() => handleEliminar(poliza.id)}
                                                        title="Eliminar"
                                                    >
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        </svg>
                                                    </button>
                                                </div>
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
                <PolizaModal
                    asegurado={asegurado}
                    poliza={editingPoliza}
                    api={api}
                    onClose={() => {
                        setShowAddModal(false);
                        setEditingPoliza(null);
                    }}
                    onSuccess={async () => {
                        setShowAddModal(false);
                        setEditingPoliza(null);
                        setSuccess(editingPoliza ? 'Póliza actualizada exitosamente' : 'Póliza agregada exitosamente');
                        setTimeout(() => setSuccess(''), 3000);
                        // Recargar pólizas
                        const aseguradosData = await api.getAsegurados();
                        const aseguradoActualizado = aseguradosData.asegurados.find(a => a.dni === asegurado.dni);
                        if (aseguradoActualizado) {
                            setPolizas(aseguradoActualizado.polizas || []);
                        }
                        onUpdate();
                    }}
                />
            )}
        </div>
    );
}

// Modal para agregar/editar póliza
interface PolizaModalProps {
    asegurado: Asegurado;
    poliza: Poliza | null;
    api: AdminAPI;
    onClose: () => void;
    onSuccess: () => void;
}

function PolizaModal({ asegurado, poliza, api, onClose, onSuccess }: PolizaModalProps) {
    const [empresas, setEmpresas] = useState<{ ruc: string; razon_social: string }[]>([]);
    const [formData, setFormData] = useState({
        tipo_seguro: poliza?.tipo_seguro || 'SCTR_SALUD',
        numero_contrato_poliza: poliza?.numero_contrato_poliza || '',
        fecha_inicio: poliza?.fecha_inicio ? new Date(poliza.fecha_inicio).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        fecha_fin: poliza?.fecha_fin ? new Date(poliza.fecha_fin).toISOString().split('T')[0] : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        ruc: poliza?.empresa?.ruc || '',
    });
    const [loading, setLoading] = useState(false);
    const [loadingEmpresas, setLoadingEmpresas] = useState(true);
    const [error, setError] = useState('');

    // Cargar lista de empresas al abrir el modal
    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const data = await api.getEmpresas();
                setEmpresas(data.empresas);
                // Si no hay empresa seleccionada y hay empresas disponibles, preseleccionar la primera
                if (!formData.ruc && data.empresas.length > 0) {
                    setFormData(prev => ({ ...prev, ruc: data.empresas[0].ruc }));
                }
            } catch (err) {
                setError('Error al cargar la lista de empresas.');
            } finally {
                setLoadingEmpresas(false);
            }
        };
        fetchEmpresas();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (poliza) {
                // Editar póliza existente
                await api.actualizarPoliza(poliza.id, formData);
            } else {
                // Agregar nueva póliza
                await api.agregarPoliza(asegurado.dni, formData);
            }
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al guardar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{poliza ? 'Editar Póliza' : 'Agregar Póliza'}</h2>
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
                                    <label>Empresa Contratante *</label>
                                    {loadingEmpresas ? (
                                        <select disabled>
                                            <option>Cargando empresas...</option>
                                        </select>
                                    ) : (
                                        <select
                                            value={formData.ruc}
                                            onChange={(e) => setFormData({ ...formData, ruc: e.target.value })}
                                            required
                                        >
                                            <option value="">Seleccionar empresa...</option>
                                            {empresas.map((empresa) => (
                                                <option key={empresa.ruc} value={empresa.ruc}>
                                                    {empresa.razon_social} ({empresa.ruc})
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                    {!loadingEmpresas && empresas.length === 0 && (
                                        <small style={{ color: '#e74c3c' }}>
                                            No hay empresas registradas. Crea una primero.
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
                        <button type="submit" className="btn btn-primary" disabled={loading || loadingEmpresas || empresas.length === 0}>
                            {loading ? 'Guardando...' : poliza ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
