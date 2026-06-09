const API_VERSION = "/api/v1";

export class OrgCatalogRouteNamed {
    public static readonly PATH = `${API_VERSION}/org/catalogs`;
    public static readonly UPDATE_IMAGE = `${this.PATH}/upload/image`;
}
