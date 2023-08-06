import { RouteObject } from "react-router-dom";
import Product from ".";
import { PathEnum } from "../../shared/enums/paths.enum";
import { ProductInsert } from "./screens/ProductInsert";

export const productRoutes: RouteObject[] = [
    {
        path: PathEnum.PRODUCT,
        element: <Product />,
        errorElement: <div>Pagina nao encontrada</div>
    },
    {
        path: PathEnum.PRODUCT_INSERT,
        element: <ProductInsert />,
        errorElement: <div>Pagina nao encontrada</div>
    },
];