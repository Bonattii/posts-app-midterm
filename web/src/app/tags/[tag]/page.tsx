'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'phosphor-react';

import { api } from '@/lib/api';
import { Post } from '../../posts/page';

interface TagProps {
  params: {
    tag: string;
  };
}

const Tag = ({ params }: TagProps) => {
  const token = localStorage.getItem('token');

  const [tagsPosts, setTagsPosts] = useState<Post[]>([]);

  useEffect(() => {
    api
      .get('/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setTagsPosts(response.data);
      })
      .catch(error => console.log(error));
  }, [token]);

  const filteredPosts = tagsPosts.filter(tagPost =>
    tagPost.tags.includes(params.tag)
  );

  return (
    <div className="mt-12 flex flex-col items-center">
      <h1 className="mb-12 text-4xl font-semibold text-purple-500">
        {params.tag.charAt(0).toUpperCase() + params.tag.substring(1)} Posts
      </h1>

      {filteredPosts.map(filteredPost => (
        <div
          className="flex w-[500px] flex-col gap-2 px-4"
          key={filteredPost.id}
        >
          <h1 className="text-2xl font-semibold text-gray-50">
            {filteredPost.title}
          </h1>

          <p className="text-lg text-gray-200">{filteredPost.content}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm text-purple-500">Categories: </p>
            {filteredPost.categories.map((category, index) => (
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
            {filteredPost.tags.map((tag, index) => (
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

          <Link
            className="mt-4 flex items-center gap-2 text-sm text-gray-50 hover:text-purple-500"
            href={{
              pathname: `/posts/[id]`,
              query: {
                title: filteredPost.id
              }
            }}
            as={`/posts/${filteredPost.id}`}
          >
            Open post
            <ArrowRight size={14} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Tag;
