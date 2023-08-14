import { NavigateFunction, redirect } from "react-router-dom";
import { AUTHORIZATION_KEY } from "../../constants/authorizationConstants";
import { getItemStorage, removeItemStorage, setItemStorage } from "./storageProxy";
import { connectionAPIGet } from "./connetionAPI";
import { UserType } from "../../../modules/login/types/UserType";
import { URL_USER } from "../../constants/urls";
import { PathEnum } from "../../enums/paths.enum";
import { UserTokenType } from "../../../modules/login/types/UserTokenType";

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
    if (token) setItemStorage(AUTHORIZATION_KEY, token)
};

export const getUserInfo = (): UserTokenType | undefined => {
    const token = getAuthorizationToken();
    const tokenSplited = token?.split('.');

    if(tokenSplited && tokenSplited.length > 1){
        return JSON.parse(window.atob(tokenSplited[1]));
    }   
}

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const verifyLoggedIn = async () => {
    const token = getAuthorizationToken();
    if (!token) {
        return redirect(PathEnum.LOGIN);
    }

    const user = await connectionAPIGet<UserType>(URL_USER)
        .catch(() => {
            unsetAuthorizationToken();
            return redirect(PathEnum.LOGIN);
        });

    if (!user) return redirect(PathEnum.LOGIN);

    return null;
};

export const logout = (navigate: NavigateFunction) => {
    unsetAuthorizationToken();
    navigate(PathEnum.LOGIN);
};