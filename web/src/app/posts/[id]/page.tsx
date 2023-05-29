'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';
import { Post } from '../../posts/page';
import { Navbar } from '@/components/Navbar';
import { NoAuthenticated } from '@/components/NoAuthenticated';
import { PostComponent } from '@/components/PostComponent';

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

  const posts: Post[] = [post!];

  return (
    <>
      {!token ? (
        <NoAuthenticated />
      ) : (
        <>
          <Navbar />
          <PostComponent openPost={false} posts={posts} />
        </>
      )}
    </>
  );
};

export default Tag;
