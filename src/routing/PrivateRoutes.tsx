import { FC } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/features/Auth';

export const PrivateRoutes: FC = () => {
  const location = useLocation();
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};
