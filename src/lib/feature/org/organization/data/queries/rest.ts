import { API_VERSION } from "$lib/data/variables";

export class OrgOrganizationRouteNamed {
    public static readonly PATH = `${API_VERSION}/org/organizations`;
    public static readonly UPDATE = `${this.PATH}/upload`;
    public static readonly UPDATE_IMAGE = `${this.PATH}/upload/image`;
    public static readonly UPDATE_VIDEO = `${this.PATH}/upload/video`;
    public static readonly UPDATE_LOGO = `${this.PATH}/upload/logo`;
    public static readonly ME = `${this.PATH}/me`;
}