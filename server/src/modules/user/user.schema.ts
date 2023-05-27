import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

// Basic User Schema
const userCore = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email(),
  name: z.string()
};

// Validation of the data that will be received to create a user
const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string'
  })
});

// Filter the type of the response that the route will have
const createUserResponseSchema = z.object({
  id: z.string(),
  ...userCore
});

// Make a validation of the data sent on the login
const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email(),
  password: z.string()
});

// Filter the login response
const loginResponseSchema = z.object({
  accessToken: z.string()
});

// Type to be used on the service
export type CreateUserInput = z.infer<typeof createUserSchema>;

// Type to be used on the service
export type LoginInput = z.infer<typeof loginSchema>;

// Create the schemas and enable to ref them into the routes
export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema
  },
  { $id: 'UserSchema' }
);
