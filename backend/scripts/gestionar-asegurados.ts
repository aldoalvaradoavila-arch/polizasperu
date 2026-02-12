import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function agregarAsegurado() {
    // 1. Buscar la empresa existente
    const empresa = await prisma.empresa.findFirst();

    if (!empresa) {
        console.error('❌ No hay empresa en la BD. Ejecuta primero: npm run prisma:seed');
        return;
    }

    // 2. Datos del nuevo asegurado
    const nuevoAsegurado = {
        dni: '12345678',  // ⬅️ CAMBIA ESTO
        nombres: 'MARIA ELENA',
        apellido_paterno: 'GARCIA',
        apellido_materno: 'LOPEZ',
    };

    // 3. Crear asegurado
    const asegurado = await prisma.asegurado.create({
        data: nuevoAsegurado,
    });

    // 4. Crear pólizas (Salud + Pensión)
    await prisma.poliza.createMany({
        data: [
            {
                tipo_seguro: 'SCTR_SALUD',
                numero_contrato_poliza: '808407',
                fecha_inicio: new Date('2026-02-12T00:00:00.000Z'),
                fecha_fin: new Date('2026-03-11T23:59:59.000Z'),
                id_empresa: empresa.id,
                id_asegurado: asegurado.id,
            },
            {
                tipo_seguro: 'SCTR_PENSION',
                numero_contrato_poliza: '9000241027',
                fecha_inicio: new Date('2026-02-12T00:00:00.000Z'),
                fecha_fin: new Date('2026-03-11T23:59:59.000Z'),
                id_empresa: empresa.id,
                id_asegurado: asegurado.id,
            },
        ],
    });

    console.log(`✅ Asegurado agregado: ${asegurado.nombres} ${asegurado.apellido_paterno} (DNI: ${asegurado.dni})`);
}

async function eliminarAsegurado(dni: string) {
    // Buscar asegurado
    const asegurado = await prisma.asegurado.findUnique({ where: { dni } });

    if (!asegurado) {
        console.error(`❌ No se encontró asegurado con DNI ${dni}`);
        return;
    }

    // Eliminar pólizas primero (por FK)
    await prisma.poliza.deleteMany({ where: { id_asegurado: asegurado.id } });

    // Eliminar asegurado
    await prisma.asegurado.delete({ where: { dni } });

    console.log(`✅ Asegurado eliminado: DNI ${dni}`);
}

// Ejecutar
const accion = process.argv[2]; // 'agregar' o 'eliminar'
const dni = process.argv[3];

if (accion === 'agregar') {
    agregarAsegurado()
        .catch(console.error)
        .finally(() => prisma.$disconnect());
} else if (accion === 'eliminar' && dni) {
    eliminarAsegurado(dni)
        .catch(console.error)
        .finally(() => prisma.$disconnect());
} else {
    console.log('Uso:');
    console.log('  npm run script agregar          # Agrega el asegurado definido en el script');
    console.log('  npm run script eliminar 12345678 # Elimina asegurado por DNI');
    prisma.$disconnect();
}
