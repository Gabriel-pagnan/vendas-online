import { RouteObject } from "react-router-dom";
import Product from ".";

export const productRoutes: RouteObject[] = [
    {
        path: "/product",
        element: <Product />,
        errorElement: <div>Pagina nao encontrada</div>
    },
];