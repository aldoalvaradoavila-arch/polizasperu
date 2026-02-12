# 🎨 Panel de Administración - PolizasPeru

## ✅ ¡Panel de Administración Completado!

He creado un panel de administración completo y moderno para tu aplicación con las siguientes características:

---

## 🎯 Características Implementadas

### 1. **Autenticación Segura**
- ✅ Página de login protegida con API Key
- ✅ Almacenamiento seguro en localStorage
- ✅ Validación de credenciales en cada petición
- ✅ Botón de cerrar sesión

### 2. **Dashboard Interactivo**
- ✅ Estadísticas en tiempo real
- ✅ Tarjetas con contadores de asegurados, empresas y pólizas
- ✅ Diseño moderno con gradientes y animaciones

### 3. **Gestión de Asegurados**
- ✅ Tabla con lista completa de asegurados
- ✅ Formulario para crear nuevos asegurados
- ✅ Agregar múltiples pólizas por asegurado
- ✅ Editar datos personales
- ✅ Eliminar asegurados
- ✅ Validación de DNI (8 dígitos)

### 4. **Gestión de Empresas**
- ✅ Tabla con lista completa de empresas
- ✅ Formulario para crear nuevas empresas
- ✅ Editar datos de empresas
- ✅ Eliminar empresas (solo si no tienen pólizas)
- ✅ Validación de RUC (11 dígitos)
- ✅ Contador de pólizas por empresa

### 5. **Diseño Premium**
- ✅ Sidebar fijo con navegación
- ✅ Gradientes modernos
- ✅ Animaciones suaves
- ✅ Diseño responsive (móvil y desktop)
- ✅ Iconos SVG personalizados
- ✅ Estados de loading y error

---

## 🚀 Cómo Usar el Panel

### Paso 1: Acceder al Panel

1. **Desde la app pública**: Click en el botón "Admin" en el navbar
2. **Directamente**: Navega a `https://tu-app.vercel.app/admin`

### Paso 2: Iniciar Sesión

1. Ingresa tu **API Key** (la que configuraste en Render)
2. Click en "Ingresar al Panel"
3. La sesión se guarda automáticamente

### Paso 3: Navegar por el Panel

**Dashboard**:
- Vista general con estadísticas
- Contadores de asegurados, empresas y pólizas

**Asegurados**:
- Ver lista completa
- Crear nuevo asegurado con pólizas
- Editar datos personales
- Eliminar asegurados

**Empresas**:
- Ver lista completa
- Crear nueva empresa
- Editar datos
- Eliminar (si no tiene pólizas)

---

## 📝 Crear un Nuevo Asegurado

1. Click en "Asegurados" en el sidebar
2. Click en "Nuevo Asegurado"
3. Completa el formulario:
   - **DNI**: 8 dígitos numéricos
   - **Nombres**: Nombres completos
   - **Apellido Paterno**
   - **Apellido Materno**
4. Click en "Agregar Póliza" para agregar pólizas:
   - **Tipo**: SCTR Salud o SCTR Pensión
   - **Número de Póliza**
   - **Fecha Inicio**
   - **Fecha Fin**
5. Puedes agregar múltiples pólizas
6. Click en "Crear"

---

## 🏢 Crear una Nueva Empresa

1. Click en "Empresas" en el sidebar
2. Click en "Nueva Empresa"
3. Completa el formulario:
   - **RUC**: 11 dígitos numéricos
   - **Razón Social**: Nombre de la empresa
   - **Actividad Económica**: Ej: CONSTRUCCIÓN
   - **Sede**: Ej: LIMA
4. Click en "Crear"

---

## 🔧 Configuración Necesaria

### Backend (Render)

Agrega esta variable de entorno en Render:

```
ADMIN_API_KEY=TuClaveSecretaSuperSegura2026
```

**Pasos**:
1. Ve a Render Dashboard
2. Selecciona tu servicio `polizasperu-api`
3. Ve a **Environment**
4. Agrega la variable
5. Click **"Save Changes"**

### Frontend (Vercel)

No necesita configuración adicional. El panel ya está integrado.

---

## 🎨 Capturas del Panel

### Login
- Diseño moderno con gradiente púrpura
- Formulario centrado
- Validación de campos

### Dashboard
- 3 tarjetas de estadísticas con gradientes
- Información de bienvenida
- Navegación intuitiva

### Gestión de Asegurados
- Tabla con datos completos
- Botones de editar y eliminar
- Modal con formulario dinámico
- Agregar/quitar pólizas

### Gestión de Empresas
- Tabla con RUC, razón social, actividad
- Contador de pólizas asociadas
- Prevención de eliminación si tiene pólizas

---

## 🚀 Desplegar los Cambios

### Paso 1: Subir a GitHub

```powershell
cd "c:\Users\Hp\Desktop\Proyectos\Proyecto Scrt"
git add .
git commit -m "Add: Panel de administración completo con gestión de asegurados y empresas"
git push
```

