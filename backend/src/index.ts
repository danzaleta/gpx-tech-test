// src/index.ts
import express from 'express';
import cors from 'cors';
import personRoutes from './routes/person.routes';

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors()); // Habilita CORS para permitir peticiones del frontend
app.use(express.json()); // Permite al servidor entender JSON

// Rutas
app.use('/api', personRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});