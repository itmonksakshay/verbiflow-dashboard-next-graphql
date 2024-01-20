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
interface IEventName {
  getEventSchema: { eventName: string };
}
export const getEventSchemaName = async ({
  id,
  client,
  timezoneOffset,
}: {
  id: number;
  client: ApolloClient<NormalizedCacheObject>;
  timezoneOffset: string;
}): Promise<IEventName> => {
  const query = gql`
    query getEventSchema($eventSchemaId: Int!) {
      getEventSchema(eventSchemaId: $eventSchemaId) {
        eventName
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
  return data as IEventName;
};
