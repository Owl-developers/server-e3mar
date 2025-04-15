import express, { Request, Response } from 'express';

const app: express.Application = express();
const port: number = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Binyan!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});