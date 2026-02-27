# 🔧 Fix: Error "Cannot find module dist/index.js"

## ❌ Error en los Logs:

```
Error: Cannot find module '/opt/render/project/src/backend/dist/index.js'
```

## 🔍 Causa del Problema:

El **Build Command** no incluye `tsc` para compilar TypeScript a JavaScript. Las migraciones se ejecutan pero el código TypeScript nunca se compila.

## ✅ Solución: Actualizar Configuración en Render

### Paso 1: Configurar Root Directory

1. Ve a tu servicio backend en Render: https://dashboard.render.com/
2. Click en tu servicio `polizasperu-api`
3. Ve a **"Settings"**
4. Busca **"Root Directory"**
5. Cámbialo a: `backend`
6. Click **"Save Changes"**

### Paso 2: Actualizar Build Command

1. En la misma página de Settings
2. Busca **"Build Command"**
3. Cámbialo a:
   ```bash
   npm install && npx prisma generate && npx prisma migrate deploy && npm run build
   ```
   **O usa el script de producción**:
   ```bash
   npm install && npm run build:production
   ```
4. Click **"Save Changes"**

### Paso 3: Verificar Start Command

1. Busca **"Start Command"**
2. Debe ser:
   ```bash
   npm start
   ```
3. Si no lo es, cámbialo y guarda

### Paso 4: Redeploy

1. Ve a **"Manual Deploy"**
2. Click **"Deploy latest commit"**
3. Espera 5-10 minutos

---

## 🎯 Configuración Completa de Render

### Configuración Correcta:

| Setting | Valor |
|---------|-------|
| **Root Directory** | `backend` |
| **Build Command** | `npm install && npx prisma generate && npx prisma migrate deploy && npm run build` |
| **Start Command** | `npm start` |
| **Environment Variables** | `DATABASE_URL` (PostgreSQL URL) |
| | `PORT` (10000 - automático) |
| | `ADMIN_API_KEY` (tu clave) |
| | `CORS_ORIGINS` (URLs del frontend) |

---

## 🔍 Qué Esperar en los Logs Exitosos:

```bash
==> Running build command 'npm install && npx prisma generate && npx prisma migrate deploy && npm run build'...

# Instalación
npm install
✓ Dependencies installed

# Generar Prisma Client
npx prisma generate
✔ Generated Prisma Client

# Ejecutar Migraciones
npx prisma migrate deploy
Applying migration `0_init`
✔ All migrations have been successfully applied

# Compilar TypeScript
npm run build
> tsc
✓ TypeScript compiled successfully

==> Build successful 🎉

==> Running 'npm start'
> node dist/index.js

Server running on port 10000
✓ Connected to database
```

---

## 📋 Checklist de Configuración:

- [ ] Root Directory = `backend`
- [ ] Build Command incluye `npm run build` o `tsc`
- [ ] Start Command = `npm start`
- [ ] PostgreSQL creado en Render
- [ ] `DATABASE_URL` configurada (Internal URL)
- [ ] `ADMIN_API_KEY` configurada
- [ ] `CORS_ORIGINS` configurada con URL de Vercel

---

## 🆘 Troubleshooting

### Error: "Cannot find module dist/index.js"
→ **Causa**: Build command no compila TypeScript
→ **Solución**: Agregar `npm run build` al build command

### Error: "tsc: command not found"
→ **Causa**: TypeScript no está instalado
→ **Solución**: Ya está en devDependencies, solo asegúrate que `npm install` se ejecute

### Error: "Can't reach database server"
→ **Causa**: DATABASE_URL no configurada
→ **Solución**: Configurar PostgreSQL y agregar URL

---

## 🎯 Resumen de Cambios Necesarios:

1. **Root Directory**: `backend` ← IMPORTANTE
2. **Build Command**: Agregar `npm run build` al final
3. **Redeploy**: Manual deploy

---

## 📝 Alternativa: Usar build:production Script

El package.json ya tiene un script `build:production` que hace todo:

```json
"build:production": "prisma generate && prisma migrate deploy && tsc"
```

Puedes usar este build command más simple:

```bash
npm install && npm run build:production
```

---

## ✅ Después del Fix:

Una vez que configures correctamente:

1. El deployment se completará exitosamente
2. El servidor iniciará en el puerto 10000
3. Podrás acceder a tu API
4. Los datos persistirán en PostgreSQL

---

**Configura estos 3 settings en Render y haz redeploy. El problema se resolverá.** 🚀
