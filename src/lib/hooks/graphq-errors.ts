import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { toastError } from "./toast-status";

export const handleCombinedGraphqlErrors = (error: any) => {

    if (CombinedGraphQLErrors.is(error)) {
        let message = "";
        error.errors.forEach((graphQLError) => {
            message += graphQLError.message + "\n";
        });
        toastError(message);
        return true
    }

    return false;
}