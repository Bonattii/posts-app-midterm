'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';
import { Post } from '../../posts/page';
import Link from 'next/link';

interface CategoryProps {
  params: {
    category: string;
  };
}

const Category = ({ params }: CategoryProps) => {
  const token = localStorage.getItem('token');

  const [categoriesPosts, setCategoriesPosts] = useState<Post[]>([]);

  useEffect(() => {
    api
      .get('/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setCategoriesPosts(response.data);
      })
      .catch(error => console.log(error));
  }, [token]);

  const filteredPosts = categoriesPosts.filter(categoryPost =>
    categoryPost.categories.includes(params.category)
  );

  return (
    <div className="mt-12 flex flex-col items-center">
      <h1 className="mb-12 text-4xl font-semibold text-purple-500">
        {params.category.charAt(0).toUpperCase() + params.category.substring(1)}{' '}
        Posts
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
            {filteredPost.tags.map((tag, index) => (
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
  );
};

export default Category;
