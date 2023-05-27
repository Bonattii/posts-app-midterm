import { FastifyReply, FastifyRequest } from 'fastify';

import { fastify } from '../../server';
import { verifyPassword } from '../../utils/hash';
import { CreateUserInput, LoginInput } from './user.schema';
import { createUser, findUserByEmail } from './user.service';

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}

export async function loginUserHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  // Find a user by the email
  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.code(401).send({
      message: 'Invalid email or password'
    });
  }

  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password
  });

  if (correctPassword) {
    const { password, salt, ...rest } = user;

    // Generate the access token
    return { accessToken: fastify.jwt.sign(rest) };
  }

  return reply.code(401).send({
    message: 'Invalid email or password'
  });
}
