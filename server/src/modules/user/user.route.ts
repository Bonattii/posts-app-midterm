import { FastifyInstance } from 'fastify';

import { $ref } from './user.schema';
import { loginUserHandler, registerUserHandler } from './user.controller';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema')
        }
      }
    },
    registerUserHandler
  );

  fastify.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          200: $ref('loginResponseSchema')
        }
      }
    },
    loginUserHandler
  );
}
