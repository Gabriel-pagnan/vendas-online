import { RouteObject } from "react-router-dom";
import { LoginScreen } from "./screens/LoginScreen";
import { PathEnum } from "../../shared/enums/paths.enum";

export const loginRoutes: RouteObject[] = [
    {
        path: PathEnum.LOGIN,
        element: <LoginScreen />,
    },
];