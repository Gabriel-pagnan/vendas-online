import { RouteObject } from "react-router-dom";
import Product from ".";
import { PathEnum } from "../../shared/enums/paths.enum";

export const productRoutes: RouteObject[] = [
    {
        path: PathEnum.PRODUCT,
        element: <Product />,
        errorElement: <div>Pagina nao encontrada</div>
    },
];