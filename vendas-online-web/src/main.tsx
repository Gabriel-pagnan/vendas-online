import type { Router as RemixRouter } from '@remix-run/router';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { loginRoutes } from './modules/login/houtes';
import { GlobalProvider } from './shared/hooks/useGlobalContext';

const routes: RouteObject[] = [...loginRoutes];

const router: RemixRouter = createBrowserRouter([...routes]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>,
)
