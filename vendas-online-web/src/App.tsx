import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import type { Router as RemixRouter } from '@remix-run/router';
import { loginRoutes } from './modules/login/houtes';
import { useNotification } from './shared/hooks/useNotification';

const routes: RouteObject[] = [...loginRoutes];

const router: RemixRouter = createBrowserRouter([...routes]);

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
