import { FastifyInstance } from 'fastify';

import { $ref } from './post.schema';
import {
  createPostHandler,
  getPostByIdHandler,
  getPostsHandler
} from './post.controller';

export async function postRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/',
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: $ref('createPostSchema'),
        response: {
          201: $ref('postResponseSchema')
        }
      }
    },
    createPostHandler
  );

  fastify.get(
    '/',
    {
      preHandler: [fastify.authenticate],
      schema: {
        response: { 201: $ref('postsResponseSchema') }
      }
    },
    getPostsHandler
  );

  fastify.get(
    '/:id',
    {
      preHandler: [fastify.authenticate],
      schema: { response: { 201: $ref('postResponseSchema') } }
    },
    getPostByIdHandler
  );
}
