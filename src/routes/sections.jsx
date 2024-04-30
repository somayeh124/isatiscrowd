import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import ComingSoon from 'src/pages/comingsoon';

export const IndexPage = lazy(() => import('src/pages/app'));
export const CompanyPage = lazy(() => import('src/pages/company'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        
        { element: <IndexPage />, index: true },
        { path: 'getstock', element: <UserPage /> },
        { path: 'trades', element: <ProductsPage /> },
        { path: 'cominsoon', element: <ComingSoon /> },
        { path: 'cominsoon', element: <ComingSoon /> },
      ],
    },
    { path: 'company', element: <CompanyPage /> },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
