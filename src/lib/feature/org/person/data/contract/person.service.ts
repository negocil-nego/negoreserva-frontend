import type { IPersonRepo } from "./person.repo";
import type { Person, PersonCreateRequest, PersonUpdateRequest, PersonPaginate } from "../model/person";

export class PersonService {
    private repo: IPersonRepo;

    constructor(repo: IPersonRepo) {
        this.repo = repo;
    }

    async paginate(pageNumber: number, pageSize: number): Promise<PersonPaginate> {
        return await this.repo.paginate(pageNumber, pageSize);
    }

    async save(request: PersonCreateRequest): Promise<{ uuid: string }> {
        return await this.repo.save(request);
    }

    async update(uuid: string, request: PersonUpdateRequest): Promise<{ uuid: string }> {
        return await this.repo.update(uuid, request);
    }

    async delete(uuid: string): Promise<boolean> {
        return await this.repo.delete(uuid);
    }
}
