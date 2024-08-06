import express from 'express';
import { appRouter } from './src/app.js';

const app = express();
appRouter(app);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
