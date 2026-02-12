import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Middleware de autenticación simple (usando API Key)
const AUTH_KEY = process.env.ADMIN_API_KEY || 'tu-clave-secreta-aqui';

function requireAuth(req: Request, res: Response, next: Function) {
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== AUTH_KEY) {
        res.status(401).json({ error: 'No autorizado' });
        return;
    }

    next();
}

/**
 * POST /api/v1/admin/asegurados
 * Crea un nuevo asegurado con sus pólizas
 */
router.post('/asegurados', requireAuth, async (req: Request, res: Response): Promise<void> => {
    try {
        const { dni, nombres, apellido_paterno, apellido_materno, polizas } = req.body;

        // Validaciones
        if (!dni || !/^\d{8}$/.test(dni)) {
            res.status(400).json({ error: 'DNI inválido. Debe tener 8 dígitos.' });
            return;
        }

        if (!nombres || !apellido_paterno || !apellido_materno) {
            res.status(400).json({ error: 'Nombres y apellidos son requeridos.' });
            return;
        }

        // Verificar si ya existe
        const existente = await prisma.asegurado.findUnique({ where: { dni } });
        if (existente) {
            res.status(409).json({ error: 'Ya existe un asegurado con ese DNI.' });
            return;
        }

        // Buscar empresa (usar la primera disponible)
        const empresa = await prisma.empresa.findFirst();
        if (!empresa) {
            res.status(500).json({ error: 'No hay empresas en la base de datos.' });
            return;
        }

        // Crear asegurado
        const asegurado = await prisma.asegurado.create({
            data: {
                dni,
                nombres: nombres.toUpperCase(),
                apellido_paterno: apellido_paterno.toUpperCase(),
                apellido_materno: apellido_materno.toUpperCase(),
            },
        });

        // Crear pólizas si se proporcionaron
        if (polizas && Array.isArray(polizas) && polizas.length > 0) {
            await prisma.poliza.createMany({
                data: polizas.map((p: any) => ({
                    tipo_seguro: p.tipo_seguro,
                    numero_contrato_poliza: p.numero_contrato_poliza,
                    fecha_inicio: new Date(p.fecha_inicio),
                    fecha_fin: new Date(p.fecha_fin),
                    id_empresa: empresa.id,
                    id_asegurado: asegurado.id,
                })),
            });
        }

        res.status(201).json({
            mensaje: 'Asegurado creado exitosamente',
            asegurado: {
                id: asegurado.id,
                dni: asegurado.dni,
                nombres: asegurado.nombres,
                apellido_paterno: asegurado.apellido_paterno,
                apellido_materno: asegurado.apellido_materno,
            },
        });
    } catch (error) {
        console.error('Error al crear asegurado:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

/**
 * DELETE /api/v1/admin/asegurados/:dni
 * Elimina un asegurado y sus pólizas
 */
router.delete('/asegurados/:dni', requireAuth, async (req: Request, res: Response): Promise<void> => {
    try {
        const { dni } = req.params;

        // Buscar asegurado
        const asegurado = await prisma.asegurado.findUnique({ where: { dni } });

        if (!asegurado) {
            res.status(404).json({ error: 'Asegurado no encontrado.' });
            return;
        }

        // Eliminar pólizas primero
        await prisma.poliza.deleteMany({ where: { id_asegurado: asegurado.id } });

        // Eliminar asegurado
        await prisma.asegurado.delete({ where: { dni } });

        res.status(200).json({
            mensaje: 'Asegurado eliminado exitosamente',
            dni,
        });
    } catch (error) {
        console.error('Error al eliminar asegurado:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

/**
 * GET /api/v1/admin/asegurados
 * Lista todos los asegurados
 */
router.get('/asegurados', requireAuth, async (req: Request, res: Response): Promise<void> => {
    try {
        const asegurados = await prisma.asegurado.findMany({
            include: {
                polizas: {
                    include: {
                        empresa: true,
                    },
                },
            },
        });

        res.status(200).json({
            total: asegurados.length,
            asegurados,
        });
    } catch (error) {
        console.error('Error al listar asegurados:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

/**
 * PUT /api/v1/admin/asegurados/:dni
 * Actualiza los datos de un asegurado
 */
router.put('/asegurados/:dni', requireAuth, async (req: Request, res: Response): Promise<void> => {
    try {
        const { dni } = req.params;
        const { nombres, apellido_paterno, apellido_materno } = req.body;

        // Buscar asegurado
        const asegurado = await prisma.asegurado.findUnique({ where: { dni } });

        if (!asegurado) {
            res.status(404).json({ error: 'Asegurado no encontrado.' });
            return;
        }

        // Actualizar
        const actualizado = await prisma.asegurado.update({
            where: { dni },
            data: {
                nombres: nombres ? nombres.toUpperCase() : asegurado.nombres,
                apellido_paterno: apellido_paterno ? apellido_paterno.toUpperCase() : asegurado.apellido_paterno,
                apellido_materno: apellido_materno ? apellido_materno.toUpperCase() : asegurado.apellido_materno,
            },
        });

        res.status(200).json({
            mensaje: 'Asegurado actualizado exitosamente',
            asegurado: actualizado,
        });
    } catch (error) {
        console.error('Error al actualizar asegurado:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

/**
 * GET /api/v1/admin/empresas
 * Lista todas las empresas
 */
router.get('/empresas', requireAuth, async (req: Request, res: Response): Promise<void> => {
    try {
        const empresas = await prisma.empresa.findMany({
            include: {
                _count: {
                    select: { polizas: true },
                },
            },
        });

        res.status(200).json({
            total: empresas.length,
            empresas,
        });
    } catch (error) {
        console.error('Error al listar empresas:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

/**
 * POST /api/v1/admin/empresas
 * Crea una nueva empresa
 */
router.post('/empresas', requireAuth, async (req: Request, res: Response): Promise<void> => {
    try {
        const { ruc, razon_social, actividad_economica, sede } = req.body;

        // Validaciones
        if (!ruc || !/^\d{11}$/.test(ruc)) {
            res.status(400).json({ error: 'RUC inválido. Debe tener 11 dígitos.' });
            return;
        }

        if (!razon_social || !actividad_economica || !sede) {
            res.status(400).json({ error: 'Todos los campos son requeridos.' });
            return;
        }

        // Verificar si ya existe
        const existente = await prisma.empresa.findUnique({ where: { ruc } });
        if (existente) {
            res.status(409).json({ error: 'Ya existe una empresa con ese RUC.' });
            return;
        }

        // Crear empresa
        const empresa = await prisma.empresa.create({
            data: {
                ruc,
                razon_social: razon_social.toUpperCase(),
                actividad_economica: actividad_economica.toUpperCase(),
                sede: sede.toUpperCase(),
            },
        });

        res.status(201).json({
            mensaje: 'Empresa creada exitosamente',
            empresa,
        });
    } catch (error) {
        console.error('Error al crear empresa:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

/**
 * PUT /api/v1/admin/empresas/:ruc
 * Actualiza los datos de una empresa
 */
router.put('/empresas/:ruc', requireAuth, async (req: Request, res: Response): Promise<void> => {
    try {
        const { ruc } = req.params;
        const { razon_social, actividad_economica, sede } = req.body;

        // Buscar empresa
        const empresa = await prisma.empresa.findUnique({ where: { ruc } });

        if (!empresa) {
            res.status(404).json({ error: 'Empresa no encontrada.' });
            return;
        }

        // Actualizar
        const actualizada = await prisma.empresa.update({
            where: { ruc },
            data: {
                razon_social: razon_social ? razon_social.toUpperCase() : empresa.razon_social,
                actividad_economica: actividad_economica ? actividad_economica.toUpperCase() : empresa.actividad_economica,
                sede: sede ? sede.toUpperCase() : empresa.sede,
            },
        });

        res.status(200).json({
            mensaje: 'Empresa actualizada exitosamente',
            empresa: actualizada,
        });
    } catch (error) {
        console.error('Error al actualizar empresa:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

/**
 * DELETE /api/v1/admin/empresas/:ruc
 * Elimina una empresa (solo si no tiene pólizas asociadas)
 */
router.delete('/empresas/:ruc', requireAuth, async (req: Request, res: Response): Promise<void> => {
    try {
        const { ruc } = req.params;

        // Buscar empresa
        const empresa = await prisma.empresa.findUnique({
            where: { ruc },
            include: {
                _count: {
                    select: { polizas: true },
                },
            },
        });

        if (!empresa) {
            res.status(404).json({ error: 'Empresa no encontrada.' });
            return;
        }

        // Verificar que no tenga pólizas
        if (empresa._count.polizas > 0) {
            res.status(400).json({
                error: `No se puede eliminar. La empresa tiene ${empresa._count.polizas} póliza(s) asociada(s).`,
            });
            return;
        }

        // Eliminar empresa
        await prisma.empresa.delete({ where: { ruc } });

        res.status(200).json({
            mensaje: 'Empresa eliminada exitosamente',
            ruc,
        });
    } catch (error) {
        console.error('Error al eliminar empresa:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

export { router as adminRouter };
