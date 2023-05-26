require('dotenv').config();
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';

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
  await fastify.listen({
    port: (process.env.PORT as unknown as number) || 3333,
    host: '0.0.0.0'
  });
}

bootstrap();
