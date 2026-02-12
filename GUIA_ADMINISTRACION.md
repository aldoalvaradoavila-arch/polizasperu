# 📚 Guía de Administración de Asegurados

## 🎯 Opciones para Agregar Datos sin Shell

Ya que Render Free no permite acceso a Shell, he creado **endpoints de API** para que puedas gestionar los asegurados desde cualquier lugar.

---

## 🔐 Configuración Inicial

### Paso 1: Agregar API Key de Administración

1. Ve a Render Dashboard: https://dashboard.render.com/
2. Selecciona tu servicio `polizasperu-api`
3. Ve a **Environment**
4. Agrega una nueva variable:
   ```
   Key: ADMIN_API_KEY
   Value: MiClaveSecretaSuperSegura2026
   ```
   (Usa una clave segura y guárdala bien)
5. Click **"Save Changes"**
6. El servicio se reiniciará automáticamente

---

## 📡 Endpoints Disponibles

### Base URL
```
https://polizasperu-api.onrender.com/api/v1/admin
```

### Autenticación
Todos los endpoints requieren el header:
```
x-api-key: MiClaveSecretaSuperSegura2026
```

---

## 🛠️ Operaciones

### 1. Crear Asegurado

**Endpoint:** `POST /api/v1/admin/asegurados`

**Headers:**
```
Content-Type: application/json
x-api-key: MiClaveSecretaSuperSegura2026
```

**Body (JSON):**
```json
{
  "dni": "12345678",
  "nombres": "MARIA ELENA",
  "apellido_paterno": "GARCIA",
  "apellido_materno": "LOPEZ",
  "polizas": [
    {
      "tipo_seguro": "SCTR_SALUD",
      "numero_contrato_poliza": "808407",
      "fecha_inicio": "2026-02-12",
      "fecha_fin": "2026-12-31"
    },
    {
      "tipo_seguro": "SCTR_PENSION",
      "numero_contrato_poliza": "9000241027",
      "fecha_inicio": "2026-02-12",
      "fecha_fin": "2026-12-31"
    }
  ]
}
```

**Respuesta exitosa (201):**
```json
{
  "mensaje": "Asegurado creado exitosamente",
  "asegurado": {
    "id": 4,
    "dni": "12345678",
    "nombres": "MARIA ELENA",
    "apellido_paterno": "GARCIA",
    "apellido_materno": "LOPEZ"
  }
}
```

---

### 2. Listar Todos los Asegurados

**Endpoint:** `GET /api/v1/admin/asegurados`

**Headers:**
```
x-api-key: MiClaveSecretaSuperSegura2026
```

**Respuesta exitosa (200):**
```json
{
  "total": 3,
  "asegurados": [
    {
      "id": 1,
      "dni": "74317179",
      "nombres": "RICARDO CRISTIAN",
      "apellido_paterno": "MUÑOZ",
      "apellido_materno": "CARRILLO",
      "polizas": [...]
    },
    ...
  ]
}
```

---

### 3. Actualizar Asegurado

**Endpoint:** `PUT /api/v1/admin/asegurados/:dni`

**Headers:**
```
Content-Type: application/json
x-api-key: MiClaveSecretaSuperSegura2026
```

**Body (JSON):**
```json
{
  "nombres": "MARIA",
  "apellido_paterno": "GARCIA",
  "apellido_materno": "LOPEZ"
}
```

**Ejemplo:**
```
PUT /api/v1/admin/asegurados/12345678
```

---

### 4. Eliminar Asegurado

**Endpoint:** `DELETE /api/v1/admin/asegurados/:dni`

**Headers:**
```
x-api-key: MiClaveSecretaSuperSegura2026
```

**Ejemplo:**
```
DELETE /api/v1/admin/asegurados/12345678
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Asegurado eliminado exitosamente",
  "dni": "12345678"
}
```

---

## 💻 Cómo Usar los Endpoints

### Opción 1: Usando Postman (Recomendado para principiantes)

1. Descarga Postman: https://www.postman.com/downloads/
2. Crea una nueva Request
3. Configura:
   - **Method**: POST
   - **URL**: `https://polizasperu-api.onrender.com/api/v1/admin/asegurados`
   - **Headers**: 
     - `Content-Type: application/json`
     - `x-api-key: MiClaveSecretaSuperSegura2026`
   - **Body** → **raw** → **JSON**: Pega el JSON del asegurado
