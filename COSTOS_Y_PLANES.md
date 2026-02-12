# 💰 Costos y Limitaciones de Render y Vercel (Plan Gratuito)

## ✅ Resumen Rápido

**SÍ, tu proyecto puede correr GRATIS indefinidamente** en Render y Vercel, pero con algunas limitaciones.

---

## 🆓 Vercel (Frontend)

### Plan Gratuito - Hobby

✅ **Completamente GRATIS para siempre**

### Límites del Plan Gratuito:

| Característica | Límite Gratuito |
|----------------|-----------------|
| **Deployments** | Ilimitados |
| **Bandwidth** | 100 GB/mes |
| **Build Time** | 6,000 minutos/mes |
| **Proyectos** | Ilimitados |
| **Dominios personalizados** | Ilimitados |
| **SSL/HTTPS** | ✅ Incluido |
| **Colaboradores** | Solo tú |

### ¿Qué significa esto para tu proyecto?

- **100 GB de bandwidth/mes** = Aproximadamente **1,000,000 de visitas** al mes (asumiendo 100 KB por página)
- Para un proyecto pequeño/mediano, **NUNCA alcanzarás este límite**
- **Deployments ilimitados**: Puedes actualizar tu app cuantas veces quieras

### 🚨 Limitaciones:

1. **Solo para uso personal/hobby** (no comercial a gran escala)
2. **No puedes tener colaboradores** en el plan gratuito
3. Si excedes 100 GB de bandwidth, Vercel te pedirá actualizar al plan Pro ($20/mes)

### 💡 Conclusión Vercel:
**Tu frontend estará GRATIS para siempre** a menos que tengas millones de visitas.

---

## 🆓 Render (Backend)

### Plan Gratuito - Free

✅ **GRATIS para siempre**, pero con limitaciones importantes

### Límites del Plan Gratuito:

| Característica | Límite Gratuito |
|----------------|-----------------|
| **Servicios Web** | Ilimitados |
| **RAM** | 512 MB |
| **CPU** | Compartido |
| **Bandwidth** | 100 GB/mes |
| **Build Time** | 500 minutos/mes |
| **Inactividad** | ⚠️ Se "duerme" después de 15 min |
| **Tiempo de respuesta** | ⚠️ 30-60 seg al "despertar" |
| **Base de datos** | SQLite (archivo local) |
| **Shell/SSH** | ❌ NO disponible |

### ⚠️ Limitación MÁS IMPORTANTE: "Sleep" (Dormir)

**¿Qué pasa?**
- Si tu API no recibe peticiones durante **15 minutos**, Render la "duerme"
- La próxima petición tardará **30-60 segundos** en responder (mientras "despierta")
- Después de despertar, funciona normal

**Impacto en tu proyecto:**
- Si un usuario busca un DNI después de 15 min de inactividad, esperará ~30-60 seg
- Luego de eso, todo funciona rápido
- Si hay actividad constante, no se duerme

### 🔄 Soluciones al "Sleep":

#### Opción 1: Aceptarlo (Gratis)
- Para proyectos de bajo tráfico, es aceptable
- Los usuarios esperarán un poco la primera vez

#### Opción 2: "Ping" Automático (Gratis)
- Usar un servicio como **UptimeRobot** (gratis) para hacer ping cada 5 minutos
- Mantiene tu API "despierta"
- **Limitación**: Render detecta esto y puede limitarte

#### Opción 3: Upgrade a Render Starter ($7/mes)
- Tu API NUNCA se duerme
- 512 MB RAM garantizados
- Mejor rendimiento

### 💡 Conclusión Render:
**Tu backend estará GRATIS para siempre**, pero con la molestia del "sleep" después de 15 min de inactividad.

---

## 📊 Comparación de Planes

### Vercel

| Plan | Precio | Bandwidth | Build Time | Colaboradores |
|------|--------|-----------|------------|---------------|
| **Hobby** | **GRATIS** | 100 GB/mes | 6,000 min/mes | Solo tú |
| **Pro** | $20/mes | 1 TB/mes | Ilimitado | Ilimitados |
| **Enterprise** | Custom | Custom | Custom | Custom |

### Render

