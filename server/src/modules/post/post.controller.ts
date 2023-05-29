import { z } from 'zod';
import { FastifyRequest } from 'fastify';

import { CreatePostInput } from './post.schema';
import { createPost, getPostById, getPosts } from './post.service';

export async function createPostHandler(
  request: FastifyRequest<{ Body: CreatePostInput }>
) {
  const post = await createPost({
    ...request.body,
    userId: request.user.id
  });

  return post;
}

export async function getPostsHandler(request: FastifyRequest) {
  const posts = await getPosts();

  return posts;
}

export async function getPostByIdHandler(request: FastifyRequest) {
  const getPostByIdParams = z.object({
    id: z.string()
  });

  const { id } = getPostByIdParams.parse(request.params);

  const post = await getPostById(id);

  return post;
}
