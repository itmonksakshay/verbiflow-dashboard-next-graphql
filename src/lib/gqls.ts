import { ApolloClient, NormalizedCacheObject, gql } from "@apollo/client";
interface IDailyVisitors {
  getUniqueVisitorCount: number;
}
export const getUniqueVisitorsByDate = async ({
  date,
  client,
}: {
  date: string;
  client: ApolloClient<NormalizedCacheObject>;
}): Promise<IDailyVisitors> => {
  const query = gql`
    query GetUniqueVisitorCount($date: String!) {
      getUniqueVisitorCount(date: $date)
    }
  `;
  const { data } = await client.query({
    query,
    variables: { date },
  });

  return data as IDailyVisitors;
};

interface ICountryCityStats {
  getEventByCountryCity: { country: string; city: string; count: number }[];
}
export const getCountryCityStats = async ({
  client,
}: {
  client: ApolloClient<NormalizedCacheObject>;
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
}: {
  startingDate: string;
  endingDate: string;
  client: ApolloClient<NormalizedCacheObject>;
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
  });
  return data as IVisitorsInterval;
};

interface IAverageSessionTime {
  getAverageSessionTime: number;
}
export const getAverageSessions = async ({
  client,
}: {
  client: ApolloClient<NormalizedCacheObject>;
}): Promise<IAverageSessionTime> => {
  const query = gql`
    query GetAverageSessionTime {
      getAverageSessionTime
    }
  `;
  const { data } = await client.query({
    query,
  });
  return data as IAverageSessionTime;
};
interface IEventSchemas {
  getEventSchemas: { eventName: string; eventSchemaId: number }[];
}
export const getEvents = async ({
  client,
}: {
  client: ApolloClient<NormalizedCacheObject>;
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
  });
  return data as IEventSchemas;
};
interface IEventCount {
  getEventCount: { date: string; data: { countValue: number }[] }[];
}
export const getEventCountById = async ({
  id,
  client,
}: {
  id: number;
  client: ApolloClient<NormalizedCacheObject>;
}): Promise<IEventCount> => {
  const query = gql`
    query getEventCount($eventSchemaId: Int!) {
      getEventCount(eventSchemaId: $eventSchemaId) {
        date
        data {
          countValue
        }
      }
    }
  `;
  const { data } = await client.query({
    query,
    variables: {
      eventSchemaId: id,
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
}: {
  id: number;
  client: ApolloClient<NormalizedCacheObject>;
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
  });
  return data as IEventName;
};
