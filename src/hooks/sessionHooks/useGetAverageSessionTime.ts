import { typescriptApolloClient } from "@/lib/apolloClient";
import { gql } from '@/gql/gql';

type IProps = {
    timezoneOffset: string;
}

const GetAverageSessionTime = gql(`
query GetAverageSessionTime {
  getAverageSessionTime
}
`);

const useGetAverageSessionTime = async ({ timezoneOffset }: IProps) => {

    const { data: { getAverageSessionTime } } = await typescriptApolloClient.query({
        query: GetAverageSessionTime,
        fetchPolicy: "network-only",
        context: {
            headers: {
                timedelta: timezoneOffset,
            },
        },
    });
    return getAverageSessionTime;
};

export {useGetAverageSessionTime as default};