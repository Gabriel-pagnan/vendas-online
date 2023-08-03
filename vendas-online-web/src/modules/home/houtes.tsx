import { RouteObject } from "react-router-dom";
import { FirstScreen } from "./screens/FirstScreen";

export const homeRoutes: RouteObject[] = [
    {
        path: "/",
        element: <FirstScreen />,
        errorElement: <div>Pagina nao encontrada</div>
    },
];