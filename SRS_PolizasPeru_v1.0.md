# SRS — PolizasPeru: Sistema de Consulta de Seguros
**Versión:** 1.0 | **Fecha:** 12/02/2026 | **Estado:** Aprobado para desarrollo

---

## 1. Descripción del Sistema

Aplicación web pública (sin autenticación) que permite consultar si una persona tiene un Seguro Complementario de Trabajo de Riesgo (SCTR) activo, ingresando únicamente su DNI.

**Nombre comercial:** PolizasPeru  
**Marco legal:** Decreto Supremo N° 003-98-SA (Perú)  
**Ley de datos:** Ley N° 29733 — Protección de Datos Personales

---

## 2. Datos de Referencia (extraídos del documento SCTR original)

### Empresa contratante
| Campo | Valor |
|---|---|
| Razón social | CARRILLO MUÑOZ RICARDO CRISTIAN |
| RUC | 10743171794 |
| Actividad económica | ACTIVIDADES DE TELECOMUNICACIONES INALÁMBRICAS |
| Sede | PRINCIPAL |

### Contratos / Pólizas
| Tipo | Número | Aseguradora |
|---|---|---|
| SCTR - Salud | Contrato N° 808407 | PolizasPeru S.A. EPS |
| SCTR - Pensión | Póliza N° 9000241027 | PolizasPeru Seguros SA |

### Vigencia del seguro
- **Inicio:** 12/02/2026 00:00
- **Fin:** 11/03/2026 23:59
- **Regla de negocio:** los períodos son siempre de **exactamente 1 mes calendario**

### Asegurados registrados
| N° | Nombres | Ap. Paterno | Ap. Materno | DNI |
|---|---|---|---|---|
| 1 | RICARDO CRISTIAN | MUÑOZ | CARRILLO | 74317179 |
| 2 | JHOSTIN JEHOIAQUIM | VILLANUEVA | JAIMES | 70494206 |
| 3 | BRYAN GHARDICK | VILLANUEVA | JAIMES | 70494184 |

---

## 3. Requerimientos Funcionales

### RF — Búsqueda
| ID | Descripción | Prioridad |
|---|---|---|
| RF-01 | Campo de texto para ingresar DNI (máx. 8 dígitos numéricos) | ALTA |
| RF-02 | Validar que el DNI tenga exactamente 8 dígitos antes de buscar | ALTA |
| RF-03 | Botón "Buscar" + activación con tecla Enter | ALTA |
| RF-04 | Botón o acción para limpiar el campo y resetear resultados | MEDIA |
| RF-05 | Bloquear búsqueda vacía con mensaje de campo obligatorio | ALTA |

### RF — Resultado positivo (asegurado encontrado)
| ID | Descripción | Prioridad |
|---|---|---|
| RF-06 | Mostrar: nombres, apellido paterno, apellido materno, DNI | ALTA |
| RF-07 | Mostrar tipo(s) de seguro activos: SCTR Salud y/o SCTR Pensión, diferenciados visualmente | ALTA |
| RF-08 | Mostrar N° de contrato (Salud) y N° de póliza (Pensión) | ALTA |
| RF-09 | Mostrar fecha inicio y fecha fin de cobertura en formato DD/MM/AAAA | ALTA |
| RF-10 | Indicador visual de estado: **VIGENTE** (verde) o **VENCIDO** (rojo), calculado vs. fecha del sistema | ALTA |
| RF-11 | Mostrar actividad económica del contrato | MEDIA |
| RF-12 | Mostrar sede del contrato | MEDIA |
| RF-13 | Mostrar razón social y RUC de la empresa contratante | MEDIA |

### RF — Resultado negativo (no encontrado)
| ID | Descripción | Prioridad |
|---|---|---|
| RF-14 | Mostrar mensaje claro: "No se encontraron seguros registrados para el DNI ingresado" | ALTA |
| RF-15 | Sugerir verificar el número o contactar a PolizasPeru | MEDIA |

### RF — Pantalla principal
| ID | Descripción | Prioridad |
|---|---|---|
| RF-16 | Hero section con logo/nombre, título "Consulta tu Seguro SCTR" y buscador centrado | ALTA |
| RF-17 | Sección informativa sobre SCTR Salud y SCTR Pensión (coberturas) | MEDIA |
| RF-18 | Footer con datos de contacto y aviso legal | BAJA |

---

## 4. Requerimientos No Funcionales

