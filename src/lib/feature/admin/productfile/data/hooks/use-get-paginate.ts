import type { IProductFileService } from "../contract/productfile.service";
import type { PaginateRequest } from "../model/productfile.model";
import { useQuery } from "@sveltestack/svelte-query";
import { PRODUCTFILE_FINDALL } from "./keys";

interface ProductFilePaginateProps {
    service: IProductFileService;
    request: PaginateRequest;
}

export const useGetProductFilePaginate = ({
    service,
    request
}: ProductFilePaginateProps) => {
    return useQuery(
        [PRODUCTFILE_FINDALL, request],
        () => service.paginate(request),
    );
};