'use client';

import Link from 'next/link';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const token = localStorage.getItem('token');

  const router = useRouter();

  const handleLogout = useCallback(() => {
    localStorage.clear();

    router.push('/');
  }, [router]);

  return (
    <>
      {!token ? (
        <></>
      ) : (
        <nav className="mt-4 flex flex-col items-center justify-center">
          <div className="flex items-center gap-4">
            <Link
              className="
                mt-4 rounded-lg bg-purple-500
                px-2 py-2 text-gray-100
                transition hover:bg-purple-700
              "
              href="/posts"
            >
              Posts Page
            </Link>
            <button
              className="
                mt-4 rounded-lg bg-red-500
                px-2 py-2 text-gray-100
                transition hover:bg-red-700
              "
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>
      )}
    </>
  );
};
