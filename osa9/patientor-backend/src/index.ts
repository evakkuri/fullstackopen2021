import express from 'express';
import pingRouter from './controllers/ping';

const app = express();
app.use(express.json());

const PORT = 3001;

app.use('/api/ping', pingRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});