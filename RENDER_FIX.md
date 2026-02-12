# 🔧 Solución de Errores de Deploy en Render

## Problemas Identificados

Del log de errores, se identificaron los siguientes problemas:

1. **TS7016**: No puede encontrar archivos de declaración para módulos (`express`, `core`, `process`, `node`)
2. **TS7006**: Parámetros con tipo 'any' implícito
3. **Build Failed**: El build de TypeScript falló debido a errores de tipos

## ✅ Soluciones Implementadas

### 1. Actualización de `tsconfig.json`
Se agregaron las siguientes configuraciones:
- `"noImplicitAny": false` - Permite tipos implícitos para evitar errores TS7006
- `"typeRoots"` - Especifica dónde buscar los tipos
- `"types": ["node"]` - Incluye explícitamente los tipos de Node.js

### 2. Nuevo script de build
Se agregó `build:production` en `package.json` que ejecuta:
```bash
prisma generate && prisma migrate deploy && tsc
```

## 🚀 Pasos para Corregir el Deploy en Render

### Opción A: Actualizar Configuración en Render (Recomendado)

1. Ve a tu servicio en Render: https://dashboard.render.com/
2. Selecciona tu servicio `polizasperu-api`
3. Ve a **Settings**
4. Actualiza la configuración:

   **Build Command:**
   ```bash
   npm install && npm run build:production
   ```

   **Start Command:**
   ```bash
   npm start
   ```

5. **Environment Variables** - Verifica que tengas:
   ```
   DATABASE_URL=file:./prod.db
   PORT=3001
   CORS_ORIGINS=https://polizasperu.vercel.app
   ```
   
   **IMPORTANTE**: NO agregues `NODE_ENV=production` todavía, ya que esto puede impedir que se instalen las devDependencies necesarias para el build.

6. Click **"Save Changes"**
7. Ve a **Manual Deploy** → **"Deploy latest commit"**

### Opción B: Usar Build Command Expandido

Si la Opción A no funciona, usa este Build Command más explícito:

```bash
npm install && npx prisma generate && npx prisma migrate deploy && npx tsc
```

## 🔍 Verificación del Deploy

Después de hacer el deploy, verifica:

1. **Logs del Build**: Revisa que no haya errores de TypeScript
2. **Logs del Runtime**: Verifica que el servidor inicie correctamente
3. **Health Check**: Prueba el endpoint:
   ```
   https://tu-servicio.onrender.com/api/health
   ```
   Debería retornar:
   ```json
   {
     "status": "ok",
     "timestamp": "2026-02-12T..."
   }
   ```

## 📝 Poblar la Base de Datos

Una vez que el deploy sea exitoso:

1. En Render, ve a tu servicio
2. Click en **"Shell"** (arriba a la derecha)
3. Ejecuta:
   ```bash
   npm run prisma:seed
   ```
4. Verifica que se hayan creado los datos de prueba

## 🧪 Probar la Aplicación

1. Abre tu frontend: `https://polizasperu.vercel.app`
2. Busca DNI: `74317179`
3. Deberías ver: **RICARDO CRISTIAN MUÑOZ CARRILLO**

## 🆘 Si Aún Hay Errores

### Error: "Cannot find module 'express'"
- Verifica que `express` y `@types/express` estén en `package.json`
- Verifica que el `npm install` se ejecute correctamente en los logs

### Error: "tsc: command not found"
- Usa `npx tsc` en lugar de `tsc` en el Build Command
- Verifica que `typescript` esté en `devDependencies`

### Error: "Prisma Client not generated"
- Asegúrate de que `prisma generate` se ejecute antes de `tsc`
- Verifica que `@prisma/client` esté en `dependencies`

### Error de CORS
- Verifica que `CORS_ORIGINS` incluya la URL exacta de tu frontend en Vercel
- No incluyas `/` al final de la URL

## 📊 Cambios Realizados

### `backend/tsconfig.json`
```json
{
  "compilerOptions": {
    // ... otras opciones
    "noImplicitAny": false,        // ← NUEVO
    "strictNullChecks": true,      // ← NUEVO
    "typeRoots": [                 // ← NUEVO
      "./node_modules/@types"
    ],
    "types": [                     // ← NUEVO
      "node"
    ]
  }
}
```

### `backend/package.json`
```json
{
  "scripts": {
    "build:production": "prisma generate && prisma migrate deploy && tsc"  // ← NUEVO
  }
}
```

## ✅ Checklist Final

- [ ] `tsconfig.json` actualizado con las nuevas opciones
- [ ] `package.json` tiene el script `build:production`
- [ ] Build Command en Render actualizado
- [ ] Variables de entorno configuradas correctamente
- [ ] Deploy manual ejecutado
- [ ] Logs del build sin errores
- [ ] Health check responde correctamente
- [ ] Base de datos poblada con seed
- [ ] Frontend conectado y funcionando

---

**Tiempo estimado para aplicar los cambios: 5-10 minutos**

¡Éxito con tu deployment! 🚀
