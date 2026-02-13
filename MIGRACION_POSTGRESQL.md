# 🔧 Configuración de Base de Datos PostgreSQL en Render

## ⚠️ IMPORTANTE: Migración de SQLite a PostgreSQL

Tu aplicación actualmente usa SQLite, que **NO persiste datos** cuando Render entra en suspensión. Necesitas migrar a PostgreSQL.

---

## 📋 Pasos para Configurar PostgreSQL en Render

### Paso 1: Crear Base de Datos PostgreSQL en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click en **"New +"** → **"PostgreSQL"**
3. Configura la base de datos:
   - **Name**: `polizasperu-db`
   - **Database**: `polizasperu`
   - **User**: (se genera automáticamente)
   - **Region**: Selecciona la misma región que tu servicio backend
   - **Plan**: **Free** (0$/mes)
4. Click en **"Create Database"**
5. Espera 2-3 minutos a que se cree

### Paso 2: Obtener la URL de Conexión

1. Una vez creada la base de datos, ve a la pestaña **"Info"**
2. Busca **"Internal Database URL"** (no uses la External)
3. Copia la URL completa, se ve así:
   ```
   postgresql://polizasperu_db_user:XXXXXXXXX@dpg-xxxxx-a.oregon-postgres.render.com/polizasperu_db
   ```

### Paso 3: Configurar Variable de Entorno en el Backend

1. Ve a tu servicio backend `polizasperu-api`
2. Ve a **"Environment"**
3. **Edita** la variable `DATABASE_URL`:
   - **Key**: `DATABASE_URL`
   - **Value**: Pega la URL que copiaste en el Paso 2
4. Click **"Save Changes"**

### Paso 4: Agregar Script de Build

1. En tu servicio backend, ve a **"Settings"**
2. Busca **"Build Command"**
3. Cámbialo a:
   ```bash
   npm install && npx prisma generate && npx prisma migrate deploy
   ```
4. Click **"Save Changes"**

### Paso 5: Redeploy

1. Ve a **"Manual Deploy"** → **"Deploy latest commit"**
2. O simplemente haz push a GitHub (se desplegará automáticamente)
3. Espera a que termine el deployment (5-10 minutos la primera vez)

---

## 🔍 Verificar que Funciona

### Opción 1: Logs de Render
1. Ve a tu servicio backend
2. Click en **"Logs"**
3. Busca mensajes como:
   ```
   ✓ Generated Prisma Client
   ✓ Migrations deployed successfully
   Server running on port 10000
   ```

### Opción 2: Probar la API
1. Ve a tu panel de administración
2. Crea un nuevo asegurado o empresa
3. **Espera 15 minutos** (para que Render entre en suspensión)
4. Refresca la página
5. **Los datos deben seguir ahí** ✅

---

## 📊 Diferencias SQLite vs PostgreSQL

| Característica | SQLite (Anterior) | PostgreSQL (Nuevo) |
|----------------|-------------------|-------------------|
| **Persistencia** | ❌ Se pierde al suspender | ✅ Datos permanentes |
| **Costo** | Gratis | Gratis (Free tier) |
| **Performance** | Buena para desarrollo | Mejor para producción |
| **Concurrencia** | Limitada | Excelente |
| **Backups** | Manual | Automáticos en Render |

---

## 🔄 Migración de Datos Existentes

Si ya tienes datos en SQLite que quieres conservar:

### Opción 1: Recrear Manualmente (Recomendado)
1. Anota los datos que tienes actualmente
2. Configura PostgreSQL
3. Vuelve a crear los registros en el panel de administración

### Opción 2: Exportar/Importar (Avanzado)
1. Exporta datos de SQLite:
   ```bash
   npx prisma db pull
   ```
2. Configura PostgreSQL
3. Importa con seed script

---

## ⚙️ Configuración Local (Opcional)

Si quieres usar PostgreSQL también en desarrollo local:

### Instalar PostgreSQL
- **Windows**: https://www.postgresql.org/download/windows/
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql`

### Configurar .env Local
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/polizasperu?schema=public"
```

### Crear Base de Datos
```bash
createdb polizasperu
npx prisma migrate dev
npx prisma db seed
```

---

## 🐛 Troubleshooting

### Error: "Can't reach database server"
→ Verifica que la `DATABASE_URL` esté correctamente configurada
→ Usa la **Internal Database URL**, no la External

### Error: "Migration failed"
→ Asegúrate de que el build command incluya `prisma migrate deploy`
→ Verifica que la base de datos esté creada y activa

### Los datos siguen desapareciendo
→ Verifica en Render Dashboard que estés usando PostgreSQL
→ Revisa los logs para confirmar que las migraciones se ejecutaron

### Error: "Database does not exist"
→ La base de datos PostgreSQL no está creada
→ Sigue el Paso 1 para crearla

---

## ✅ Checklist de Migración

- [ ] Crear base de datos PostgreSQL en Render
- [ ] Copiar Internal Database URL
- [ ] Configurar variable `DATABASE_URL` en backend
- [ ] Actualizar Build Command con migraciones
- [ ] Hacer push a GitHub (o manual deploy)
- [ ] Verificar logs de deployment
- [ ] Probar creando datos
- [ ] Esperar 15 minutos y verificar persistencia
- [ ] ✅ ¡Datos persisten correctamente!

---

## 📝 Notas Importantes

1. **Free Tier de PostgreSQL**:
   - 256 MB de almacenamiento
   - Suficiente para ~10,000 registros
   - Se suspende después de 90 días de inactividad (pero los datos persisten)

2. **Backups**:
   - Render hace backups automáticos
   - Puedes descargar backups manualmente desde el dashboard

3. **Desarrollo Local**:
   - Puedes seguir usando SQLite localmente
   - El schema.prisma ahora usa PostgreSQL por defecto
   - Cambia `provider = "postgresql"` a `provider = "sqlite"` si quieres SQLite local

---

**¡Después de esta configuración, tus datos nunca más se perderán!** 🎉
