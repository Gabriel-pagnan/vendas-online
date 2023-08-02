import type { Router as RemixRouter } from '@remix-run/router';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { loginRoutes } from './modules/login/houtes';

const routes: RouteObject[] = [...loginRoutes];

const router: RemixRouter = createBrowserRouter([...routes]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
