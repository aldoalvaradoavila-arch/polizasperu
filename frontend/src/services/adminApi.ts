const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Asegurado {
    id: number;
    dni: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    polizas?: Poliza[];
}

export interface Empresa {
    id: number;
    ruc: string;
    razon_social: string;
    actividad_economica: string;
    sede: string;
    _count?: {
        polizas: number;
    };
}

export interface Poliza {
    id: number;
    tipo_seguro: string;
    numero_contrato_poliza: string;
    fecha_inicio: string;
    fecha_fin: string;
    id_empresa: number;
    id_asegurado: number;
    empresa?: Empresa;
}

export interface CreateAseguradoData {
    dni: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    polizas?: {
        tipo_seguro: string;
        numero_contrato_poliza: string;
        fecha_inicio: string;
        fecha_fin: string;
    }[];
}

export interface CreateEmpresaData {
    ruc: string;
    razon_social: string;
    actividad_economica: string;
    sede: string;
}

class AdminAPI {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    private getHeaders(): HeadersInit {
        return {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
        };
    }

    // ========== ASEGURADOS ==========

    async getAsegurados(): Promise<{ total: number; asegurados: Asegurado[] }> {
        const response = await fetch(`${API_URL}/api/v1/admin/asegurados`, {
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al obtener asegurados');
        }

        return response.json();
    }

    async createAsegurado(data: CreateAseguradoData): Promise<{ mensaje: string; asegurado: Asegurado }> {
        const response = await fetch(`${API_URL}/api/v1/admin/asegurados`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al crear asegurado');
        }

        return response.json();
    }

    async updateAsegurado(dni: string, data: Partial<CreateAseguradoData>): Promise<{ mensaje: string; asegurado: Asegurado }> {
        const response = await fetch(`${API_URL}/api/v1/admin/asegurados/${dni}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al actualizar asegurado');
        }

        return response.json();
    }

    async deleteAsegurado(dni: string): Promise<{ mensaje: string; dni: string }> {
        const response = await fetch(`${API_URL}/api/v1/admin/asegurados/${dni}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al eliminar asegurado');
        }

        return response.json();
    }

    // ========== EMPRESAS ==========

    async getEmpresas(): Promise<{ total: number; empresas: Empresa[] }> {
        const response = await fetch(`${API_URL}/api/v1/admin/empresas`, {
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al obtener empresas');
        }

        return response.json();
    }

    async createEmpresa(data: CreateEmpresaData): Promise<{ mensaje: string; empresa: Empresa }> {
        const response = await fetch(`${API_URL}/api/v1/admin/empresas`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al crear empresa');
        }

        return response.json();
    }

    async updateEmpresa(ruc: string, data: Partial<CreateEmpresaData>): Promise<{ mensaje: string; empresa: Empresa }> {
        const response = await fetch(`${API_URL}/api/v1/admin/empresas/${ruc}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al actualizar empresa');
        }

        return response.json();
    }

    async deleteEmpresa(ruc: string): Promise<{ mensaje: string; ruc: string }> {
        const response = await fetch(`${API_URL}/api/v1/admin/empresas/${ruc}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al eliminar empresa');
        }

        return response.json();
    }

    // ========== ASEGURADOS POR EMPRESA ==========

    async getAseguradosByEmpresa(ruc: string): Promise<{ empresa: { ruc: string; razon_social: string }; total: number; asegurados: Asegurado[] }> {
        const response = await fetch(`${API_URL}/api/v1/admin/empresas/${ruc}/asegurados`, {
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al obtener asegurados de la empresa');
        }

        return response.json();
    }

    async asociarAseguradoAEmpresa(ruc: string, data: {
        dni: string;
        tipo_seguro: string;
        numero_contrato_poliza: string;
        fecha_inicio: string;
        fecha_fin: string;
    }): Promise<{ mensaje: string; poliza: Poliza }> {
        const response = await fetch(`${API_URL}/api/v1/admin/empresas/${ruc}/asegurados`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al asociar asegurado');
        }

        return response.json();
    }

    async desasociarAseguradoDeEmpresa(ruc: string, dni: string): Promise<{ mensaje: string; polizas_eliminadas: number }> {
        const response = await fetch(`${API_URL}/api/v1/admin/empresas/${ruc}/asegurados/${dni}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al desasociar asegurado');
        }

        return response.json();
    }

    // ========== GESTIÓN DE PÓLIZAS ==========

    async agregarPoliza(dni: string, data: {
        tipo_seguro: string;
        numero_contrato_poliza: string;
        fecha_inicio: string;
        fecha_fin: string;
    }): Promise<{ mensaje: string; poliza: Poliza }> {
        const response = await fetch(`${API_URL}/api/v1/admin/asegurados/${dni}/polizas`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al agregar póliza');
        }

        return response.json();
    }

    async actualizarPoliza(id: number, data: {
        tipo_seguro?: string;
        numero_contrato_poliza?: string;
        fecha_inicio?: string;
        fecha_fin?: string;
    }): Promise<{ mensaje: string; poliza: Poliza }> {
        const response = await fetch(`${API_URL}/api/v1/admin/polizas/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al actualizar póliza');
        }

        return response.json();
    }

    async eliminarPoliza(id: number): Promise<{ mensaje: string; id: number }> {
        const response = await fetch(`${API_URL}/api/v1/admin/polizas/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al eliminar póliza');
        }

        return response.json();
    }
}

export default AdminAPI;
