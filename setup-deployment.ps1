# Script para inicializar Git y preparar para deployment
# Ejecutar desde la raíz del proyecto

Write-Host "🚀 Preparando proyecto para deployment..." -ForegroundColor Cyan

# 1. Inicializar Git
Write-Host "`n📦 Paso 1: Inicializando Git..." -ForegroundColor Yellow
git init
git add .
git commit -m "Initial commit - PolizasPeru SCTR application"

Write-Host "`n✅ Git inicializado" -ForegroundColor Green

# 2. Instrucciones para GitHub
Write-Host "`n📋 Paso 2: Crear repositorio en GitHub" -ForegroundColor Yellow
Write-Host "   1. Ve a: https://github.com/new" -ForegroundColor White
Write-Host "   2. Nombre del repo: polizasperu" -ForegroundColor White
Write-Host "   3. Descripción: Sistema de Consulta de Seguros SCTR" -ForegroundColor White
Write-Host "   4. Público o Privado (tu elección)" -ForegroundColor White
Write-Host "   5. NO inicialices con README (ya lo tienes)" -ForegroundColor White

# 3. Comandos para conectar con GitHub
Write-Host "`n📤 Paso 3: Conectar con GitHub" -ForegroundColor Yellow
Write-Host "   Ejecuta estos comandos (reemplaza TU_USUARIO):" -ForegroundColor White
Write-Host ""
Write-Host "   git remote add origin https://github.com/TU_USUARIO/polizasperu.git" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan

# 4. Deployment
Write-Host "`n🌐 Paso 4: Deploy a producción" -ForegroundColor Yellow
Write-Host "   Sigue la guía en DEPLOYMENT.md" -ForegroundColor White
Write-Host ""
Write-Host "   Resumen:" -ForegroundColor White
Write-Host "   • Frontend: Vercel (https://vercel.com)" -ForegroundColor Cyan
Write-Host "   • Backend: Render (https://render.com)" -ForegroundColor Cyan
Write-Host "   • BD: Turso o Railway (gratis)" -ForegroundColor Cyan

Write-Host "`n✨ ¡Listo! Tu proyecto está preparado para deployment" -ForegroundColor Green
Write-Host "   Lee DEPLOYMENT.md para instrucciones detalladas" -ForegroundColor White
