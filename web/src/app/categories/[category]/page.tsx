'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';
import { Post } from '../../posts/page';
import { Navbar } from '@/components/Navbar';
import { NoAuthenticated } from '@/components/NoAuthenticated';
import { PostComponent } from '@/components/PostComponent';

interface CategoryProps {
  params: {
    category: string;
  };
}

const Category = ({ params }: CategoryProps) => {
  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

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
    <>
      {!token ? (
        <NoAuthenticated />
      ) : (
        <>
          <Navbar />
          <div className="mt-12 flex flex-col items-center">
            <h1 className="mb-12 text-4xl font-semibold text-purple-500">
              {params.category.charAt(0).toUpperCase() +
                params.category.substring(1) +
                ' ' +
                'Posts'}
            </h1>
            <PostComponent openPost={true} posts={filteredPosts} />
          </div>
        </>
      )}
    </>
  );
};

export default Category;
