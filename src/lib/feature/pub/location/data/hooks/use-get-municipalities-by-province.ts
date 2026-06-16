import { useQuery } from "@sveltestack/svelte-query";
import type { ILocationManage } from "../contract/location.service";
import { LOCATION_MUNICIPALITIES } from "./keys";

interface UseMunicipalitiesByProvinceProps {
  service: ILocationManage;
  provinceUuid: string;
}

export const useGetMunicipalitiesByProvince = ({ service, provinceUuid }: UseMunicipalitiesByProvinceProps) => {
  return useQuery(
    [LOCATION_MUNICIPALITIES, provinceUuid],
    () => service.listMunicipalitiesByProvince(provinceUuid),
    {
      enabled: !!provinceUuid,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
