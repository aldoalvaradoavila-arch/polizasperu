import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { aseguradosRouter } from './routes/asegurados';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS — permitir frontend en desarrollo y producción
const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET'],
}));

// Rate limiting — 100 peticiones por 15 minutos por IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        error: 'Demasiadas solicitudes. Por favor, intente nuevamente en unos minutos.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);
app.use(express.json());

// Rutas
app.use('/api/v1/asegurados', aseguradosRouter);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 PolizasPeru API corriendo en http://localhost:${PORT}`);
});

export default app;