4. Click **Send**

### Opción 2: Usando PowerShell

```powershell
# Crear asegurado
$headers = @{
    "Content-Type" = "application/json"
    "x-api-key" = "MiClaveSecretaSuperSegura2026"
}

$body = @{
    dni = "12345678"
    nombres = "MARIA ELENA"
    apellido_paterno = "GARCIA"
    apellido_materno = "LOPEZ"
    polizas = @(
        @{
            tipo_seguro = "SCTR_SALUD"
            numero_contrato_poliza = "808407"
            fecha_inicio = "2026-02-12"
            fecha_fin = "2026-12-31"
        },
        @{
            tipo_seguro = "SCTR_PENSION"
            numero_contrato_poliza = "9000241027"
            fecha_inicio = "2026-02-12"
            fecha_fin = "2026-12-31"
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "https://polizasperu-api.onrender.com/api/v1/admin/asegurados" -Method POST -Headers $headers -Body $body
```

### Opción 3: Usando cURL (Git Bash o Linux)

```bash
curl -X POST https://polizasperu-api.onrender.com/api/v1/admin/asegurados \
  -H "Content-Type: application/json" \
  -H "x-api-key: MiClaveSecretaSuperSegura2026" \
  -d '{
    "dni": "12345678",
    "nombres": "MARIA ELENA",
    "apellido_paterno": "GARCIA",
    "apellido_materno": "LOPEZ",
    "polizas": [
      {
        "tipo_seguro": "SCTR_SALUD",
        "numero_contrato_poliza": "808407",
        "fecha_inicio": "2026-02-12",
        "fecha_fin": "2026-12-31"
      }
    ]
  }'
```

---

## 🔒 Seguridad

### ⚠️ IMPORTANTE

1. **NUNCA compartas tu `ADMIN_API_KEY`** públicamente
2. **NO la subas a GitHub** (está en variables de entorno de Render)
3. **Cámbiala periódicamente** por seguridad
4. **Solo úsala desde lugares seguros** (tu PC, Postman, etc.)

### Recomendaciones

- Usa una clave larga y compleja
- No uses la clave de ejemplo (`tu-clave-secreta-aqui`)
- Guarda la clave en un lugar seguro (gestor de contraseñas)

---

## 📊 Ejemplos de Datos

### Asegurado con SCTR Salud y Pensión
```json
{
  "dni": "87654321",
  "nombres": "JUAN CARLOS",
  "apellido_paterno": "PEREZ",
  "apellido_materno": "RODRIGUEZ",
  "polizas": [
    {
      "tipo_seguro": "SCTR_SALUD",
      "numero_contrato_poliza": "808408",
      "fecha_inicio": "2026-01-01",
      "fecha_fin": "2026-12-31"
    },
    {
      "tipo_seguro": "SCTR_PENSION",
      "numero_contrato_poliza": "9000241028",
      "fecha_inicio": "2026-01-01",
      "fecha_fin": "2026-12-31"
    }
  ]
}
```

### Asegurado solo con SCTR Salud
```json
{
  "dni": "11223344",
  "nombres": "ANA MARIA",
  "apellido_paterno": "TORRES",
  "apellido_materno": "SILVA",
  "polizas": [
    {
      "tipo_seguro": "SCTR_SALUD",
      "numero_contrato_poliza": "808409",
      "fecha_inicio": "2026-02-01",
      "fecha_fin": "2027-01-31"
    }
  ]
}
```

---

## 🆘 Solución de Problemas

### Error 401: "No autorizado"
→ Verifica que el header `x-api-key` sea correcto

### Error 409: "Ya existe un asegurado con ese DNI"
→ El DNI ya está registrado. Usa el endpoint PUT para actualizar o DELETE para eliminar

### Error 400: "DNI inválido"
→ El DNI debe tener exactamente 8 dígitos numéricos

### Error 500: "Error interno del servidor"
→ Revisa los logs en Render Dashboard

---

## 📝 Próximos Pasos

Si quieres una interfaz web para gestionar los datos más fácilmente, puedo crear:
1. Un panel de administración simple en el frontend
2. Una página protegida con contraseña
3. Formularios para agregar/editar/eliminar asegurados

¿Te gustaría que cree esto?

---

**¡Ahora puedes gestionar tu base de datos desde cualquier lugar! 🚀**
