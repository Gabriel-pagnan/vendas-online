import { RouteObject } from "react-router-dom";
import { FirstScreen } from "./screens/FirstScreen";
import { NotFound } from "./screens/NotFound";

export const firstRoutes: RouteObject[] = [
    {
        path: "/",
        element: <FirstScreen />,
        errorElement: <NotFound />
    },
];