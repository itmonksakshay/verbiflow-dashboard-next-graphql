import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | null = null;
const getApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: new HttpLink({
        uri: process.env.GRAPHQL_ENDPOINT,
      }),
      cache: new InMemoryCache(),
    });
  }
  return client;
};

export { getApolloClient };
