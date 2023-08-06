import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import type { Router as RemixRouter } from '@remix-run/router';
import { loginRoutes } from './modules/login/houtes';
import { useNotification } from './shared/hooks/useNotification';
import { homeRoutes } from './modules/home/houtes';
import { productRoutes } from './modules/product/houtes';
import { verifyLoggedIn } from './shared/functions/connection/auth';
import { useRequests } from './shared/hooks/useRequests';
import { useEffect } from 'react';
import { URL_USER } from './shared/constants/urls';
import { MethodsEnum } from './shared/enums/methods.enum';
import { useGlobalContext } from './shared/hooks/useGlobalContext';

const routes: RouteObject[] = [...loginRoutes ];
const routesLoggedIn: RouteObject[] = [...productRoutes, ...homeRoutes,].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}));

const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();
  const {setUser} = useGlobalContext();
  const {request} = useRequests();

  useEffect(() => {
    request(URL_USER, MethodsEnum.GET, setUser);
  }, [])

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  )
}

export default App
