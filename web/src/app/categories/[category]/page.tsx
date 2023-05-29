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
    <>
      {!token ? (
        <NoAuthenticated />
      ) : (
        <>
          <Navbar />
          <PostComponent openPost={true} posts={filteredPosts} />
        </>
      )}
    </>
  );
};

export default Category;
