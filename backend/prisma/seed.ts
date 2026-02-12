import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Limpiar datos existentes
    await prisma.poliza.deleteMany();
    await prisma.asegurado.deleteMany();
    await prisma.empresa.deleteMany();

    // Crear empresa contratante
    const empresa = await prisma.empresa.create({
        data: {
            razon_social: 'CARRILLO MUÑOZ RICARDO CRISTIAN',
            ruc: '10743171794',
            actividad_economica: 'ACTIVIDADES DE TELECOMUNICACIONES INALÁMBRICAS',
            sede: 'PRINCIPAL',
        },
    });

    // Asegurados según el SRS
    const aseguradosData = [
        { dni: '74317179', nombres: 'RICARDO CRISTIAN', apellido_paterno: 'MUÑOZ', apellido_materno: 'CARRILLO' },
        { dni: '70494206', nombres: 'JHOSTIN JEHOIAQUIM', apellido_paterno: 'VILLANUEVA', apellido_materno: 'JAIMES' },
        { dni: '70494184', nombres: 'BRYAN GHARDICK', apellido_paterno: 'VILLANUEVA', apellido_materno: 'JAIMES' },
    ];

    const fechaInicio = new Date('2026-02-12T00:00:00.000Z');
    const fechaFin = new Date('2026-03-11T23:59:59.000Z');

    for (const data of aseguradosData) {
        const asegurado = await prisma.asegurado.create({ data });

        // Cada asegurado tiene SCTR Salud + SCTR Pensión
        await prisma.poliza.createMany({
            data: [
                {
                    tipo_seguro: 'SCTR_SALUD',
                    numero_contrato_poliza: '808407',
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin,
                    id_empresa: empresa.id,
                    id_asegurado: asegurado.id,
                },
                {
                    tipo_seguro: 'SCTR_PENSION',
                    numero_contrato_poliza: '9000241027',
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin,
                    id_empresa: empresa.id,
                    id_asegurado: asegurado.id,
                },
            ],
        });
    }

    console.log('✅ Seed completado: 1 empresa, 3 asegurados, 6 pólizas creadas');
}

main()
    .catch((e) => {
        console.error('❌ Error en seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
