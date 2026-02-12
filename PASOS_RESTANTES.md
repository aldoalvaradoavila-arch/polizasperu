# 🎉 ¡Backend Desplegado Exitosamente!

## ✅ Estado Actual

- ✅ **Backend en Render**: Desplegado y funcionando
- ✅ **URL del API**: https://polizasperu-api.onrender.com
- ✅ **Health Check**: Respondiendo correctamente
- ⏳ **Base de Datos**: Pendiente de poblar
- ⏳ **Frontend**: Pendiente de conectar

---

## 📋 Pasos Restantes

### PASO 1: Poblar la Base de Datos en Producción ⏳

1. Ve a Render Dashboard: https://dashboard.render.com/
2. Selecciona tu servicio `polizasperu-api`
3. Click en **"Shell"** (botón arriba a la derecha)
4. En la terminal que se abre, ejecuta:
   ```bash
   npm run prisma:seed
   ```
5. Deberías ver un mensaje como:
   ```
   ✅ Seed completado: 3 asegurados, 1 empresa, 3 pólizas
   ```

---

### PASO 2: Actualizar Variables de Entorno en Render ⏳

Ahora que el backend funciona, vamos a agregar la variable CORS correcta.

1. En Render, ve a tu servicio `polizasperu-api`
2. Click en **"Environment"** (menú izquierdo)
3. Agrega o edita la variable:
   ```
   Key: CORS_ORIGINS
   Value: https://polizasperu.vercel.app
   ```
   (Reemplaza con la URL real de tu frontend en Vercel si es diferente)
4. Click **"Save Changes"**
5. El servicio se reiniciará automáticamente

---

### PASO 3: Configurar Frontend en Vercel ⏳

#### 3.1 Verificar que el Frontend esté Desplegado

¿Ya desplegaste el frontend en Vercel? Si no, sigue estos pasos:

1. Ve a: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Selecciona tu repositorio `polizasperu`
4. Configuración:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables** → Add:
   ```
   Name: VITE_API_URL
   Value: https://polizasperu-api.onrender.com
   ```
6. Click **"Deploy"**
7. ✅ Espera 2-3 minutos

#### 3.2 Si Ya Está Desplegado, Actualizar la Variable de Entorno

1. Ve a: https://vercel.com/dashboard
2. Click en tu proyecto (probablemente se llame `polizasperu` o `frontend`)
3. Ve a **Settings** → **Environment Variables**
4. Busca `VITE_API_URL` o agrégala si no existe:
   ```
   Name: VITE_API_URL
   Value: https://polizasperu-api.onrender.com
   ```
5. Click **"Save"**
6. Ve a **Deployments** (en el menú superior)
7. Click en el deployment más reciente
8. Click en **"Redeploy"** → **"Redeploy"** (confirmar)
9. ✅ Espera 2-3 minutos

---

### PASO 4: Probar la Aplicación Completa 🧪

Una vez que ambos servicios estén desplegados y conectados:

1. Abre tu aplicación en Vercel (ej: `https://polizasperu.vercel.app`)
2. En el campo de búsqueda, ingresa el DNI: **74317179**
3. Click en **"Buscar"**
4. Deberías ver:
   ```
   ✅ Asegurado Encontrado
   
   Nombre: RICARDO CRISTIAN MUÑOZ CARRILLO
   DNI: 74317179
   
   Empresa: CONSTRUCTORA LIMA SAC
   RUC: 20123456789
   
   Pólizas:
   - SCTR Salud (ACTIVO)
   - SCTR Pensión (ACTIVO)
   ```

---

## 🔍 Verificaciones

### Verificar Backend (API)

Prueba estos endpoints en tu navegador:

1. **Health Check**:
   ```
   https://polizasperu-api.onrender.com/api/health
   ```
   Debería mostrar: `{"status":"ok","timestamp":"..."}`

2. **Buscar Asegurado** (después del seed):
   ```
   https://polizasperu-api.onrender.com/api/v1/asegurados/buscar?dni=74317179
   ```
   Debería mostrar los datos del asegurado

### Verificar Frontend

1. Abre tu app en Vercel
2. Abre las **DevTools** del navegador (F12)
3. Ve a la pestaña **Console**
4. Busca un DNI
5. Verifica que no haya errores de CORS o de conexión

---

## 🆘 Problemas Comunes

### Frontend muestra "Error de conexión" o "No se pudo conectar al servidor"

**Causa**: La variable `VITE_API_URL` no está configurada o es incorrecta.

**Solución**:
1. Verifica en Vercel → Settings → Environment Variables
2. Asegúrate de que `VITE_API_URL=https://polizasperu-api.onrender.com`
3. Redeploy el frontend

### Backend responde con error CORS

**Causa**: La variable `CORS_ORIGINS` no incluye la URL del frontend.

**Solución**:
1. Ve a Render → Environment
2. Verifica que `CORS_ORIGINS` tenga la URL exacta de Vercel
3. No incluyas `/` al final
4. Guarda y espera que se reinicie

### Búsqueda retorna "No se encontraron seguros"

**Causa**: La base de datos no tiene datos.

**Solución**:
1. Ve a Render → Shell
2. Ejecuta: `npm run prisma:seed`
3. Intenta buscar nuevamente

---

## 📊 URLs de Referencia

- **Backend API**: https://polizasperu-api.onrender.com
- **Frontend**: (Tu URL de Vercel)
- **Render Dashboard**: https://dashboard.render.com/
- **Vercel Dashboard**: https://vercel.com/dashboard

---

## ✅ Checklist Final

- [ ] Base de datos poblada con `npm run prisma:seed`
- [ ] Variable `CORS_ORIGINS` configurada en Render
- [ ] Frontend desplegado en Vercel
- [ ] Variable `VITE_API_URL` configurada en Vercel
- [ ] Frontend redeployado después de agregar la variable
- [ ] Health check del backend responde OK
- [ ] Búsqueda de DNI funciona correctamente
- [ ] No hay errores en la consola del navegador

---

**¡Estás muy cerca de terminar! 🚀**

Sigue estos pasos en orden y tu aplicación estará completamente funcional en producción.
