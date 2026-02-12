import { useState } from 'react';
import AdminAPI, { Empresa, CreateEmpresaData } from '../services/adminApi';
import EmpresaAseguradosModal from './EmpresaAseguradosModal';

interface EmpresasManagerProps {
    empresas: Empresa[];
    api: AdminAPI;
    onUpdate: () => void;
}

export default function EmpresasManager({ empresas, api, onUpdate }: EmpresasManagerProps) {
    const [showModal, setShowModal] = useState(false);
    const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);
    const [showAseguradosModal, setShowAseguradosModal] = useState(false);
    const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCreate = () => {
        setEditingEmpresa(null);
        setShowModal(true);
    };

    const handleEdit = (empresa: Empresa) => {
        setEditingEmpresa(empresa);
        setShowModal(true);
    };

    const handleDelete = async (ruc: string) => {
        if (!confirm('¿Estás seguro de eliminar esta empresa? Solo se puede eliminar si no tiene pólizas asociadas.')) {
            return;
        }

        setLoading(true);
        setError('');
        try {
            await api.deleteEmpresa(ruc);
            setSuccess('Empresa eliminada exitosamente');
            setTimeout(() => setSuccess(''), 3000);
            onUpdate();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar');
        } finally {
            setLoading(false);
        }
    };

    const handleViewAsegurados = (empresa: Empresa) => {
        setSelectedEmpresa(empresa);
        setShowAseguradosModal(true);
    };

    return (
        <div className="manager-container">
            <div className="manager-header">
                <div>
                    <h1>Gestión de Empresas</h1>
                    <p>Administra las empresas contratantes</p>
                </div>
                <button className="btn btn-primary" onClick={handleCreate}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Nueva Empresa
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
                            <th>RUC</th>
                            <th>Razón Social</th>
                            <th>Actividad Económica</th>
                            <th>Sede</th>
                            <th>Pólizas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empresas.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="empty-state">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                    <p>No hay empresas registradas</p>
                                    <button className="btn btn-primary" onClick={handleCreate}>
                                        Agregar la primera
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            empresas.map((empresa) => (
                                <tr key={empresa.id}>
                                    <td className="font-mono">{empresa.ruc}</td>
                                    <td>{empresa.razon_social}</td>
                                    <td>{empresa.actividad_economica}</td>
                                    <td>{empresa.sede}</td>
                                    <td>
                                        <span className="badge badge-info">
                                            {empresa._count?.polizas || 0} póliza(s)
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn-icon btn-icon-view"
                                                onClick={() => handleViewAsegurados(empresa)}
                                                title="Ver Asegurados"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="9" cy="7" r="4"></circle>
                                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                                </svg>
                                            </button>
                                            <button
                                                className="btn-icon btn-icon-edit"
                                                onClick={() => handleEdit(empresa)}
                                                title="Editar"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </button>
                                            <button
                                                className="btn-icon btn-icon-delete"
                                                onClick={() => handleDelete(empresa.ruc)}
                                                title="Eliminar"
                                                disabled={loading || (empresa._count?.polizas || 0) > 0}
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
                <EmpresaModal
                    empresa={editingEmpresa}
                    api={api}
                    onClose={() => {
                        setShowModal(false);
                        setEditingEmpresa(null);
                    }}
                    onSuccess={() => {
                        setShowModal(false);
                        setEditingEmpresa(null);
                        setSuccess(editingEmpresa ? 'Empresa actualizada exitosamente' : 'Empresa creada exitosamente');
                        setTimeout(() => setSuccess(''), 3000);
                        onUpdate();
                    }}
                />
            )}

            {showAseguradosModal && selectedEmpresa && (
                <EmpresaAseguradosModal
                    empresa={selectedEmpresa}
                    api={api}
                    onClose={() => {
                        setShowAseguradosModal(false);
                        setSelectedEmpresa(null);
                    }}
                    onUpdate={onUpdate}
                />
            )}
        </div>
    );
}

// Modal Component
interface EmpresaModalProps {
    empresa: Empresa | null;
    api: AdminAPI;
    onClose: () => void;
    onSuccess: () => void;
}

function EmpresaModal({ empresa, api, onClose, onSuccess }: EmpresaModalProps) {
    const [formData, setFormData] = useState<CreateEmpresaData>({
        ruc: empresa?.ruc || '',
        razon_social: empresa?.razon_social || '',
        actividad_economica: empresa?.actividad_economica || '',
        sede: empresa?.sede || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (empresa) {
                await api.updateEmpresa(empresa.ruc, formData);
            } else {
                await api.createEmpresa(formData);
            }
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al guardar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{empresa ? 'Editar Empresa' : 'Nueva Empresa'}</h2>
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
                            <h3>Datos de la Empresa</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>RUC *</label>
                                    <input
                                        type="text"
                                        value={formData.ruc}
                                        onChange={(e) => setFormData({ ...formData, ruc: e.target.value })}
                                        placeholder="20123456789"
                                        maxLength={11}
                                        required
                                        disabled={!!empresa}
                                    />
                                    <small>11 dígitos numéricos</small>
                                </div>

                                <div className="form-group">
                                    <label>Razón Social *</label>
                                    <input
                                        type="text"
                                        value={formData.razon_social}
                                        onChange={(e) => setFormData({ ...formData, razon_social: e.target.value })}
                                        placeholder="CONSTRUCTORA LIMA SAC"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Actividad Económica *</label>
                                    <input
                                        type="text"
                                        value={formData.actividad_economica}
                                        onChange={(e) => setFormData({ ...formData, actividad_economica: e.target.value })}
                                        placeholder="CONSTRUCCIÓN"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Sede *</label>
                                    <input
                                        type="text"
                                        value={formData.sede}
                                        onChange={(e) => setFormData({ ...formData, sede: e.target.value })}
                                        placeholder="LIMA"
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
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Guardando...' : empresa ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
