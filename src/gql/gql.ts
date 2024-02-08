/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery GetEventByCountryCity {\n  getEventByCountryCity {\n    country\n    city\n    count\n  }\n}\n": types.GetEventByCountryCityDocument,
    "\nquery GetEventSchemaCountById($eventSchemaId: Int!) {\n  getEventCount(eventSchemaId: $eventSchemaId) {\n    date\n    data {\n      countValue\n      variantId\n    }\n  }\n}\n": types.GetEventSchemaCountByIdDocument,
    "\nquery GetEventSchemas {\n  getEventSchemas {\n    eventSchemaId\n    eventName\n  }\n}\n": types.GetEventSchemasDocument,
    "\nquery GetAverageSessionTime {\n  getAverageSessionTime\n}\n": types.GetAverageSessionTimeDocument,
    "\nquery GetUniqueVisitorCount($date: String!) {\n  getUniqueVisitorCount(date: $date)\n}\n": types.GetUniqueVisitorCountDocument,
    "\nquery GetUniqueVisitorsInterval(\n  $startingDate: String!\n  $endingDate: String!\n) {\n  getUniqueVisitorsInterval(\n    startingDate: $startingDate\n    endingDate: $endingDate\n  ) {\n    date\n    count\n  }\n}\n": types.GetUniqueVisitorsIntervalDocument,
    "\n    query GetUniqueVisitorCount($date: String!) {\n      getUniqueVisitorCount(date: $date)\n    }\n  ": types.GetUniqueVisitorCountDocument,
    "\n    query GetEventByCountryCity {\n      getEventByCountryCity {\n        country\n        city\n        count\n      }\n    }\n  ": types.GetEventByCountryCityDocument,
    "\n    query GetUniqueVisitorsInterval(\n      $startingDate: String!\n      $endingDate: String!\n    ) {\n      getUniqueVisitorsInterval(\n        startingDate: $startingDate\n        endingDate: $endingDate\n      ) {\n        date\n        count\n      }\n    }\n  ": types.GetUniqueVisitorsIntervalDocument,
    "\n    query GetAverageSessionTime {\n      getAverageSessionTime\n    }\n  ": types.GetAverageSessionTimeDocument,
    "\n    query GetEventSchemas {\n      getEventSchemas {\n        eventSchemaId\n        eventName\n      }\n    }\n  ": types.GetEventSchemasDocument,
    "\n    query getEventCount($eventSchemaId: Int!) {\n      getEventCount(eventSchemaId: $eventSchemaId) {\n        date\n        data {\n          countValue\n          variantId\n        }\n      }\n    }\n  ": types.GetEventCountDocument,
    "query GetEvent(\n    $eventSchemaId: Int\n    $metadataFilter: [metadataFilter!]!\n    $groupByMetadataSchemaIds: [MetadataSchemaGroupBy!]\n    $variantFilter: [Int!]\n  ) {\n    getEventDataByFilter(\n      filter: { \n        eventSchemaId: $eventSchemaId\n        metadataFilter: $metadataFilter\n        groupByMetadataSchemaIds: $groupByMetadataSchemaIds \n        variantFilter: $variantFilter\n      }\n    ) {\n      date\n      index\n      data { \n        variantId\n        countValue\n        eventMetadatas{ \n          metadataSchemaId\n          value\n        }\n      }\n    }\n  }": types.GetEventDocument,
    "\n    query getEventSchema($eventSchemaId: Int!) {\n      getEventSchema(eventSchemaId: $eventSchemaId) {\n        eventName\n        eventSchemaId\n        eventMetadata{\n          metadataId\n          metadataName\n          metadataType\n        }\n      }\n    }\n  ": types.GetEventSchemaDocument,
    "\n    query getVariants($experimentId: Int!) {\n      getVariants(experimentId:$experimentId){\n        name\n        variantId\n      }\n    }\n  ": types.GetVariantsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetEventByCountryCity {\n  getEventByCountryCity {\n    country\n    city\n    count\n  }\n}\n"): (typeof documents)["\nquery GetEventByCountryCity {\n  getEventByCountryCity {\n    country\n    city\n    count\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetEventSchemaCountById($eventSchemaId: Int!) {\n  getEventCount(eventSchemaId: $eventSchemaId) {\n    date\n    data {\n      countValue\n      variantId\n    }\n  }\n}\n"): (typeof documents)["\nquery GetEventSchemaCountById($eventSchemaId: Int!) {\n  getEventCount(eventSchemaId: $eventSchemaId) {\n    date\n    data {\n      countValue\n      variantId\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetEventSchemas {\n  getEventSchemas {\n    eventSchemaId\n    eventName\n  }\n}\n"): (typeof documents)["\nquery GetEventSchemas {\n  getEventSchemas {\n    eventSchemaId\n    eventName\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAverageSessionTime {\n  getAverageSessionTime\n}\n"): (typeof documents)["\nquery GetAverageSessionTime {\n  getAverageSessionTime\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetUniqueVisitorCount($date: String!) {\n  getUniqueVisitorCount(date: $date)\n}\n"): (typeof documents)["\nquery GetUniqueVisitorCount($date: String!) {\n  getUniqueVisitorCount(date: $date)\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetUniqueVisitorsInterval(\n  $startingDate: String!\n  $endingDate: String!\n) {\n  getUniqueVisitorsInterval(\n    startingDate: $startingDate\n    endingDate: $endingDate\n  ) {\n    date\n    count\n  }\n}\n"): (typeof documents)["\nquery GetUniqueVisitorsInterval(\n  $startingDate: String!\n  $endingDate: String!\n) {\n  getUniqueVisitorsInterval(\n    startingDate: $startingDate\n    endingDate: $endingDate\n  ) {\n    date\n    count\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetUniqueVisitorCount($date: String!) {\n      getUniqueVisitorCount(date: $date)\n    }\n  "): (typeof documents)["\n    query GetUniqueVisitorCount($date: String!) {\n      getUniqueVisitorCount(date: $date)\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetEventByCountryCity {\n      getEventByCountryCity {\n        country\n        city\n        count\n      }\n    }\n  "): (typeof documents)["\n    query GetEventByCountryCity {\n      getEventByCountryCity {\n        country\n        city\n        count\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetUniqueVisitorsInterval(\n      $startingDate: String!\n      $endingDate: String!\n    ) {\n      getUniqueVisitorsInterval(\n        startingDate: $startingDate\n        endingDate: $endingDate\n      ) {\n        date\n        count\n      }\n    }\n  "): (typeof documents)["\n    query GetUniqueVisitorsInterval(\n      $startingDate: String!\n      $endingDate: String!\n    ) {\n      getUniqueVisitorsInterval(\n        startingDate: $startingDate\n        endingDate: $endingDate\n      ) {\n        date\n        count\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAverageSessionTime {\n      getAverageSessionTime\n    }\n  "): (typeof documents)["\n    query GetAverageSessionTime {\n      getAverageSessionTime\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetEventSchemas {\n      getEventSchemas {\n        eventSchemaId\n        eventName\n      }\n    }\n  "): (typeof documents)["\n    query GetEventSchemas {\n      getEventSchemas {\n        eventSchemaId\n        eventName\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getEventCount($eventSchemaId: Int!) {\n      getEventCount(eventSchemaId: $eventSchemaId) {\n        date\n        data {\n          countValue\n          variantId\n        }\n      }\n    }\n  "): (typeof documents)["\n    query getEventCount($eventSchemaId: Int!) {\n      getEventCount(eventSchemaId: $eventSchemaId) {\n        date\n        data {\n          countValue\n          variantId\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetEvent(\n    $eventSchemaId: Int\n    $metadataFilter: [metadataFilter!]!\n    $groupByMetadataSchemaIds: [MetadataSchemaGroupBy!]\n    $variantFilter: [Int!]\n  ) {\n    getEventDataByFilter(\n      filter: { \n        eventSchemaId: $eventSchemaId\n        metadataFilter: $metadataFilter\n        groupByMetadataSchemaIds: $groupByMetadataSchemaIds \n        variantFilter: $variantFilter\n      }\n    ) {\n      date\n      index\n      data { \n        variantId\n        countValue\n        eventMetadatas{ \n          metadataSchemaId\n          value\n        }\n      }\n    }\n  }"): (typeof documents)["query GetEvent(\n    $eventSchemaId: Int\n    $metadataFilter: [metadataFilter!]!\n    $groupByMetadataSchemaIds: [MetadataSchemaGroupBy!]\n    $variantFilter: [Int!]\n  ) {\n    getEventDataByFilter(\n      filter: { \n        eventSchemaId: $eventSchemaId\n        metadataFilter: $metadataFilter\n        groupByMetadataSchemaIds: $groupByMetadataSchemaIds \n        variantFilter: $variantFilter\n      }\n    ) {\n      date\n      index\n      data { \n        variantId\n        countValue\n        eventMetadatas{ \n          metadataSchemaId\n          value\n        }\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getEventSchema($eventSchemaId: Int!) {\n      getEventSchema(eventSchemaId: $eventSchemaId) {\n        eventName\n        eventSchemaId\n        eventMetadata{\n          metadataId\n          metadataName\n          metadataType\n        }\n      }\n    }\n  "): (typeof documents)["\n    query getEventSchema($eventSchemaId: Int!) {\n      getEventSchema(eventSchemaId: $eventSchemaId) {\n        eventName\n        eventSchemaId\n        eventMetadata{\n          metadataId\n          metadataName\n          metadataType\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getVariants($experimentId: Int!) {\n      getVariants(experimentId:$experimentId){\n        name\n        variantId\n      }\n    }\n  "): (typeof documents)["\n    query getVariants($experimentId: Int!) {\n      getVariants(experimentId:$experimentId){\n        name\n        variantId\n      }\n    }\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;