// components/Layout.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MainLayout = ({ children }) => {
  const router = useRouter();
  
  const currentPath = router.pathname;
  useEffect(() => {
    const email = localStorage.getItem('articlesEmail');
    if (!email && currentPath !== '/register') {
      router.push('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>{children}</div>;
};

export default MainLayout;
