import { RouteObject } from "react-router-dom";
import Product from ".";
import { PathEnum } from "../../shared/enums/paths.enum";
import { ProductInsert } from "./screens/ProductInsert";
import { NotFound } from "../home/screens/NotFound";

export const productRoutes: RouteObject[] = [
    {
        path: PathEnum.PRODUCT,
        element: <Product />,
        errorElement: <NotFound />
    },
    {
        path: PathEnum.PRODUCT_INSERT,
        element: <ProductInsert />,
        errorElement: <NotFound />
    },
];