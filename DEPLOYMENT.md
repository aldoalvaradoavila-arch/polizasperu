# PolizasPeru — Deployment Guide

## 🚀 Despliegue a Producción (100% Gratis)

### Stack de Deployment
- **Frontend**: Vercel (gratis)
- **Backend**: Render.com (gratis)
- **Base de datos**: Turso SQLite (gratis) o Railway PostgreSQL (gratis)

---

## 📋 Paso 1: Preparar el repositorio Git

```bash
# Inicializar Git en la raíz del proyecto
cd "c:\Users\Hp\Desktop\Proyectos\Proyecto Scrt"
git init
git add .
git commit -m "Initial commit - PolizasPeru SCTR app"

# Crear repositorio en GitHub
# Ve a https://github.com/new
# Crea un repo llamado "polizasperu"
# Luego ejecuta:
git remote add origin https://github.com/TU_USUARIO/polizasperu.git
git branch -M main
git push -u origin main
```

---

## 🎨 Paso 2: Deploy del Frontend en Vercel

### 2.1 Crear cuenta en Vercel
1. Ve a https://vercel.com/signup
2. Regístrate con tu cuenta de GitHub

### 2.2 Importar proyecto
1. Click en **"Add New Project"**
2. Selecciona tu repositorio `polizasperu`
3. Configura el proyecto:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2.3 Variables de entorno
En Vercel, ve a **Settings → Environment Variables** y agrega:
```
VITE_API_URL=https://tu-backend.onrender.com
```
(La URL del backend la obtendrás en el paso 3)

### 2.4 Deploy
Click en **Deploy** — en 2 minutos tendrás tu frontend en:
```
https://polizasperu.vercel.app
```

---

## ⚙️ Paso 3: Deploy del Backend en Render.com

### 3.1 Crear cuenta en Render
1. Ve a https://render.com/register
2. Regístrate con tu cuenta de GitHub

### 3.2 Crear Web Service
1. Click en **"New +"** → **"Web Service"**
2. Conecta tu repositorio `polizasperu`
3. Configura:
   - **Name**: `polizasperu-api`
   - **Region**: Oregon (US West)
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 3.3 Variables de entorno
En Render, ve a **Environment** y agrega:
```
DATABASE_URL=file:./prod.db
PORT=3001
CORS_ORIGINS=https://polizasperu.vercel.app,https://polizasperu-git-main-tu-usuario.vercel.app
NODE_ENV=production
```

### 3.4 Deploy
Click en **Create Web Service** — en 5-10 minutos tendrás tu backend en:
```
https://polizasperu-api.onrender.com
```

**⚠️ IMPORTANTE**: Copia esta URL y actualiza `VITE_API_URL` en Vercel (paso 2.3)

---

## 🗄️ Paso 4: Base de datos en producción

### Opción A: Turso (SQLite en la nube) — Recomendado

1. Ve a https://turso.tech/
2. Crea una cuenta gratuita
3. Crea una base de datos:
   ```bash
   turso db create polizasperu
   turso db show polizasperu --url
   ```
4. Copia la URL y actualiza `DATABASE_URL` en Render

### Opción B: Railway PostgreSQL

1. Ve a https://railway.app/
2. Crea un proyecto → Add PostgreSQL
3. Copia la `DATABASE_URL`
4. Actualiza `backend/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. Actualiza `DATABASE_URL` en Render

---

## ✅ Paso 5: Verificar deployment

1. Abre `https://polizasperu.vercel.app`
2. Busca DNI `74317179`
3. Deberías ver los datos de RICARDO CRISTIAN MUÑOZ CARRILLO

---

## 🔄 Actualizaciones futuras

Cada vez que hagas `git push`, Vercel y Render se actualizarán automáticamente.

---

## 💰 Límites del plan gratuito

| Servicio | Límite |
|----------|--------|
| Vercel | 100 GB bandwidth/mes |
| Render | 750 horas/mes (suficiente para 1 app) |
| Turso | 9 GB storage, 1 billón rows |

**Suficiente para miles de usuarios al mes.**

---

## 🆘 Troubleshooting

### Frontend no conecta con backend
- Verifica que `VITE_API_URL` en Vercel apunte a la URL correcta de Render
- Verifica que `CORS_ORIGINS` en Render incluya la URL de Vercel

### Backend da error 500
- Revisa los logs en Render: **Logs** tab
- Verifica que la migración de Prisma se ejecutó correctamente

### Base de datos vacía
- Ejecuta el seed manualmente en Render:
  ```bash
  npm run prisma:seed
  ```
