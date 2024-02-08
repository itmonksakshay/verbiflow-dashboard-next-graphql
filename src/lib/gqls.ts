import { ApolloClient, NormalizedCacheObject, gql } from "@apollo/client";


interface IDailyVisitors {
  getUniqueVisitorCount: number;
}

export const getUniqueVisitorsByDate = async ({
  date,
  client,
  timezoneOffset,
}: {
  date: string;
  client: ApolloClient<NormalizedCacheObject>;
  timezoneOffset: string;
}): Promise<IDailyVisitors> => {

  const query = gql`
    query GetUniqueVisitorCount($date: String!) {
      getUniqueVisitorCount(date: $date)
    }
  `;
  const { data } = await client.query({
    query,
    variables: { date },
    fetchPolicy: "network-only",
    context: {
      headers: {
        timedelta: timezoneOffset,
      },
    },
  });

  return data as IDailyVisitors;
};

interface ICountryCityStats {
  getEventByCountryCity: { country: string; city: string; count: number }[];
}
export const getCountryCityStats = async ({
  client,
  timezoneOffset,
}: {
  client: ApolloClient<NormalizedCacheObject>;
  timezoneOffset: string;
}): Promise<ICountryCityStats> => {
  const query = gql`
    query GetEventByCountryCity {
      getEventByCountryCity {
        country
        city
        count
      }
    }
  `;
  const { data } = await client.query({
    query,
    fetchPolicy: "network-only",
    context: {
      headers: {
        timedelta: timezoneOffset,
      },
    },
  });
  return data as ICountryCityStats;
};

interface IVisitorsInterval {
  getUniqueVisitorsInterval: { date: string; count: number }[];
}
export const getUniqueVisitors = async ({
  startingDate,
  endingDate,
  client,
  timezoneOffset,
}: {
  startingDate: string;
  endingDate: string;
  client: ApolloClient<NormalizedCacheObject>;
  timezoneOffset: string;
}): Promise<IVisitorsInterval> => {
  const query = gql`
    query GetUniqueVisitorsInterval(
      $startingDate: String!
      $endingDate: String!
    ) {
      getUniqueVisitorsInterval(
        startingDate: $startingDate
        endingDate: $endingDate
      ) {
        date
        count
      }
    }
  `;
  const { data } = await client.query({
    query,
    variables: { startingDate, endingDate },
    fetchPolicy: "network-only",
    context: {
      headers: {
        timedelta: timezoneOffset,
      },
    },
  });
  return data as IVisitorsInterval;
};

interface IAverageSessionTime {
  getAverageSessionTime: number;
}
export const getAverageSessions = async ({
  client,
  timezoneOffset,
}: {
  client: ApolloClient<NormalizedCacheObject>;
  timezoneOffset: string;
}): Promise<IAverageSessionTime> => {
  const query = gql`
    query GetAverageSessionTime {
      getAverageSessionTime
    }
  `;
  const { data } = await client.query({
    query,
    fetchPolicy: "network-only",
    context: {
      headers: {
        timedelta: timezoneOffset,
      },
    },
  });
  return data as IAverageSessionTime;
};
interface IEventSchemas {
  getEventSchemas: { eventName: string; eventSchemaId: number }[];
}
export const getEvents = async ({
  client,
  cached,
  timezoneOffset,
}: {
  client: ApolloClient<NormalizedCacheObject>;
  cached: boolean;
  timezoneOffset: string;
}): Promise<IEventSchemas> => {
  const query = gql`
    query GetEventSchemas {
      getEventSchemas {
        eventSchemaId
        eventName
      }
    }
  `;
  const { data } = await client.query({
    query,
    fetchPolicy: cached ? "cache-first" : "network-only",
    context: {
      headers: {
        timedelta: timezoneOffset,
      },
    },
  });
  return data as IEventSchemas;
};
interface IEventCount {
  getEventCount: {
    date: string;
    data: { countValue: number; variantId: number }[];
  }[];
}
export const getEventCountById = async ({
  id,
  client,
  cached,
  timezoneOffset,
}: {
  id: number;
  client: ApolloClient<NormalizedCacheObject>;
  cached: boolean;
  timezoneOffset: string;
}): Promise<IEventCount> => {
  const query = gql`
    query getEventCount($eventSchemaId: Int!) {
      getEventCount(eventSchemaId: $eventSchemaId) {
        date
        data {
          countValue
          variantId
        }
      }
    }
  `;
  const { data } = await client.query({
    query,
    variables: {
      eventSchemaId: id,
    },
    fetchPolicy: cached ? "cache-first" : "network-only",
    context: {
      headers: {
        timedelta: timezoneOffset,
      },
    },
  });

  return data as IEventCount;
};

