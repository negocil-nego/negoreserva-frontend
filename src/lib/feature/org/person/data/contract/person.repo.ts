import type { Person, PersonCreateRequest, PersonUpdateRequest, PersonPaginate } from "../model/person";

export interface IPersonRepo {
    paginate(pageNumber: number, pageSize: number): Promise<PersonPaginate>;
    save(request: PersonCreateRequest): Promise<{ uuid: string }>;
    update(uuid: string, request: PersonUpdateRequest): Promise<{ uuid: string }>;
    delete(uuid: string): Promise<boolean>;
}
