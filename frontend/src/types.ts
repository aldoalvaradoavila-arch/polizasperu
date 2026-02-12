export interface AseguradoData {
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    dni: string;
}

export interface EmpresaData {
    razon_social: string;
    ruc: string;
    actividad: string;
    sede: string;
}

export interface PolizaData {
    tipo: 'SCTR_SALUD' | 'SCTR_PENSION';
    numero: string;
    fecha_inicio: string;
    fecha_fin: string;
    estado: 'ACTIVO' | 'VENCIDO';
}

export interface BusquedaResultado {
    encontrado: true;
    asegurado: AseguradoData;
    empresa: EmpresaData;
    polizas: PolizaData[];
}

export interface BusquedaNoEncontrado {
    encontrado: false;
    mensaje: string;
}

export type BusquedaResponse = BusquedaResultado | BusquedaNoEncontrado;
