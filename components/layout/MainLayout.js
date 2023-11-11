// components/Layout.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MainLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('articlesEmail');
    if (!email) {
      router.push('/register');
    }
  }, [router]);

  return <div>{children}</div>;
};

export default MainLayout;
