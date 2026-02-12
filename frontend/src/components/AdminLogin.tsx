import { useState } from 'react';
import './AdminLogin.css';

interface AdminLoginProps {
    onLogin: (apiKey: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!apiKey.trim()) {
            setError('Por favor ingresa la clave de administración');
            return;
        }

        // Guardar en localStorage y llamar al callback
        localStorage.setItem('admin_api_key', apiKey);
        onLogin(apiKey);
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <div className="admin-login-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h1>Panel de Administración</h1>
                    <p>PolizasPeru SCTR</p>
                </div>

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <div className="form-group">
                        <label htmlFor="apiKey">Clave de Administración</label>
                        <input
                            type="password"
                            id="apiKey"
                            value={apiKey}
                            onChange={(e) => {
                                setApiKey(e.target.value);
                                setError('');
                            }}
                            placeholder="Ingresa tu API Key"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            {error}
                        </div>
                    )}

                    <button type="submit" className="btn-login">
                        Ingresar al Panel
                    </button>
                </form>

                <div className="admin-login-footer">
                    <p>🔒 Acceso restringido solo para administradores</p>
                </div>
            </div>
        </div>
    );
}
