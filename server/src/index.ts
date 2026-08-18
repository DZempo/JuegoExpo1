import cors from 'cors';
import express from 'express';
import aiConfigRoutes from './routes/aiConfig.routes';
import charactersRoutes from './routes/characters.routes';
import finalTextsRoutes from './routes/finalTexts.routes';

const app = express();
// Puerto fijo: no se lee de process.env.PORT para evitar colisión con el puerto
// que las herramientas de desarrollo/preview puedan inyectar para el cliente (Vite).
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/characters', charactersRoutes);
app.use('/api/ai-config', aiConfigRoutes);
app.use('/api/final-text', finalTextsRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`[server] Sé una IA por un día — API escuchando en http://localhost:${PORT}`);
});
