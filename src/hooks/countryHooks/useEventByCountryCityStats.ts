import { typescriptApolloClient } from "@/lib/apolloClient";
import { gql } from '@/gql/gql';

type IProps = {
    timezoneOffset: string;
}

const getEventByCountryCity = gql(`
query GetEventByCountryCity {
  getEventByCountryCity {
    country
    city
    count
  }
}
`);

const useEventByCountryCityStats = async ({ timezoneOffset }: IProps) => {

    const { data: { getEventByCountryCity: eventByCountryCity } } = await typescriptApolloClient.query({
        query: getEventByCountryCity,
        fetchPolicy: "network-only",
        context: {
            headers: {
                timedelta: timezoneOffset,
            },
        },
    });
    return eventByCountryCity;
};

export const useGetCountryCityChartData = async ({ timezoneOffset }: IProps) => {

    const countryCityData = await useEventByCountryCityStats({ timezoneOffset });

    const filterData = countryCityData.reduce((acc, value) => {

        if (value.country === '-') {
            return acc;
        }
        const idx = acc.findIndex((item) => item.country === value.country)
        if (idx !== -1) {
            acc[idx].count += value.count;
        } else {
            acc.push({ country: value.country, count: value.count });
        }
        return acc.sort(
            (a, b) => b.count - a.count
        );;
    }, [] as { country: string; count: number }[]);

    return {
        labels: filterData.map((event) => event.country),
        datasets: [
            {
                label: "Users",
                data: filterData.map((event) => event.count),
                borderWidth: 1,
            },
        ],
    };
}

export { useEventByCountryCityStats as default };