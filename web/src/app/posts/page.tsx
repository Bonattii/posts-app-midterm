'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';
import { NoAuthenticated } from '@/components/NoAuthenticated';
import Link from 'next/link';

export interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
  categories: string[];
  createdAt: string;
  updatedAt: string;
}

const Posts = () => {
  const token = localStorage.getItem('token');

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api
      .get('/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => console.log(error));
  }, [token]);

  return (
    <>
      {!token ? (
        <NoAuthenticated />
      ) : (
        <div className="mt-12 flex flex-col items-center">
          {posts.map(post => (
            <div className="flex w-[500px] flex-col gap-2 px-4" key={post.id}>
              <h1 className="text-2xl font-semibold text-gray-50">
                {post.title}
              </h1>

              <p className="text-lg text-gray-200">{post.content}</p>

              <div className="flex items-center gap-2">
                <p className="text-sm text-purple-500">Categories: </p>
                {post.categories.map((category, index) => (
                  <Link
                    key={`${category}-${index}`}
                    href={{
                      pathname: `/posts/[category]`,
                      query: {
                        title: category
                      }
                    }}
                    as={`/posts/${category}`}
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
                {post.tags.map((tag, index) => (
                  <Link
                    key={`${tag}-${index}`}
                    href={{
                      pathname: `/posts/[category]`,
                      query: {
                        title: tag
                      }
                    }}
                    as={`/posts/${tag}`}
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
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
