import { RouteObject } from "react-router-dom";
import { PathEnum } from "../../shared/enums/paths.enum";
import Order from ".";
import { NotFound } from "../home/screens/NotFound";

export const orderRoutes: RouteObject[] = [
    {
        path: PathEnum.ORDER,
        element: <Order />,
        errorElement: <NotFound />
    },
    // {
    //     path: PathEnum.PRODUCT_INSERT,
    //     element: <ProductInsert />,
    //     errorElement: <div>Pagina nao encontrada</div>
    // },
];