| Plan | Precio | RAM | Sleep | Build Time |
|------|--------|-----|-------|------------|
| **Free** | **GRATIS** | 512 MB | ✅ Sí (15 min) | 500 min/mes |
| **Starter** | $7/mes | 512 MB | ❌ No | 500 min/mes |
| **Standard** | $25/mes | 2 GB | ❌ No | 1,000 min/mes |
| **Pro** | $85/mes | 4 GB | ❌ No | 2,000 min/mes |

---

## 🎯 Recomendaciones para Tu Proyecto

### Para Empezar (100% GRATIS):

✅ **Vercel Free** + **Render Free**
- Costo: **$0/mes**
- Perfecto para: Proyectos personales, demos, portafolio
- Limitación principal: API se duerme después de 15 min

### Si Quieres Mejor Rendimiento:

✅ **Vercel Free** + **Render Starter**
- Costo: **$7/mes**
- API nunca se duerme
- Respuesta instantánea siempre
- Perfecto para: Proyectos pequeños con usuarios reales

### Si Crece Mucho:

✅ **Vercel Pro** + **Render Standard**
- Costo: **$45/mes** ($20 + $25)
- Mucho más bandwidth y recursos
- Perfecto para: Aplicaciones con miles de usuarios

---

## 🔍 Alternativas Gratuitas

### Para Backend (alternativas a Render):

1. **Railway** (Free tier)
   - $5 de crédito gratis/mes
   - No se duerme
   - Cuando se acaba el crédito, se pausa hasta el próximo mes

2. **Fly.io** (Free tier)
   - 3 VMs pequeñas gratis
   - No se duerme
   - 160 GB bandwidth/mes

3. **Cyclic** (Free tier)
   - Ilimitado
   - No se duerme
   - Limitado a Node.js

### Para Frontend (alternativas a Vercel):

1. **Netlify** (Free tier)
   - Similar a Vercel
   - 100 GB bandwidth/mes
   - Build ilimitados

2. **Cloudflare Pages** (Free tier)
   - Bandwidth ilimitado
   - Builds ilimitados
   - Muy rápido

---

## 💡 Mi Recomendación

### Fase 1: Desarrollo y Pruebas (Ahora)
**Vercel Free + Render Free**
- Costo: $0/mes
- Suficiente para probar y mostrar tu proyecto

### Fase 2: Producción con Usuarios Reales
**Vercel Free + Render Starter**
- Costo: $7/mes
- Elimina el problema del "sleep"
- Mejor experiencia de usuario

### Fase 3: Crecimiento
**Vercel Pro + Render Standard**
- Costo: $45/mes
- Solo cuando tengas muchos usuarios y necesites más recursos

---

## 🆘 ¿Cuándo Necesitas Pagar?

### Vercel:
- Cuando superes 100 GB de bandwidth/mes (muy difícil para proyectos pequeños)
- Cuando necesites colaboradores
- Cuando sea un proyecto comercial grande

### Render:
- Cuando el "sleep" de 15 min sea molesto para tus usuarios
- Cuando necesites más de 512 MB de RAM
- Cuando necesites acceso Shell/SSH

---

## ✅ Conclusión Final

**SÍ, tu proyecto puede correr GRATIS para siempre** en Vercel y Render.

**Limitaciones principales:**
1. ✅ **Vercel**: Prácticamente ninguna para proyectos pequeños
2. ⚠️ **Render**: API se duerme después de 15 min de inactividad

**Costo para eliminar la limitación principal:**
- **$7/mes** (Render Starter) para que tu API nunca se duerma

**¿Vale la pena pagar?**
- Si es solo para ti o amigos: **NO, usa el plan gratuito**
- Si tienes usuarios reales que esperan respuestas rápidas: **SÍ, paga $7/mes**

---

## 📞 Recursos

- **Vercel Pricing**: https://vercel.com/pricing
- **Render Pricing**: https://render.com/pricing
- **UptimeRobot** (ping gratis): https://uptimerobot.com/

---

**¡Tu proyecto está configurado para correr GRATIS! 🎉**

Si en el futuro decides mejorar el rendimiento, solo necesitas $7/mes para Render Starter.
