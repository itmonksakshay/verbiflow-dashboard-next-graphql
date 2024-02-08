import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
  DefaultOptions
} from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | null = null;
const getApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_VERBIFLOW,
      }),
      cache: new InMemoryCache(),
    });
  }
  return client;
};

export const typescriptApolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_VERBIFLOW,
  }),
  cache: new InMemoryCache(),
});

export { getApolloClient };

