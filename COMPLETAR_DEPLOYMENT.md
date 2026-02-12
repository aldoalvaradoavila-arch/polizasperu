# ⚡ ACCIÓN INMEDIATA - Completar Deployment

## ✅ Backend: LISTO
- URL: https://polizasperu-api.onrender.com
- Health Check: ✅ Funcionando

---

## 🚀 PASO 1: Poblar Base de Datos (2 minutos)

### Opción A: Desde Render Shell (Recomendado)

1. Ve a: https://dashboard.render.com/
2. Click en tu servicio `polizasperu-api`
3. Click en **"Shell"** (botón arriba a la derecha)
4. Ejecuta:
   ```bash
   npm run prisma:seed
   ```
5. Verifica que veas: `✅ Seed completado`

### Opción B: Agregar al Build Command (Automático)

Si prefieres que los datos se creen automáticamente en cada deploy:

1. Ve a Render → Settings
2. Cambia el Build Command a:
   ```bash
   npm install && npm run build:production && npm run prisma:seed
   ```
3. Save Changes

---

## 🌐 PASO 2: Desplegar Frontend en Vercel (5 minutos)

### 2.1 Subir Cambios a GitHub (si no lo has hecho)

```powershell
cd "c:\Users\Hp\Desktop\Proyectos\Proyecto Scrt"
git add .
git commit -m "Deploy: Backend funcionando, listo para frontend"
git push
```

### 2.2 Crear Proyecto en Vercel

1. Ve a: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Autoriza a Vercel a acceder a tu GitHub (si aún no lo has hecho)
4. Selecciona tu repositorio `polizasperu`
5. Configuración:
   
   **Framework Preset**: Vite
   
   **Root Directory**: Click en "Edit" → Escribe: `frontend`
   
   **Build Command**: `npm run build` (debería detectarlo automáticamente)
   
   **Output Directory**: `dist` (debería detectarlo automáticamente)
   
   **Install Command**: `npm install` (debería detectarlo automáticamente)

6. **Environment Variables** → Click "Add"
   ```
   Name: VITE_API_URL
   Value: https://polizasperu-api.onrender.com
   ```

7. Click **"Deploy"**

8. ✅ Espera 2-3 minutos

9. **Copia la URL** que te da Vercel (ej: `https://polizasperu-abc123.vercel.app`)

---

## 🔗 PASO 3: Configurar CORS en Backend (2 minutos)

1. Ve a Render: https://dashboard.render.com/
2. Click en tu servicio `polizasperu-api`
3. Click en **"Environment"** (menú izquierdo)
4. Busca la variable `CORS_ORIGINS` o agrégala:
   ```
   Key: CORS_ORIGINS
   Value: https://tu-url-de-vercel.vercel.app
   ```
   (Usa la URL exacta que copiaste de Vercel, SIN la barra `/` al final)

5. Click **"Save Changes"**
6. El servicio se reiniciará automáticamente (1-2 minutos)

---

## 🧪 PASO 4: Probar la Aplicación (1 minuto)

1. Abre tu aplicación en Vercel: `https://tu-url.vercel.app`

2. Busca el DNI: **74317179**

3. Deberías ver:
   ```
   ✅ Asegurado Encontrado
   
   RICARDO CRISTIAN MUÑOZ CARRILLO
   DNI: 74317179
   
   Empresa: CONSTRUCTORA LIMA SAC
   Pólizas: SCTR Salud, SCTR Pensión
   ```

---

## 🎯 Verificación Rápida

### ✅ Backend
```
https://polizasperu-api.onrender.com/api/health
```
Debe mostrar: `{"status":"ok","timestamp":"..."}`

### ✅ Backend con Datos
```
https://polizasperu-api.onrender.com/api/v1/asegurados/buscar?dni=74317179
```
Debe mostrar los datos del asegurado (después del seed)

### ✅ Frontend
Abre tu URL de Vercel y busca el DNI

---

## 🆘 Solución de Problemas

### "No se encontraron seguros registrados"
→ Ejecuta el seed: `npm run prisma:seed` en Render Shell

### Error de CORS en el navegador
→ Verifica que `CORS_ORIGINS` en Render tenga la URL exacta de Vercel

### Frontend no se conecta al backend
→ Verifica que `VITE_API_URL` esté configurado en Vercel
→ Redeploy el frontend después de agregar la variable

### Backend tarda mucho en responder
→ Render Free tier "duerme" después de 15 minutos de inactividad
→ La primera petición puede tardar 30-60 segundos en "despertar"

---

## 📊 Checklist Final

- [ ] Base de datos poblada (seed ejecutado)
- [ ] Frontend desplegado en Vercel
- [ ] `VITE_API_URL` configurado en Vercel
- [ ] `CORS_ORIGINS` configurado en Render
- [ ] Health check responde OK
- [ ] Búsqueda de DNI funciona correctamente

---

**Tiempo total estimado: 10-15 minutos**

¡Vamos a terminarlo! 💪🚀
