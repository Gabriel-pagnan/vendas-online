import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import type { Router as RemixRouter } from '@remix-run/router';
import { loginRoutes } from './modules/login/houtes';
import { useNotification } from './shared/hooks/useNotification';
import { homeRoutes } from './modules/home/houtes';
import { productRoutes } from './modules/product/houtes';

const mainRoutes: RouteObject[] = [
  {
    path: "/",
    element: <div>tela </div>,
    errorElement: <div>error</div>
},
];

const router: RemixRouter = createBrowserRouter([
  ...homeRoutes,
  ...loginRoutes, 
  ...productRoutes
]);

function App() {
  const { contextHolder } = useNotification()

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  )
}

export default App
