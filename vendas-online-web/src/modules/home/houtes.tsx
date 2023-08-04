import { RouteObject } from "react-router-dom";
import { FirstScreen } from "./screens/FirstScreen";
import { NotFound } from "./screens/NotFound";

export const homeRoutes: RouteObject[] = [
    {
        path: "/",
        element: <FirstScreen />,
        errorElement: <NotFound />
    },
];