# ✅ Nueva Funcionalidad: Gestión de Asegurados por Empresa

## 🎉 ¡Funcionalidad Implementada!

Se ha agregado la capacidad de **asociar asegurados existentes a empresas** directamente desde la gestión de empresas.

---

## 🆕 ¿Qué se agregó?

### 1. **Botón "Ver Asegurados" en la Tabla de Empresas**
- Cada empresa ahora tiene un botón morado con ícono de usuarios
- Al hacer click, se abre un modal con los asegurados asociados a esa empresa

### 2. **Modal de Gestión de Asegurados por Empresa**
- **Ver lista** de asegurados asociados a la empresa
- **Asociar** nuevos asegurados de la lista existente
- **Desasociar** asegurados (elimina sus pólizas con esa empresa)
- Contador de asegurados asociados

### 3. **Modal de Asociación**
- Selecciona un asegurado de la lista de disponibles
- Crea una póliza para ese asegurado en la empresa
- Campos:
  - Asegurado (dropdown con DNI y nombre)
  - Tipo de Seguro (SCTR Salud / SCTR Pensión)
  - Número de Póliza
  - Fecha Inicio
  - Fecha Fin

---

## 🎯 Cómo Usar la Nueva Funcionalidad

### Paso 1: Acceder a Gestión de Empresas
1. Ve al panel de administración
2. Click en "Empresas" en el sidebar

### Paso 2: Ver Asegurados de una Empresa
1. En la tabla de empresas, busca la empresa que quieres gestionar
2. Click en el botón **morado con ícono de usuarios** (Ver Asegurados)
3. Se abrirá un modal con la lista de asegurados asociados

### Paso 3: Asociar un Nuevo Asegurado
1. En el modal de asegurados, click en **"Asociar Asegurado"**
2. Selecciona el asegurado del dropdown
   - Solo aparecen asegurados que NO están ya asociados
3. Completa los datos de la póliza:
   - Tipo de Seguro
   - Número de Póliza
   - Fechas de inicio y fin
4. Click en **"Asociar"**
5. ¡Listo! El asegurado ahora tiene una póliza con esa empresa

### Paso 4: Desasociar un Asegurado
1. En la lista de asegurados de la empresa
2. Click en el botón de **eliminar** (rojo) junto al asegurado
3. Confirma la acción
4. Se eliminarán **todas las pólizas** de ese asegurado con esa empresa

---

## 🔧 Endpoints API Nuevos

### 1. **GET** `/api/v1/admin/empresas/:ruc/asegurados`
Lista todos los asegurados asociados a una empresa.

**Respuesta**:
```json
{
  "empresa": {
    "ruc": "20123456789",
    "razon_social": "CONSTRUCTORA LIMA SAC"
  },
  "total": 5,
  "asegurados": [
    {
      "id": 1,
      "dni": "12345678",
      "nombres": "JUAN CARLOS",
      "apellido_paterno": "PÉREZ",
      "apellido_materno": "GARCÍA",
      "polizas": [
        {
          "id": 1,
          "tipo_seguro": "SCTR_SALUD",
          "numero_contrato_poliza": "808407",
          "fecha_inicio": "2024-01-01",
          "fecha_fin": "2024-12-31"
        }
      ]
    }
  ]
}
```

### 2. **POST** `/api/v1/admin/empresas/:ruc/asegurados`
Asocia un asegurado existente a una empresa creando una póliza.

**Body**:
```json
{
  "dni": "12345678",
  "tipo_seguro": "SCTR_SALUD",
  "numero_contrato_poliza": "808407",
  "fecha_inicio": "2024-01-01",
  "fecha_fin": "2024-12-31"
}
```

**Respuesta**:
```json
{
  "mensaje": "Asegurado asociado exitosamente a la empresa",
  "poliza": { ... }
}
```

### 3. **DELETE** `/api/v1/admin/empresas/:ruc/asegurados/:dni`
Elimina todas las pólizas de un asegurado en una empresa específica.

**Respuesta**:
```json
{
  "mensaje": "Se eliminaron 2 póliza(s) del asegurado en esta empresa",
  "polizas_eliminadas": 2
}
```

---

## 🎨 Características de Diseño

