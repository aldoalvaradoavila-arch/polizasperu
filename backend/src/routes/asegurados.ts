import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /api/v1/asegurados/buscar?dni={dni}
 * 
 * Busca un asegurado por DNI y retorna sus datos, empresa y pólizas.
 * El estado de cada póliza se calcula dinámicamente vs. fecha del servidor.
 */
router.get('/buscar', async (req: Request, res: Response): Promise<void> => {
    try {
        const { dni } = req.query;

        // Validación: DNI requerido
        if (!dni || typeof dni !== 'string') {
            res.status(400).json({
                error: 'DNI inválido. Debe contener exactamente 8 dígitos numéricos.',
            });
            return;
        }

        // Validación: exactamente 8 dígitos numéricos
        const dniStr = dni.trim();
        if (!/^\d{8}$/.test(dniStr)) {
            res.status(400).json({
                error: 'DNI inválido. Debe contener exactamente 8 dígitos numéricos.',
            });
            return;
        }

        // Buscar asegurado con sus pólizas y empresa
        const asegurado = await prisma.asegurado.findUnique({
            where: { dni: dniStr },
            include: {
                polizas: {
                    include: {
                        empresa: true,
                    },
                },
            },
        });

        // No encontrado
        if (!asegurado || asegurado.polizas.length === 0) {
            res.status(200).json({
                encontrado: false,
                mensaje: 'No se encontraron seguros registrados para el DNI ingresado.',
            });
            return;
        }

        // Calcular estado dinámico de cada póliza
        const ahora = new Date();
        const empresa = asegurado.polizas[0].empresa;

        const polizas = asegurado.polizas.map((p) => ({
            tipo: p.tipo_seguro,
            numero: p.numero_contrato_poliza,
            fecha_inicio: p.fecha_inicio.toISOString().split('T')[0],
            fecha_fin: p.fecha_fin.toISOString().split('T')[0],
            estado: ahora <= p.fecha_fin ? 'ACTIVO' : 'VENCIDO',
        }));

        // Respuesta exitosa — formato exacto del SRS
        res.status(200).json({
            encontrado: true,
            asegurado: {
                nombres: asegurado.nombres,
                apellido_paterno: asegurado.apellido_paterno,
                apellido_materno: asegurado.apellido_materno,
                dni: asegurado.dni,
            },
            empresa: {
                razon_social: empresa.razon_social,
                ruc: empresa.ruc,
                actividad: empresa.actividad_economica,
                sede: empresa.sede,
            },
            polizas,
        });
    } catch (error) {
        console.error('Error en búsqueda:', error);
        res.status(500).json({
            error: 'Error interno del servidor. Intente nuevamente.',
        });
    }
});

export { router as aseguradosRouter };
