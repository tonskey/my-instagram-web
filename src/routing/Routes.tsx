import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { SignIn, SignUp } from '@/features/Auth';
import { Layout, Home } from '@/features/App';
import { PrivateRoutes } from './PrivateRoutes';

export const Routes = () => (
  <RouterRoutes>
    <Route
      path='/'
      element={
        <Layout>
          <PrivateRoutes />
        </Layout>
      }
    >
      <Route index={true} element={<Home />} />
    </Route>
    <Route path='login' element={<SignIn />} />
    <Route path='registration' element={<SignUp />} />
  </RouterRoutes>
);
