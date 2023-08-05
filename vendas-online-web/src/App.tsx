import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import type { Router as RemixRouter } from '@remix-run/router';
import { loginRoutes } from './modules/login/houtes';
import { useNotification } from './shared/hooks/useNotification';
import { homeRoutes } from './modules/home/houtes';
import { productRoutes } from './modules/product/houtes';
import { verifyLoggedIn } from './shared/functions/connection/auth';
import { useGlobalContext } from './shared/hooks/useGlobalContext';


function App() {
  const { contextHolder } = useNotification()
  const { user, setUser } = useGlobalContext();

  const routes: RouteObject[] = [...loginRoutes, ...homeRoutes, ];
  const routesLoggedIn: RouteObject[] = [...productRoutes].map((route) => ({
    ...route,
    loader: () => verifyLoggedIn(setUser, user),
  }));

  const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  )
}

export default App
