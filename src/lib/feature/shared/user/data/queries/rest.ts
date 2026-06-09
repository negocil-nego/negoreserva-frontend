import { API_VERSION } from "$lib/data/variables";

export class UserRouteNamed {
    public static readonly PATH = `${API_VERSION}/users`;
    public static readonly UPDATE_LOGO = `${UserRouteNamed.PATH}/upload/logo`;
    public static readonly RESET_PASSWORD_CURRENT = `${UserRouteNamed.PATH}/reset-password/current`;
}