| ID | Categoría | Requisito | Prioridad |
|---|---|---|---|
| RNF-01 | Usabilidad | Búsqueda completable en ≤ 3 interacciones | ALTA |
| RNF-02 | Responsivo | Funcional en desktop (≥1024px), tablet (768–1023px) y móvil (<768px) | ALTA |
| RNF-03 | Accesibilidad | Cumplir WCAG 2.1 nivel AA (contraste, teclado, ARIA) | MEDIA |
| RNF-04 | Idioma | Interfaz completamente en español (Perú) | ALTA |
| RNF-05 | Rendimiento | Resultado de búsqueda en ≤ 2 segundos | ALTA |
| RNF-06 | Rendimiento | Carga inicial ≤ 3 segundos en banda ancha | ALTA |
| RNF-07 | Concurrencia | Soportar ≥ 100 usuarios simultáneos sin degradación | MEDIA |
| RNF-08 | Seguridad | HTTPS obligatorio con TLS válido; redirigir HTTP → HTTPS | ALTA |
| RNF-09 | Anti-bots | Rate limiting o CAPTCHA para prevenir scraping masivo | ALTA |
| RNF-10 | Privacidad | No exponer campos sensibles innecesarios en respuestas API | ALTA |
| RNF-11 | Legal | Cumplir Ley N° 29733 de Protección de Datos Personales | ALTA |
| RNF-12 | Privacidad | No almacenar historial de búsquedas en cliente (sin cookies de tracking) | MEDIA |
| RNF-13 | Código | Arquitectura modular: capa UI / capa servicio / capa datos | ALTA |
| RNF-14 | Pruebas | Cobertura de pruebas ≥ 70% en lógica de negocio | MEDIA |
| RNF-15 | Escalabilidad | Arquitectura que permita escalar horizontalmente el backend | MEDIA |

---

## 5. Modelo de Datos

### Entidad: `Asegurado`
| Campo | Tipo | Notas |
|---|---|---|
| id_asegurado | UUID / Integer | PK |
| dni | String(8) | Clave de búsqueda principal, solo dígitos |
| nombres | String | Ej: "RICARDO CRISTIAN" |
| apellido_paterno | String | Ej: "MUÑOZ" |
| apellido_materno | String | Ej: "CARRILLO" |

### Entidad: `Empresa`
| Campo | Tipo | Notas |
|---|---|---|
| id_empresa | UUID / Integer | PK |
| razon_social | String | Ej: "CARRILLO MUÑOZ RICARDO CRISTIAN" |
| ruc | String(11) | Ej: "10743171794" |
| actividad_economica | String | Ej: "ACTIVIDADES DE TELECOMUNICACIONES INALÁMBRICAS" |
| sede | String | Ej: "PRINCIPAL" |

### Entidad: `Poliza`
| Campo | Tipo | Notas |
|---|---|---|
| id_poliza | UUID / Integer | PK |
| tipo_seguro | Enum | `SCTR_SALUD` \| `SCTR_PENSION` |
| numero_contrato_poliza | String | Salud: "808407" / Pensión: "9000241027" |
| fecha_inicio | Date | ISO: YYYY-MM-DD. Ej: 2026-02-12 |
| fecha_fin | Date | Siempre = fecha_inicio + 1 mes calendario |
| id_empresa | FK → Empresa | |
| id_asegurado | FK → Asegurado | |
| estado | Computed | `ACTIVO` si fecha_actual ≤ fecha_fin; `VENCIDO` si no |

---

## 6. API REST — Especificación del Endpoint Principal

```
GET /api/v1/asegurados/buscar?dni={dni}
```

### Parámetro
| Nombre | Tipo | Obligatorio | Validación |
|---|---|---|---|
| dni | string | Sí | Exactamente 8 dígitos numéricos |

