'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { api } from '@/lib/api';
import { Post } from '../../posts/page';

interface TagProps {
  params: {
    id: string;
  };
}

const Tag = ({ params }: TagProps) => {
  const token = localStorage.getItem('token');

  const [post, setPost] = useState<Post>();

  useEffect(() => {
    api
      .get(`/api/posts/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setPost(response.data);
      })
      .catch(error => console.log(error));
  }, [token, params.id]);

  return (
    <div className="mt-12 flex flex-col items-center">
      <h1 className="mb-12 text-4xl font-semibold text-purple-500">
        {post?.title} - Post
      </h1>

      <div className="flex w-[500px] flex-col gap-2 px-4">
        <h1 className="text-2xl font-semibold text-gray-50">{post?.title}</h1>

        <p className="text-lg text-gray-200">{post?.content}</p>

        <div className="flex items-center gap-2">
          <p className="text-sm text-purple-500">Categories: </p>
          {post?.categories?.map((category, index) => (
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
          {post?.tags?.map((tag, index) => (
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
      </div>
    </div>
  );
};

export default Tag;
