import type { IUserUpdateDataService } from "../contract/user-update-data.service";
import { useQuery } from "@sveltestack/svelte-query";
import { USER_UPDATE_DATA_FIND_BY_ID } from "./keys";

interface UserUpdateDataFindByIdProps {
    service: IUserUpdateDataService;
    id: string;
}

export const useUserUpdateDataFindById = ({ service, id }: UserUpdateDataFindByIdProps) => {
    return useQuery(
        [USER_UPDATE_DATA_FIND_BY_ID, id],
        () => service.userUpdateDataFindById(id),
    );
};
