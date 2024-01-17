import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
  FieldReadFunction,
} from "@apollo/client";

const maxAge = 1000 * 10; // 30 seconds in milliseconds

// Define a type for the cache entries
interface CacheEntry {
  timestamp?: number;
  data: any;
}

// Define the read function with proper TypeScript annotations
const readFunction: FieldReadFunction<CacheEntry> = (
  existing,
  { args, toReference, fieldName }
) => {
  // Check if existing data is still within the maxAge
  if (
    existing &&
    existing.timestamp &&
    Date.now() - existing.timestamp < maxAge
  ) {
    return existing.data;
  }
  // Fetch new data if existing data is stale or not present
  return undefined;
};

let client: ApolloClient<NormalizedCacheObject> | null = null;
const getApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: new HttpLink({
        uri: process.env.GRAPHQL_ENDPOINT,
      }),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              // Apply the read function to all fields under Query
              all: {
                keyArgs: false, // Indicates that all queries should be treated the same
                read: readFunction,
              },
            },
          },
        },
      }),
    });
  }
  return client;
};

export { getApolloClient };
