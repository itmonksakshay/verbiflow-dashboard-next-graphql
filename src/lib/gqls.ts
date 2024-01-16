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
  //   console.log(data);
  return data as IVisitorsInterval;
};
