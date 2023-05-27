import { hashPassword } from '../../utils/hash';
import { prisma } from '../../utils/prisma';

import { CreateUserInput } from './user.schema';

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  // Hash the password
  const { hash, salt } = hashPassword(password);

  // Create a user into the db
  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash }
  });

  return user;
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email
    }
  });
}