### Paso 2: Configurar API Key en Render

1. Ve a Render Dashboard
2. Selecciona `polizasperu-api`
3. Environment → Add Variable:
   ```
   ADMIN_API_KEY=MiClaveSecretaSuperSegura2026
   ```
4. Save Changes

### Paso 3: Esperar Deploy Automático

- Vercel y Render se actualizarán automáticamente
- Espera 2-5 minutos

### Paso 4: Probar el Panel

1. Ve a `https://tu-app.vercel.app/admin`
2. Ingresa tu API Key
3. ¡Listo!

---

## 🔒 Seguridad

### ✅ Implementado:

1. **Autenticación con API Key**: Todas las peticiones requieren la clave
2. **Validación en backend**: El servidor verifica la API Key en cada petición
3. **Almacenamiento local**: La clave se guarda solo en el navegador del usuario
4. **HTTPS**: Vercel y Render usan HTTPS automáticamente

### ⚠️ Recomendaciones:

1. **Usa una clave fuerte**: Mínimo 20 caracteres, letras, números y símbolos
2. **No la compartas**: Solo tú debes conocer la API Key
3. **Cámbiala periódicamente**: Cada 3-6 meses
4. **No la subas a GitHub**: Ya está en variables de entorno

---

## 📊 Archivos Creados

### Backend:
- `backend/src/routes/admin.ts` - Endpoints de administración
  - GET/POST/PUT/DELETE para asegurados
  - GET/POST/PUT/DELETE para empresas

### Frontend:
- `frontend/src/App.tsx` - Enrutamiento principal
- `frontend/src/PublicApp.tsx` - App pública
- `frontend/src/components/AdminLogin.tsx` - Login
- `frontend/src/components/AdminLogin.css` - Estilos login
- `frontend/src/components/AdminPanel.tsx` - Panel principal
- `frontend/src/components/AdminPanel.css` - Estilos panel
- `frontend/src/components/AseguradosManager.tsx` - Gestión asegurados
- `frontend/src/components/AseguradosManager.css` - Estilos gestores
- `frontend/src/components/EmpresasManager.tsx` - Gestión empresas
- `frontend/src/services/adminApi.ts` - Cliente API

---

## 🎯 Funcionalidades Destacadas

### Formulario Dinámico de Pólizas
- Agrega/quita pólizas dinámicamente
- Cada póliza tiene su propio formulario
- Validación de fechas
- Tipos predefinidos (SCTR Salud/Pensión)

### Validaciones Inteligentes
- DNI: Exactamente 8 dígitos
- RUC: Exactamente 11 dígitos
- Campos requeridos marcados con *
- Mensajes de error claros

### Estados de UI
- Loading spinners
- Mensajes de éxito (verde)
- Mensajes de error (rojo)
- Animaciones suaves

### Responsive Design
- Funciona en móviles
- Sidebar se adapta
- Tablas scrolleables
- Modales centrados

---

## 🆘 Solución de Problemas

### "No autorizado" al intentar acceder
→ Verifica que la API Key sea correcta
→ Verifica que la variable `ADMIN_API_KEY` esté en Render

### No puedo eliminar una empresa
→ Solo se pueden eliminar empresas sin pólizas asociadas
→ Primero elimina las pólizas o asegurados relacionados

### El panel no carga
→ Verifica que el backend esté funcionando
→ Revisa la consola del navegador (F12)
→ Verifica que `VITE_API_URL` esté configurado en Vercel

### Los cambios no se reflejan
→ Haz hard refresh (Ctrl + Shift + R)
→ Limpia el localStorage
→ Cierra sesión y vuelve a entrar

---

## 💡 Próximas Mejoras (Opcionales)

Si quieres expandir el panel en el futuro, podrías agregar:

1. **Gestión de Pólizas Independiente**: Editar/eliminar pólizas sin tocar al asegurado
2. **Búsqueda y Filtros**: Buscar por DNI, nombre, RUC
3. **Exportar a Excel**: Descargar datos en formato Excel
4. **Estadísticas Avanzadas**: Gráficos de pólizas activas/vencidas
5. **Historial de Cambios**: Log de quién modificó qué
6. **Múltiples Usuarios**: Diferentes niveles de acceso

---

## ✅ Checklist de Deployment

- [ ] Código subido a GitHub
- [ ] Variable `ADMIN_API_KEY` configurada en Render
- [ ] Deploy automático completado en Vercel y Render
- [ ] Panel accesible en `/admin`
- [ ] Login funciona correctamente
- [ ] Puedes crear asegurados
- [ ] Puedes crear empresas
- [ ] Puedes editar y eliminar

---

**¡Tu panel de administración está listo! 🎉**

Ahora puedes gestionar todos los datos de tu aplicación desde una interfaz web moderna y elegante, sin necesidad de acceso Shell o comandos de terminal.
