import Link from 'next/link';
import React from 'react';

export const NoAuthenticated = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-2xl text-gray-100">
          You are not authenticated, please log in.
        </h1>
        <Link
          href="/"
          className="mt-4 rounded-lg bg-purple-500
            px-4 py-2 text-gray-100
            transition hover:bg-purple-700
          "
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};
