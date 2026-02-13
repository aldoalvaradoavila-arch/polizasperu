-- CreateTable
CREATE TABLE "asegurados" (
    "id" SERIAL NOT NULL,
    "dni" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellido_paterno" TEXT NOT NULL,
    "apellido_materno" TEXT NOT NULL,

    CONSTRAINT "asegurados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresas" (
    "id" SERIAL NOT NULL,
    "razon_social" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "actividad_economica" TEXT NOT NULL,
    "sede" TEXT NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "polizas" (
    "id" SERIAL NOT NULL,
    "tipo_seguro" TEXT NOT NULL,
    "numero_contrato_poliza" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "id_asegurado" INTEGER NOT NULL,

    CONSTRAINT "polizas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "asegurados_dni_key" ON "asegurados"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_ruc_key" ON "empresas"("ruc");

-- AddForeignKey
ALTER TABLE "polizas" ADD CONSTRAINT "polizas_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "polizas" ADD CONSTRAINT "polizas_id_asegurado_fkey" FOREIGN KEY ("id_asegurado") REFERENCES "asegurados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
