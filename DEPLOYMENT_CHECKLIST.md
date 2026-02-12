# 🚀 Guía Rápida de Deployment — PolizasPeru

## ✅ Completado
- [x] Proyecto desarrollado y funcionando localmente
- [x] Git instalado en tu PC

## 📋 Próximos Pasos

### **PASO 1: Configurar Git** (Primera vez)

Abre una **nueva terminal PowerShell** (para que Git esté en el PATH) y ejecuta:

```powershell
# Configurar tu identidad
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Verificar instalación
git --version
```

---

### **PASO 2: Crear Cuentas** (10 minutos total)

#### 2.1 GitHub (obligatorio)
1. Ve a: https://github.com/signup
2. Crea tu cuenta con email
3. Verifica tu email
4. ✅ Listo

#### 2.2 Vercel (para el frontend)
1. Ve a: https://vercel.com/signup
2. Click en **"Continue with GitHub"**
3. Autoriza Vercel a acceder a tus repos
4. ✅ Listo

#### 2.3 Render (para el backend)
1. Ve a: https://render.com/register
2. Click en **"Sign up with GitHub"**
3. Autoriza Render
4. ✅ Listo

---

### **PASO 3: Subir Código a GitHub** (5 minutos)

En la terminal, desde la carpeta del proyecto:

```powershell
cd "c:\Users\Hp\Desktop\Proyectos\Proyecto Scrt"

# Inicializar Git
git init
git add .
git commit -m "Initial commit - PolizasPeru SCTR"

# Crear repositorio en GitHub
# 1. Ve a https://github.com/new
# 2. Nombre: polizasperu
# 3. Público
# 4. NO marques "Initialize with README"
# 5. Click "Create repository"

# Conectar con GitHub (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/polizasperu.git
git branch -M main
git push -u origin main
```

Te pedirá autenticación. Opciones:
- **Opción A**: Usar GitHub Desktop (más fácil)
- **Opción B**: Generar Personal Access Token en GitHub

---

### **PASO 4: Deploy Frontend en Vercel** (3 minutos)

1. Ve a https://vercel.com/new
2. Click **"Import Git Repository"**
3. Selecciona `polizasperu`
4. Configuración:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables** → Add:
   ```
   Name: VITE_API_URL
   Value: (déjalo vacío por ahora, lo llenarás después)
   ```
6. Click **"Deploy"**
7. ✅ Espera 2 minutos
8. **Copia la URL** (ej: `https://polizasperu.vercel.app`)

---

### **PASO 5: Deploy Backend en Render** (5 minutos)

1. Ve a https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect a repository"**
4. Selecciona `polizasperu`
5. Configuración:
   - **Name**: `polizasperu-api`
   - **Region**: Oregon (US West)
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: 
     ```
     npm install && npm run build:production
     ```
   - **Start Command**: `npm start`
   - **Instance Type**: Free
6. **Environment Variables** → Add:
   ```
   DATABASE_URL=file:./prod.db
   PORT=3001
   NODE_ENV=production
   CORS_ORIGINS=https://polizasperu.vercel.app
   ```
   (Reemplaza la URL de Vercel con la que copiaste en el paso 4)
7. Click **"Create Web Service"**
8. ✅ Espera 5-10 minutos
9. **Copia la URL** del backend (ej: `https://polizasperu-api.onrender.com`)

---

### **PASO 6: Conectar Frontend con Backend** (2 minutos)

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Click en tu proyecto `polizasperu`
3. Ve a **Settings** → **Environment Variables**
4. Edita `VITE_API_URL`:
   ```
   Value: https://polizasperu-api.onrender.com
   ```
   (Usa la URL que copiaste del backend)
5. Click **"Save"**
6. Ve a **Deployments** → Click en el último deployment → **"Redeploy"**
7. ✅ Espera 2 minutos

---

### **PASO 7: Poblar la Base de Datos** (2 minutos)

El backend en Render necesita datos. Tienes 2 opciones:

#### Opción A: Desde Render Shell (recomendado)
1. En Render, ve a tu servicio `polizasperu-api`
2. Click en **"Shell"** (arriba a la derecha)
3. Ejecuta:
   ```bash
   npm run prisma:seed
   ```
4. ✅ Listo

#### Opción B: Agregar seed al build
Edita `backend/package.json` y cambia el Build Command en Render a:
```
npm install && npx prisma generate && npx prisma migrate deploy && npm run prisma:seed && npm run build
```

---

### **PASO 8: ¡Probar la App!** 🎉

1. Abre tu app: `https://polizasperu.vercel.app`
2. Busca DNI: `74317179`
3. Deberías ver: **RICARDO CRISTIAN MUÑOZ CARRILLO**

✅ **¡FELICIDADES! Tu app está en producción y accesible desde cualquier parte del mundo.**

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:

```powershell
git add .
git commit -m "Descripción del cambio"
git push
```

Vercel y Render se actualizarán automáticamente en 2-3 minutos.

---

## 💡 Tips

- **Logs del backend**: Render Dashboard → Logs
- **Logs del frontend**: Vercel Dashboard → Deployments → View Function Logs
- **Base de datos**: Usa Prisma Studio localmente y luego haz seed en producción
- **Dominio personalizado**: En Vercel Settings → Domains (gratis con Vercel)

---

## 🆘 Problemas Comunes

### Frontend muestra error de conexión
- Verifica que `VITE_API_URL` esté configurado correctamente
- Verifica que `CORS_ORIGINS` en Render incluya tu URL de Vercel

### Backend da error 500
- Revisa los logs en Render
- Verifica que la migración de Prisma se ejecutó
- Verifica que el seed se ejecutó

### No encuentra datos (DNI válido)
- Ejecuta el seed: `npm run prisma:seed` en Render Shell

---

## 📞 Contacto

¿Dudas? Revisa:
- [DEPLOYMENT.md](DEPLOYMENT.md) — Guía detallada
- [README.md](README.md) — Documentación del proyecto
- GitHub Issues — Reporta problemas

---

**Tiempo total estimado: 30-40 minutos** ⏱️

¡Éxito con tu deployment! 🚀
