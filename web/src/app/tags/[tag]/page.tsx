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
  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
  }

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
          <div className="mt-12 flex flex-col items-center">
            <h1 className="mb-12 text-4xl font-semibold text-purple-500">
              {params.tag.charAt(0).toUpperCase() +
                params.tag.substring(1) +
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

export default Tag;
