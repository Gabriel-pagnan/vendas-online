import { RouteObject } from "react-router-dom";
import { PathEnum } from "../../shared/enums/paths.enum";
import { User } from "./screens/User";
import { NotFound } from "../home/screens/NotFound";
import { UserInsert } from "./screens/UserInsert";

export const usersRoutes: RouteObject[] = [
    {
        path: PathEnum.USER,
        element: <User />,
        errorElement: <NotFound />
    },
    {
        path: PathEnum.USER_INSERT,
        element: <UserInsert />,
        errorElement: <NotFound />
    },
];