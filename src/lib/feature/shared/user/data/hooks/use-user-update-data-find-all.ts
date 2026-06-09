import type { IUserUpdateDataService } from "../contract/user-update-data.service";
import { useQuery } from "@sveltestack/svelte-query";
import { USER_UPDATE_DATA_FIND_ALL } from "./keys";

interface UserUpdateDataFindAllProps {
    service: IUserUpdateDataService;
}

export const useUserUpdateDataFindAll = ({ service }: UserUpdateDataFindAllProps) => {
    return useQuery(
        [USER_UPDATE_DATA_FIND_ALL],
        () => service.userUpdateDataFindAll(),
    );
};
