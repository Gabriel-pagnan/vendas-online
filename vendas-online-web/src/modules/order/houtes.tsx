import { RouteObject } from "react-router-dom";
import { PathEnum } from "../../shared/enums/paths.enum";
import Order from ".";
import { NotFound } from "../home/screens/NotFound";
import { OrderDetail } from "./screens/OrderDetail";

export const orderRoutes: RouteObject[] = [
    {
        path: PathEnum.ORDER,
        element: <Order />,
        errorElement: <NotFound />
    },
    {
        path: PathEnum.ORDER_ID,
        element: <OrderDetail />,
        errorElement: <NotFound />
    },
];