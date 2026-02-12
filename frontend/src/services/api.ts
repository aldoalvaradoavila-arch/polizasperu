import axios from 'axios';
import type { BusquedaResponse } from '../types';

// En desarrollo usa el proxy de Vite, en producción usa la URL del backend
const API_BASE = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/v1`
    : '/api/v1';

export async function buscarAsegurado(dni: string): Promise<BusquedaResponse> {
    const response = await axios.get<BusquedaResponse>(
        `${API_BASE}/asegurados/buscar`,
        { params: { dni } }
    );
    return response.data;
}