### Respuesta 200 — Encontrado
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
    },
    {
      "tipo": "SCTR_PENSION",
      "numero": "9000241027",
      "fecha_inicio": "2026-02-12",
      "fecha_fin": "2026-03-11",
      "estado": "ACTIVO"
    }
  ]
}
```

### Respuesta 200 — No encontrado
```json
{
  "encontrado": false,
  "mensaje": "No se encontraron seguros registrados para el DNI ingresado."
}
```

### Respuesta 400 — Validación fallida
```json
{
  "error": "DNI inválido. Debe contener exactamente 8 dígitos numéricos."
}
```

---

## 7. Interfaz de Usuario — Estructura de Pantallas

### Pantalla principal (orden de secciones)
1. **Navbar** — Logo/nombre "PolizasPeru" + enlace a sección informativa
2. **Hero** — Título: *"Consulta tu Seguro SCTR"* + subtítulo descriptivo + tarjeta de búsqueda
3. **Tarjeta de búsqueda** — Input DNI + botón "Buscar" + texto de ayuda
4. **Sección de resultados** — oculta por defecto, se muestra tras búsqueda
5. **Sección informativa** — tarjetas SCTR Salud y SCTR Pensión con coberturas
6. **Footer** — contacto, aviso legal, política de privacidad

### Tarjeta de resultado positivo (bloques)
| Bloque | Contenido |
|---|---|
| Datos del asegurado | Nombre completo + DNI |
| Empresa contratante | Razón social + RUC |
| Actividad económica | Descripción de la actividad |
| SCTR - Salud | N° Contrato + fechas + badge VIGENTE/VENCIDO |
| SCTR - Pensión | N° Póliza + fechas + badge VIGENTE/VENCIDO |

### Guía de estilos
| Elemento | Especificación |
|---|---|
| Color primario | `#1A3C6E` (azul marino) |
| Color secundario | `#2D7DD2` (azul medio) |
| Estado VIGENTE | Badge verde `#0E9E6B` + ícono ✓ |
| Estado VENCIDO | Badge rojo `#C0392B` + ícono ⚠ |
| Tipografía | Inter o Roboto — body 14px / subtítulos 18px / títulos 24px+ |
| Espaciado | Sistema 8pt (8, 16, 24, 32, 48px) |
| Tarjetas | border-radius 12px + sombra suave |
| Framework UI | React 18+ con TypeScript + Tailwind CSS (recomendado) |

---

## 8. Stack Tecnológico Recomendado

| Capa | Tecnología |
|---|---|
| Frontend | React 18+ + TypeScript + Tailwind CSS |
| Backend | Node.js (Express/Fastify) o Python (FastAPI) |
| Base de datos | PostgreSQL o MySQL |
| ORM | Prisma (Node) o SQLAlchemy (Python) |
| Infraestructura | AWS / GCP / Vercel + PlanetScale |
| Seguridad | HTTPS/TLS + Cloudflare Turnstile o reCAPTCHA v3 |
| CI/CD | GitHub Actions |

---

## 9. Casos de Uso

### CU-01: Consultar seguro por DNI
- **Actor:** Usuario (sin autenticación)
- **Flujo principal:**
  1. Usuario accede a la URL
  2. Ingresa 8 dígitos de DNI
  3. Hace clic en "Buscar" o presiona Enter
  4. Sistema valida formato → consulta BD → muestra resultados
- **Flujo A (DNI con formato inválido):** muestra error de validación, no ejecuta búsqueda
- **Flujo B (DNI no existe):** muestra mensaje de no encontrado
- **Reqs:** RF-01 al RF-15

### CU-02: Visualizar sección informativa
- **Actor:** Usuario
- **Flujo:** desplaza la página → ve tarjetas de SCTR Salud y Pensión con coberturas
- **Reqs:** RF-17, RF-18

---

## 10. Criterios de Aceptación

| ID | Caso de prueba | Condición de aprobación |
|---|---|---|
| CA-01 | DNI válido existente | Datos + seguro + fechas en ≤ 2 seg |
| CA-02 | DNI válido no existente | Mensaje "no encontrado" sin errores |
| CA-03 | DNI con < 8 dígitos | Validación muestra error, no busca |
| CA-04 | DNI con letras/caracteres especiales | Campo rechaza en tiempo real |
| CA-05 | Vista móvil 375px | Sin scroll horizontal, todo legible |
| CA-06 | Estado ACTIVO vs VENCIDO | Badge refleja correctamente la fecha del sistema |
| CA-07 | Protocolo seguro | HTTP redirige a HTTPS automáticamente |
| **CA-08** | **DNI 74317179** | **Retorna MUÑOZ CARRILLO RICARDO CRISTIAN, SCTR Salud N°808407 y SCTR Pensión N°9000241027** |
| CA-09 | Campo vacío | Bloquea búsqueda con aviso de obligatoriedad |
| CA-10 | Carga simultánea | 100 usuarios concurrentes sin degradación |

---

## 11. Restricciones y Reglas de Negocio Clave

- ❌ **Sin autenticación** — acceso público total
- ❌ **Sin CRUD** — no se crean, editan ni eliminan pólizas desde la app web
- ✅ **Búsqueda solo por DNI** (8 dígitos numéricos exactos)
- ✅ **Períodos de seguro = siempre 1 mes calendario exacto**
- ✅ El campo `estado` se calcula dinámicamente comparando `fecha_fin` con la fecha actual del servidor
- ✅ Un asegurado puede tener ambos tipos de seguro (Salud + Pensión) bajo el mismo contrato/empresa

---

*PolizasPeru S.A. — Documento confidencial — v1.0 — 12/02/2026*
