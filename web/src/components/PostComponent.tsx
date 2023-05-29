import Link from 'next/link';
import { ArrowRight } from 'phosphor-react';

import { Post } from '@/app/posts/page';

interface PostProps {
  posts: Post[];
  openPost: boolean;
}

export const PostComponent = ({ posts, openPost }: PostProps) => {
  return (
    <>
      {posts.map(post => (
        <div className="flex w-[500px] flex-col gap-2 px-4" key={post?.id}>
          <h1 className="text-2xl font-semibold text-gray-50">{post?.title}</h1>

          <p className="text-lg text-gray-200">{post?.content}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm text-purple-500">Categories: </p>
            {post?.categories.map((category, index) => (
              <Link
                key={`${category}-${index}`}
                href={{
                  pathname: `/categories/[category]`,
                  query: {
                    title: category
                  }
                }}
                as={`/categories/${category}`}
                className="
                      flex items-center justify-center
                      rounded-full bg-green-600 px-2 text-xs
                      uppercase hover:bg-green-700
                    "
              >
                {category}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm text-purple-500">Tags: </p>
            {post?.tags.map((tag, index) => (
              <Link
                key={`${tag}-${index}`}
                href={{
                  pathname: `/tags/[tag]`,
                  query: {
                    title: tag
                  }
                }}
                as={`/tags/${tag}`}
                className="
                      flex items-center justify-center
                      rounded-full bg-orange-600 px-2 text-xs
                      uppercase hover:bg-orange-700
                    "
              >
                {tag}
              </Link>
            ))}
          </div>

          {openPost && (
            <Link
              className="mb-6 mt-4 flex items-center gap-2 text-sm text-gray-50 hover:text-purple-500"
              href={{
                pathname: `/posts/[id]`,
                query: {
                  title: post.id
                }
              }}
              as={`/posts/${post.id}`}
            >
              Open post
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      ))}
    </>
  );
};
