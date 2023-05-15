import Fastify from 'fastify';
import { app } from './app/app';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { connectToDatabase } from './database';

async function startServer() {
  dotenv.config({
    path: path.resolve(fs.realpathSync(__dirname), '../.env.local'),
  });

  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  await connectToDatabase();

  const server = Fastify({
    logger: true,
  });

  server.register(app);

  server.listen({ port, host }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    } else {
      console.log(`[ ready ] http://${host}:${port}`);
    }
  });
}

startServer();
