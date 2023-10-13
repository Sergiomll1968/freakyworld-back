import express from 'express';
import cors from 'cors';
import './database.js';
import authMiddleware from './src/middlewares/auth.middleware.js';
import apiRouter from './src/api/router.js';

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cors({ origin: true }));
server.use(authMiddleware);
server.use(apiRouter);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
