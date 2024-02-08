import { typescriptApolloClient } from "@/lib/apolloClient";
import { gql } from '@/gql/gql';

type IProps = {
    date: string;
    timezoneOffset: string;
}

const getUniqueVisitorCount = gql(`
query GetUniqueVisitorCount($date: String!) {
  getUniqueVisitorCount(date: $date)
}
`);


const useGetUniqueVisitorCount = async ({ date, timezoneOffset }: IProps) => {

    const {data:{getUniqueVisitorCount:uniqueVisitorCount}} = await typescriptApolloClient.query({
        query: getUniqueVisitorCount,
        variables: { date },
        fetchPolicy: "network-only",
        context: {
            headers: {
                timedelta: timezoneOffset,
            },
        },
    });
    return uniqueVisitorCount;
};

export {useGetUniqueVisitorCount};