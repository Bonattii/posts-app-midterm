require('dotenv').config();
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';

import { userRoutes } from './modules/user/user.route';
import { postRoutes } from './modules/post/post.route';
import { userSchemas } from './modules/user/user.schema';
import { postSchemas } from './modules/post/post.schema';

// Initialize the server and export to be used on the controllers
export const fastify = Fastify({ logger: true });

// Healthcheck route
fastify.get('/healthcheck', async () => {
  return { status: 'ok' };
});

// Register cors
fastify.register(cors);

// Register jwt into the server
fastify.register(jwt, {
  secret: process.env.SECRET!
});

// Customize the core fastify object to have the authenticate
fastify.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.send(error);
    }
  }
);

// Put the server to listen to the port 3333
async function bootstrap() {
  // Register the schemas into the server
  for (const schema of [...userSchemas, ...postSchemas]) {
    fastify.addSchema(schema);
  }

  // Register the routes
  await fastify.register(userRoutes, { prefix: 'api/users' });
  await fastify.register(postRoutes, { prefix: 'api/posts' });

  await fastify.listen({
    port: (process.env.PORT as unknown as number) || 3333,
    host: '0.0.0.0'
  });
}

bootstrap();
