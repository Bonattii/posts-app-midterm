'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';
import { Post } from '../../posts/page';
import { Navbar } from '@/components/Navbar';
import { NoAuthenticated } from '@/components/NoAuthenticated';
import { PostComponent } from '@/components/PostComponent';

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

export default Tag;