export enum operator {
  EQUALS = "EQUALS",
  GREATER_THAN = "GREATER_THAN",
  LESS_THAN = "LESS_THAN",
  GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
  LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL"
}

export enum MetadataPropertyOperations {
  VALUE = "VALUE",
  LENGTH = "LENGTH",
  STARTS_WITH = "STARTS_WITH",
  ENDS_WITH = "ENDS_WITH"
}

export type MetadataOperator = {
  metadataSchemaId: number;
  operation: MetadataPropertyOperations;
}

export type MetadataFilter = {
  metadataOperator: MetadataOperator;
  value: String;
  operator: operator;
}


export enum GroupByProperties {
  VALUE = "VALUE",
  LENGTH = "LENGTH"
}

export type MetadataSchemaGroupBy = {
  metadataSchemaId: number;
  property: GroupByProperties
}

export enum MetadataType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  COLOR = "COLOR"
}


export type EventDataFilter = {
  variantFilter: number[]
  metadataFilter: MetadataFilter[]
}

export type Metadata =  {
  metadataId: number;
  metadataName: string
  metadataType: MetadataType
}

export type timestamp ={ 
  from: number; 
  to: number
}

export interface IEventSchema {
  getEventSchema: {
    eventName: string;
    eventSchemaId: number;
    eventMetadata: Metadata[]
  };
}

export type EventCount = {
  data: {
    countValue: number;
    eventMetadatas: {
      metadataSchemaId: number;
      value: String;
    }[],
    variantId: number;
  }[];
  date: string;
  index: number;
}


export const getEventByFilter = async ({
  eventSchemaId,
  metadataFilter,
  client,
  groupByFilter,
  variantFilter,
  timezoneOffset,
  timestampFilter
}: {
  client: ApolloClient<NormalizedCacheObject>;
  eventSchemaId: number;
  metadataFilter: MetadataFilter[];
  groupByFilter: MetadataSchemaGroupBy[];
  variantFilter: number[];
  timezoneOffset: string;
  timestampFilter: timestamp
}): Promise<{ getEventDataByFilter: EventCount[] }> => {


  const query = gql`query GetEvent(
    $eventSchemaId: Int
    $metadataFilter: [metadataFilter!]!
    $groupByMetadataSchemaIds: [MetadataSchemaGroupBy!]
    $variantFilter: [Int!]
    $timestamp: timestampFilter
  ) {
    getEventDataByFilter(
      filter: { 
        eventSchemaId: $eventSchemaId
        metadataFilter: $metadataFilter
        groupByMetadataSchemaIds: $groupByMetadataSchemaIds 
        variantFilter: $variantFilter
        timestamp: $timestamp
      }
    ) {
      date
      index
      data { 
        variantId
        countValue
        eventMetadatas{ 
          metadataSchemaId
          value
        }
      }
    }
  }`;


  const { data } = await client.query({
    query,
    variables: {
      eventSchemaId: eventSchemaId,
      metadataFilter: metadataFilter,
      variantFilter: variantFilter,
      groupByMetadataSchemaIds: groupByFilter,
      timestamp: timestampFilter
    },
    fetchPolicy: "network-only",
    context: {
      headers: {
        timedelta: timezoneOffset,
      },
    },
  });

  return data as { getEventDataByFilter: EventCount[] };
}


export const getEventSchemaName = async ({
  id,
  client,
  timezoneOffset,
}: {
  id: number;
  client: ApolloClient<NormalizedCacheObject>;
  timezoneOffset: string;
}): Promise<IEventSchema> => {
  const query = gql`
    query getEventSchema($eventSchemaId: Int!) {
      getEventSchema(eventSchemaId: $eventSchemaId) {
        eventName
        eventSchemaId
        eventMetadata{
          metadataId
          metadataName
          metadataType
        }
      }
    }
  `;
  const { data } = await client.query({
    query,
    variables: {
      eventSchemaId: id,
    },
    fetchPolicy: "network-only",
    context: {
      headers: {
        timedelta: timezoneOffset,
      },
    },
  });
  return data as IEventSchema;
};

export type VariantName = {
  name: string;
  variantId: number;
}
export interface IVariantName {
  getVariants: VariantName[];
}

export const getVariantNames = async ({
  experimentId,
  client,
}: {
  experimentId: number;
  client: ApolloClient<NormalizedCacheObject>
}): Promise<IVariantName> => {
  const query = gql`
    query getVariants($experimentId: Int!) {
      getVariants(experimentId:$experimentId){
        name
        variantId
      }
    }
  `;
  const { data } = await client.query({
    query,
    variables: {
      experimentId: experimentId,
    },
    fetchPolicy: "network-only",
  });
  return data as IVariantName;
};
