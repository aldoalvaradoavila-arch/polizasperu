import { useState } from 'react';
import AdminAPI, { Asegurado, CreateAseguradoData } from '../services/adminApi';
import AseguradoPolizasModal from './AseguradoPolizasModal';
import './AseguradosManager.css';

interface AseguradosManagerProps {
    asegurados: Asegurado[];
    api: AdminAPI;
    onUpdate: () => void;
}

export default function AseguradosManager({ asegurados, api, onUpdate }: AseguradosManagerProps) {
    const [showModal, setShowModal] = useState(false);
    const [editingAsegurado, setEditingAsegurado] = useState<Asegurado | null>(null);
    const [showPolizasModal, setShowPolizasModal] = useState(false);
    const [selectedAsegurado, setSelectedAsegurado] = useState<Asegurado | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCreate = () => {
        setEditingAsegurado(null);
        setShowModal(true);
    };

    const handleEdit = (asegurado: Asegurado) => {
        setEditingAsegurado(asegurado);
        setShowModal(true);
    };

    const handleDelete = async (dni: string) => {
        if (!confirm('¿Estás seguro de eliminar este asegurado? Esta acción no se puede deshacer.')) {
            return;
        }

        setLoading(true);
        setError('');
        try {
            await api.deleteAsegurado(dni);
            setSuccess('Asegurado eliminado exitosamente');
            setTimeout(() => setSuccess(''), 3000);
            onUpdate();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar');
        } finally {
            setLoading(false);
        }
    };

    const handleViewPolizas = (asegurado: Asegurado) => {
        setSelectedAsegurado(asegurado);
        setShowPolizasModal(true);
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <div>
                    <h1>Gestión de Asegurados</h1>
                    <p>Administra los asegurados y sus pólizas</p>
                </div>
                <button className="btn btn-primary" onClick={handleCreate}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Nuevo Asegurado
                </button>
            </div>

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
                        {asegurados.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="empty-state">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                    <p>No hay asegurados registrados</p>
                                    <button className="btn btn-primary" onClick={handleCreate}>
                                        Agregar el primero
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            asegurados.map((asegurado) => (
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
                                        <div className="action-buttons">
                                            <button
                                                className="btn-icon btn-icon-view"
                                                onClick={() => handleViewPolizas(asegurado)}
                                                title="Ver Pólizas"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                                    <polyline points="10 9 9 9 8 9"></polyline>
                                                </svg>
                                            </button>
                                            <button
                                                className="btn-icon btn-icon-edit"
                                                onClick={() => handleEdit(asegurado)}
                                                title="Editar"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </button>
                                            <button
                                                className="btn-icon btn-icon-delete"
                                                onClick={() => handleDelete(asegurado.dni)}
                                                title="Eliminar"
                                                disabled={loading}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <AseguradoModal
                    asegurado={editingAsegurado}
                    api={api}
                    onClose={() => {
                        setShowModal(false);
                        setEditingAsegurado(null);
                    }}
                    onSuccess={() => {
                        setShowModal(false);
                        setEditingAsegurado(null);
                        setSuccess(editingAsegurado ? 'Asegurado actualizado exitosamente' : 'Asegurado creado exitosamente');
                        setTimeout(() => setSuccess(''), 3000);
                        onUpdate();
                    }}
                />
            )}

            {showPolizasModal && selectedAsegurado && (
                <AseguradoPolizasModal
                    asegurado={selectedAsegurado}
                    api={api}
                    onClose={() => {
                        setShowPolizasModal(false);
                        setSelectedAsegurado(null);
                    }}
                    onUpdate={onUpdate}
                />
            )}
        </div>
    );
}

// Modal Component
interface AseguradoModalProps {
    asegurado: Asegurado | null;
    api: AdminAPI;
    onClose: () => void;
    onSuccess: () => void;
}

function AseguradoModal({ asegurado, api, onClose, onSuccess }: AseguradoModalProps) {
    const [formData, setFormData] = useState<CreateAseguradoData>({
        dni: asegurado?.dni || '',
        nombres: asegurado?.nombres || '',
        apellido_paterno: asegurado?.apellido_paterno || '',
        apellido_materno: asegurado?.apellido_materno || '',
        polizas: asegurado?.polizas?.map(p => ({
            tipo_seguro: p.tipo_seguro,
            numero_contrato_poliza: p.numero_contrato_poliza,
            fecha_inicio: p.fecha_inicio.split('T')[0],
            fecha_fin: p.fecha_fin.split('T')[0],
        })) || [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (asegurado) {
                // Editar (solo datos personales)
                await api.updateAsegurado(asegurado.dni, {
                    nombres: formData.nombres,
                    apellido_paterno: formData.apellido_paterno,
                    apellido_materno: formData.apellido_materno,
                });
            } else {
                // Crear nuevo
                await api.createAsegurado(formData);
            }
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al guardar');
        } finally {
            setLoading(false);
        }
    };

    const addPoliza = () => {
        setFormData({
            ...formData,
            polizas: [
                ...(formData.polizas || []),
                {
                    tipo_seguro: 'SCTR_SALUD',
                    numero_contrato_poliza: '',
                    fecha_inicio: new Date().toISOString().split('T')[0],
                    fecha_fin: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                },
            ],
        });
    };

    const removePoliza = (index: number) => {
        setFormData({
            ...formData,
            polizas: formData.polizas?.filter((_, i) => i !== index),
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{asegurado ? 'Editar Asegurado' : 'Nuevo Asegurado'}</h2>
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
                            <h3>Datos Personales</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>DNI *</label>
                                    <input
                                        type="text"
                                        value={formData.dni}
                                        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                                        placeholder="12345678"
                                        maxLength={8}
                                        required
                                        disabled={!!asegurado}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Nombres *</label>
                                    <input
                                        type="text"
                                        value={formData.nombres}
                                        onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                                        placeholder="JUAN CARLOS"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Apellido Paterno *</label>
                                    <input
                                        type="text"
                                        value={formData.apellido_paterno}
                                        onChange={(e) => setFormData({ ...formData, apellido_paterno: e.target.value })}
                                        placeholder="PÉREZ"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Apellido Materno *</label>
                                    <input
                                        type="text"
                                        value={formData.apellido_materno}
                                        onChange={(e) => setFormData({ ...formData, apellido_materno: e.target.value })}
                                        placeholder="GARCÍA"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {!asegurado && (
                            <div className="form-section">
                                <div className="section-header">
                                    <h3>Pólizas</h3>
                                    <button type="button" className="btn btn-sm btn-secondary" onClick={addPoliza}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                        Agregar Póliza
                                    </button>
                                </div>

                                {formData.polizas && formData.polizas.length > 0 ? (
                                    formData.polizas.map((poliza, index) => (
                                        <div key={index} className="poliza-item">
                                            <div className="poliza-header">
                                                <span>Póliza #{index + 1}</span>
                                                <button
                                                    type="button"
                                                    className="btn-icon btn-icon-delete"
                                                    onClick={() => removePoliza(index)}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Tipo de Seguro</label>
                                                    <select
                                                        value={poliza.tipo_seguro}
                                                        onChange={(e) => {
                                                            const newPolizas = [...(formData.polizas || [])];
                                                            newPolizas[index].tipo_seguro = e.target.value;
                                                            setFormData({ ...formData, polizas: newPolizas });
                                                        }}
                                                    >
                                                        <option value="SCTR_SALUD">SCTR Salud</option>
                                                        <option value="SCTR_PENSION">SCTR Pensión</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label>Número de Póliza</label>
                                                    <input
                                                        type="text"
                                                        value={poliza.numero_contrato_poliza}
                                                        onChange={(e) => {
                                                            const newPolizas = [...(formData.polizas || [])];
                                                            newPolizas[index].numero_contrato_poliza = e.target.value;
                                                            setFormData({ ...formData, polizas: newPolizas });
                                                        }}
                                                        placeholder="808407"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label>Fecha Inicio</label>
                                                    <input
                                                        type="date"
                                                        value={poliza.fecha_inicio}
                                                        onChange={(e) => {
                                                            const newPolizas = [...(formData.polizas || [])];
                                                            newPolizas[index].fecha_inicio = e.target.value;
                                                            setFormData({ ...formData, polizas: newPolizas });
                                                        }}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label>Fecha Fin</label>
                                                    <input
                                                        type="date"
                                                        value={poliza.fecha_fin}
                                                        onChange={(e) => {
                                                            const newPolizas = [...(formData.polizas || [])];
                                                            newPolizas[index].fecha_fin = e.target.value;
                                                            setFormData({ ...formData, polizas: newPolizas });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No hay pólizas agregadas. Click en "Agregar Póliza" para comenzar.</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Guardando...' : asegurado ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
