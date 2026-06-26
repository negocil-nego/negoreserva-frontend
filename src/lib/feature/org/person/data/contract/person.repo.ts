import type { Person, PersonCreateRequest, PersonUpdateRequest, PersonPaginate, OrgPersonRoles, OrgRoleItem } from "../model/person";

export interface IPersonRepo {
    paginate(pageNumber: number, pageSize: number): Promise<PersonPaginate>;
    save(request: PersonCreateRequest): Promise<Person>;
    update(uuid: string, request: PersonUpdateRequest): Promise<Person>;
    delete(uuid: string): Promise<boolean>;
    getPersonRoles(userUuid: string): Promise<OrgPersonRoles>;
    findAllRoles(): Promise<OrgRoleItem[]>;
}
