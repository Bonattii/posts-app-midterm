import { prisma } from '../../utils/prisma';
import { CreatePostInput } from './post.schema';

export async function createPost(data: CreatePostInput & { userId: string }) {
  return prisma.post.create({
    data
  });
}

export async function getPosts() {
  // Return all the posts
  return prisma.post.findMany();
}

export async function getPostById(id: string) {
  return prisma.post.findUnique({
    where: {
      id
    }
  });
}
