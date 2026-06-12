import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client/core";
import { CombinedGraphQLErrors } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { PUBLIC_APP_URL } from "$env/static/public";
import { browser } from "$app/environment";
import { redirectToLogin } from "$lib/data/utils";
import { USER_AUTH_TOKEN_KEY } from "$lib/data/variables";

const GRAPHQL_ENDPOINT = `${PUBLIC_APP_URL}/graphql`;

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    for (const graphQLError of error.errors) {
      if (graphQLError.extensions?.code === "UNAUTHENTICATED") {
        redirectToLogin();
        return;
      }
    }
  }

  if (!CombinedGraphQLErrors.is(error)) {
    const networkError = error as any;
    if (networkError?.statusCode === 401) {
      redirectToLogin();
      return;
    }
  }
});

const authLink = new ApolloLink((operation, forward) => {
  const token = browser ? localStorage.getItem(USER_AUTH_TOKEN_KEY) : null;
  operation.setContext({
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
  return forward(operation);
});

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: { fetchPolicy: "network-only" },
    mutate: { fetchPolicy: "no-cache" },
  },
});