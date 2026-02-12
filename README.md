# PolizasPeru — Sistema de Consulta de Seguros SCTR

[![Deploy Status](https://img.shields.io/badge/status-ready-brightgreen)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Aplicación web pública para consultar el Seguro Complementario de Trabajo de Riesgo (SCTR) por DNI.

## 🚀 Demo

- **Frontend**: [https://polizasperu.vercel.app](https://polizasperu.vercel.app) *(después del deployment)*
- **API**: [https://polizasperu-api.onrender.com](https://polizasperu-api.onrender.com) *(después del deployment)*

## 📋 Características

- ✅ Búsqueda de seguros por DNI (8 dígitos)
- ✅ Visualización de SCTR Salud y SCTR Pensión
- ✅ Estados dinámicos: VIGENTE / VENCIDO
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Animaciones y glassmorphism
- ✅ Rate limiting y validaciones
- ✅ Sin autenticación (acceso público)

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | Vite + React 18 + TypeScript + Tailwind CSS v4 |
| Backend | Node.js + Express + TypeScript + Prisma |
| Base de datos | SQLite (desarrollo) / PostgreSQL (producción) |
| Deployment | Vercel (frontend) + Render (backend) |

## 📦 Instalación Local

### Requisitos previos
- Node.js 18+ (LTS)
- npm 8+

### Backend

```bash
cd backend
npm install
npm run setup          # Crea BD + seed con datos de prueba
npm run dev            # Servidor en http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev            # App en http://localhost:5173
```

## 🧪 Datos de Prueba

| DNI | Nombre |
|-----|--------|
| 74317179 | RICARDO CRISTIAN MUÑOZ CARRILLO |
| 70494206 | JHOSTIN JEHOIAQUIM VILLANUEVA JAIMES |
| 70494184 | BRYAN GHARDICK VILLANUEVA JAIMES |
| 12345678 | MARIA ELENA GARCIA LOPEZ |

Todos con SCTR Salud + Pensión vigentes.

## 🗄️ Gestión de Datos

### Opción 1: Prisma Studio (GUI)
```bash
cd backend
npx prisma studio      # Abre en http://localhost:5555
```

### Opción 2: Script CLI
```bash
cd backend
npm run script agregar              # Agrega asegurado
npm run script eliminar 12345678    # Elimina por DNI
```

### Opción 3: Modificar seed
Edita `backend/prisma/seed.ts` y ejecuta:
```bash
npm run prisma:seed
```

## 🚀 Deployment a Producción

Sigue la guía completa en [DEPLOYMENT.md](DEPLOYMENT.md)

**Resumen rápido:**
1. Sube el código a GitHub
2. Deploy frontend en Vercel
3. Deploy backend en Render
4. Configura variables de entorno
5. ¡Listo! 🎉

## 📁 Estructura del Proyecto

```
Proyecto Scrt/
├── backend/                 # API REST
│   ├── prisma/
│   │   ├── schema.prisma    # Modelos de datos
│   │   └── seed.ts          # Datos iniciales
│   └── src/
│       ├── index.ts         # Express server
│       └── routes/
│           └── asegurados.ts # Endpoint de búsqueda
├── frontend/                # React SPA
│   └── src/
│       ├── components/      # UI components
│       ├── services/        # API client
│       └── App.tsx          # Main app
├── DEPLOYMENT.md            # Guía de deployment
└── SRS_PolizasPeru_v1.0.md # Especificación
```

## 📖 API Documentation

### `GET /api/v1/asegurados/buscar?dni={dni}`

**Parámetros:**
- `dni` (string, requerido): DNI de 8 dígitos numéricos

**Respuesta exitosa (200):**
```json
{
  "encontrado": true,
  "asegurado": {
    "nombres": "RICARDO CRISTIAN",
    "apellido_paterno": "MUÑOZ",
    "apellido_materno": "CARRILLO",
    "dni": "74317179"
  },
  "empresa": {
    "razon_social": "CARRILLO MUÑOZ RICARDO CRISTIAN",
    "ruc": "10743171794",
    "actividad": "ACTIVIDADES DE TELECOMUNICACIONES INALÁMBRICAS",
    "sede": "PRINCIPAL"
  },
  "polizas": [
    {
      "tipo": "SCTR_SALUD",
      "numero": "808407",
      "fecha_inicio": "2026-02-12",
      "fecha_fin": "2026-03-11",
      "estado": "ACTIVO"
    }
  ]
}
```

**No encontrado (200):**
```json
{
  "encontrado": false,
  "mensaje": "No se encontraron seguros registrados para el DNI ingresado."
}
```

**Error de validación (400):**
```json
{
  "error": "DNI inválido. Debe contener exactamente 8 dígitos numéricos."
}
```

## 🔒 Seguridad

- ✅ Rate limiting: 100 req/15min por IP
- ✅ CORS configurado
- ✅ Validación de entrada
- ✅ Sin exposición de datos sensibles
- ✅ HTTPS en producción

## 📄 Licencia

Este proyecto fue desarrollado según el SRS v1.0 para PolizasPeru S.A.

## 👨‍💻 Desarrollo

Desarrollado con ❤️ siguiendo el Decreto Supremo N° 003-98-SA (Perú)

---

**¿Preguntas?** Abre un issue en GitHub o contacta a contacto@polizasperu.pe
