import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Login from '../pages/provider/Login';
import Dashboard from '../pages/provider/Dashboard';
import Profile from '../pages/provider/Profile';
import Services from '../pages/provider/Services';
import Availability from '../pages/provider/Availability';
import Requests from '../pages/provider/Requests';
import History from '../pages/provider/History';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'availability',
        element: <Availability />,
      },
      {
        path: 'requests',
        element: <Requests />,
      },
      {
        path: 'history',
        element: <History />,
      },
    ],
  },
]);

export default router;

