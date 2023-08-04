import { NavigateFunction, redirect } from "react-router-dom";
import { AUTHORIZATION_KEY } from "../../constants/authorizationConstants";
import { getItemStorage, removeItemStorage, setItemStorage } from "./storageProxy";
import { connectionAPIGet } from "./connetionAPI";
import { UserType } from "../../../modules/login/types/UserType";
import { URL_USER } from "../../constants/urls";
import { PathEnum } from "../../enums/paths.enum";

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
    if (token) setItemStorage(AUTHORIZATION_KEY, token)
};

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const verifyLoggedIn = async (setUser: (user: UserType) => void, user?: UserType) => {
    const token = getAuthorizationToken();
    if (!token) {
        location.href = '/login';
    }
    if (!user) {
        await connectionAPIGet<UserType>(URL_USER)
            .then((userReturn) => {
                setUser(userReturn);
            })
            .catch(() => {
                unsetAuthorizationToken();
                location.href = '/login';
            });
    }
    return null;
};

export const logout = (navigate: NavigateFunction) => {
    unsetAuthorizationToken();
    navigate(PathEnum.LOGIN);
};