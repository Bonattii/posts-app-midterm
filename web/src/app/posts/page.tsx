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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

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
          <div className="mt-12 flex flex-col items-center">
            <h1 className="mb-12 text-4xl font-semibold text-purple-500">
              All Posts
            </h1>

            <PostComponent openPost={true} posts={posts} />
          </div>
        </>
      )}
    </>
  );
};

export default Posts;
