import express from 'express';
import cors from 'cors';
import whatsappRoutes from './routes/AllRoutes.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: "PDS WhatsApp API" });
});

app.use('/api', whatsappRoutes);

export default app;