require('dotenv').config();
import Fastify from 'fastify';
import cors from '@fastify/cors';

// Initialize the server and export to be used on the controllers
export const fastify = Fastify({ logger: true });

// Healthcheck route
fastify.get('/healthcheck', async () => {
  return { status: 'ok' };
});

// Register cors
fastify.register(cors);

// Put the server to listen to the port 3333
async function bootstrap() {
  await fastify.listen({
    port: (process.env.PORT as unknown as number) || 3333,
    host: '0.0.0.0'
  });
}

bootstrap();
