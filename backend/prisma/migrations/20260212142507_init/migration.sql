-- CreateTable
CREATE TABLE "asegurados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dni" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellido_paterno" TEXT NOT NULL,
    "apellido_materno" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "empresas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "razon_social" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "actividad_economica" TEXT NOT NULL,
    "sede" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "polizas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo_seguro" TEXT NOT NULL,
    "numero_contrato_poliza" TEXT NOT NULL,
    "fecha_inicio" DATETIME NOT NULL,
    "fecha_fin" DATETIME NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "id_asegurado" INTEGER NOT NULL,
    CONSTRAINT "polizas_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "polizas_id_asegurado_fkey" FOREIGN KEY ("id_asegurado") REFERENCES "asegurados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "asegurados_dni_key" ON "asegurados"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_ruc_key" ON "empresas"("ruc");