### Botón "Ver Asegurados"
- Color morado (#9b59b6)
- Ícono de usuarios
- Hover con fondo morado claro (#f3e5f5)

### Modal de Asegurados
- Modal más grande (1000px de ancho)
- Lista de asegurados con DNI, nombres y cantidad de pólizas
- Botón "Asociar Asegurado" destacado
- Estado vacío con mensaje y botón de acción

### Modal de Asociación
- Dropdown inteligente que solo muestra asegurados disponibles
- Mensaje de advertencia si todos ya están asociados
- Validación de campos requeridos
- Fechas prellenadas (hoy y +1 año)

---

## 🔍 Validaciones Implementadas

### Backend:
1. ✅ Verifica que la empresa exista
2. ✅ Verifica que el asegurado exista
3. ✅ Previene duplicados: No permite crear dos pólizas del mismo tipo para el mismo asegurado en la misma empresa
4. ✅ Todos los campos son requeridos

### Frontend:
1. ✅ Solo muestra asegurados que NO están ya asociados
2. ✅ Deshabilita el botón de asociar si no hay asegurados disponibles
3. ✅ Confirmación antes de desasociar
4. ✅ Mensajes de éxito y error claros

---

## 📊 Flujo de Trabajo Típico

### Escenario 1: Nueva Empresa con Trabajadores Existentes
1. Creas una nueva empresa (ej: "CONSTRUCTORA NORTE SAC")
2. Click en "Ver Asegurados" de esa empresa
3. Click en "Asociar Asegurado"
4. Seleccionas trabajadores existentes uno por uno
5. Para cada uno, creas su póliza SCTR

### Escenario 2: Asegurado Cambia de Empresa
1. Ve a la empresa antigua
2. Click en "Ver Asegurados"
3. Desasocia al trabajador (elimina sus pólizas)
4. Ve a la empresa nueva
5. Click en "Ver Asegurados"
6. Asocia al trabajador con nueva póliza

### Escenario 3: Asegurado Trabaja en Múltiples Empresas
1. El asegurado ya existe en el sistema
2. Ve a cada empresa
3. Asócialo creando pólizas diferentes
4. El asegurado tendrá múltiples pólizas (una por empresa)

---

## 🆚 Diferencia con Gestión de Asegurados

### Gestión de Asegurados:
- Crea **nuevos asegurados** con sus datos personales
- Agrega pólizas al momento de crear
- Edita datos personales
- Elimina asegurados completos

### Gestión de Empresas → Ver Asegurados:
- **Asocia asegurados existentes** a empresas
- Crea pólizas para asegurados ya registrados
- No modifica datos personales
- Solo elimina la relación (pólizas) con esa empresa específica

---

## 📁 Archivos Creados/Modificados

### Backend:
- ✅ `backend/src/routes/admin.ts` - 3 nuevos endpoints

### Frontend:
- ✅ `frontend/src/services/adminApi.ts` - 3 nuevos métodos
- ✅ `frontend/src/components/EmpresasManager.tsx` - Botón y modal
- ✅ `frontend/src/components/EmpresaAseguradosModal.tsx` - **NUEVO** componente
- ✅ `frontend/src/components/AseguradosManager.css` - Estilos adicionales

---

## ✅ Beneficios

1. **Flexibilidad**: Asigna trabajadores a múltiples empresas fácilmente
2. **Eficiencia**: No necesitas recrear asegurados para cada empresa
3. **Claridad**: Ve rápidamente qué asegurados tiene cada empresa
4. **Control**: Gestiona pólizas por empresa de forma independiente
5. **Prevención de Errores**: No permite duplicados del mismo tipo de póliza

---

## 🚀 Deployment

Los cambios ya están en GitHub y se desplegarán automáticamente:

```bash
Commit: "Add: Gestión de asegurados por empresa - Asociar y desasociar asegurados"
```

**No se requiere configuración adicional** - Los nuevos endpoints usan la misma autenticación (API Key) que los existentes.

---

## 🎯 Próximos Pasos Sugeridos (Opcional)

Si quieres expandir esta funcionalidad en el futuro:

1. **Editar Pólizas**: Modificar fechas o número de póliza sin eliminar
2. **Filtros**: Buscar asegurados por DNI o nombre
3. **Exportar**: Descargar lista de asegurados de una empresa en Excel
4. **Estadísticas**: Ver gráficos de pólizas activas/vencidas por empresa
5. **Notificaciones**: Alertas de pólizas próximas a vencer

---

**¡La funcionalidad está lista y desplegada! 🎉**

Ahora puedes gestionar las relaciones entre empresas y asegurados de forma mucho más flexible y eficiente.
