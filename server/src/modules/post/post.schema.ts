import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const postInput = {
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  categories: z.array(z.string())
};

const postGenerated = {
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
};

// Make a validation of the data that will be received to create a post
const createPostSchema = z.object({
  ...postInput
});

// Filter what the route should respond with
const postResponseSchema = z.object({
  ...postInput,
  ...postGenerated
});

// Return an array of posts
const postsResponseSchema = z.array(postResponseSchema);

// Will export the type to be used on the services
export type CreatePostInput = z.infer<typeof createPostSchema>;

// Create the schemas and enable to ref them into the routes
export const { schemas: postSchemas, $ref } = buildJsonSchemas(
  { createPostSchema, postResponseSchema, postsResponseSchema },
  { $id: 'PostSchema' }
);
