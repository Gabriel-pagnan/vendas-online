import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import type { Router as RemixRouter } from '@remix-run/router';
import { loginRoutes } from './modules/login/houtes';
import { useNotification } from './shared/hooks/useNotification';
import { productRoutes } from './modules/product/houtes';
import { getAuthorizationToken, verifyLoggedIn } from './shared/functions/connection/auth';
import { useRequests } from './shared/hooks/useRequests';
import { useEffect } from 'react';
import { URL_USER } from './shared/constants/urls';
import { MethodsEnum } from './shared/enums/methods.enum';
import { useGlobalContext } from './shared/hooks/useGlobalContext';
import { firstRoutes } from './modules/home/houtes';

const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [
  ...productRoutes,
  ...firstRoutes,
].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}));

const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();
  const {setUser} = useGlobalContext();
  const {request} = useRequests();

  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      request(URL_USER, MethodsEnum.GET, setUser);
    }
  }, [])

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  )
}

export default App
