import express, { Application } from 'express';
import cors from 'cors';
import { json } from 'express';
import pcfRoutes from './routes/pcfRouter';

const app: Application = express();
const port: number = 3001;

app.use(cors());
app.use(json()); // Middleware to parse JSON bodies

// Import routes
app.use('/api', pcfRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
