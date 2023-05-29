'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';
import { NoAuthenticated } from '@/components/NoAuthenticated';
import { Navbar } from '@/components/Navbar';
import { PostComponent } from '@/components/PostComponent';

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
        <>
          <Navbar />
          <PostComponent openPost={true} posts={posts} />
        </>
      )}
    </>
  );
};

export default Posts;
