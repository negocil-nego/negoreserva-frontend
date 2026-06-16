import { useQuery } from "@sveltestack/svelte-query";
import type { ILocationManage } from "../contract/location.service";
import { LOCATION_MUNICIPALITIES } from "./keys";

interface UseMunicipalitiesByProvinceProps {
  service: ILocationManage;
  provinceValue: string;
}

export const useGetMunicipalitiesByProvince = ({ service, provinceValue }: UseMunicipalitiesByProvinceProps) => {
  return useQuery(
    [LOCATION_MUNICIPALITIES, provinceValue],
    () => service.listMunicipalitiesByProvince(provinceValue),
    {
      enabled: !!provinceValue,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
