import { RouteObject } from "react-router-dom";
import { PathEnum } from "../../shared/enums/paths.enum";
import Category from ".";
import { NotFound } from "../home/screens/NotFound";
import { CategoryInsert } from "./screen/CategoryInsert";

export const categoryRoutes: RouteObject[] = [
    {
        path: PathEnum.CATEGORY,
        element: <Category />,
        errorElement: <NotFound />
    },
    {
        path: PathEnum.CATEGORY_INSERT,
        element: <CategoryInsert />,
        errorElement: <NotFound />
    },
];