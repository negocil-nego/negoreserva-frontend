import { useQuery } from "@sveltestack/svelte-query";
import type { IUserService } from "../contract/user.service";

interface UseProfileUserProps {
    service: IUserService;
    enabled?: boolean;
}

export const useProfileUser = ({ service, enabled }: UseProfileUserProps) => {
    return useQuery(
        ["profileUser"],
        () => service.profileUser(),
        { refetchOnWindowFocus: false, enabled }
    );
};
