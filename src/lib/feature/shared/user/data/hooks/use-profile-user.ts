import { useQuery } from "@sveltestack/svelte-query";
import type { IUserService } from "../contract/user.service";

interface UseProfileUserProps {
    service: IUserService;
}

export const useProfileUser = ({ service }: UseProfileUserProps) => {
    return useQuery(
        ["profileUser"],
        () => service.profileUser(),
        { refetchOnWindowFocus: false }
    );
};
