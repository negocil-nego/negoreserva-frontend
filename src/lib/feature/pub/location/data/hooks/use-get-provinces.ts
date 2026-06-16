import { useQuery } from "@sveltestack/svelte-query";
import type { ILocationManage } from "../contract/location.service";
import { LOCATION_PROVINCES } from "./keys";

interface UseProvincesProps {
  service: ILocationManage;
}

export const useGetProvinces = ({ service }: UseProvincesProps) => {
  return useQuery(
    [LOCATION_PROVINCES],
    () => service.listProvinces(),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
