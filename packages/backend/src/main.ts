import Fastify from 'fastify';
import * as dotenv from 'dotenv';
import path from 'path';
import { PrismaClient, User } from '@prisma/client';
import fs from 'fs';
import { connectToDatabase } from './database';
import { ApolloServer } from 'apollo-server-fastify';
import { schema } from './modules';

const db = new PrismaClient(
  (false && { log: [{ emit: 'stdout', level: 'query' }] }) || {}
);

export interface ResolverContext {
  user?: User;
  models: Exclude<PrismaClient, 'connect' | 'disconnect' | 'on'>;
}

export const createContext =
  () => async (): Promise<ResolverContext | void> => {
    const context: ResolverContext = { models: db };
    return context;
  };

async function startServer() {
  dotenv.config({
    path: path.resolve(fs.realpathSync(__dirname), '../.env.local'),
  });

  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  // await connectToDatabase();

  const apolloServer = new ApolloServer({
    ...schema,
    debug: true,
    context: createContext(),
  });

  const server = Fastify({
    logger: true,
  });

  await apolloServer.start();

  server.register(apolloServer.createHandler());

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
