import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | null = null;
const getApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  console.log("process.env.GRAPHQL_ENDPOINT", process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_VERBIFLOW)
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

export { getApolloClient };
