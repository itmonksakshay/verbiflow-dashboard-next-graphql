import { typescriptApolloClient } from "@/lib/apolloClient";
import { gql } from '@/gql/gql';
import { useGetEventSchemaCountById, useGetEventSchemaCountByIdChartData } from "./useGetEventSchemaById";
import { adjustDateForTimezone } from "@/lib/utils";
import { ChartDataset } from "chart.js";

type IProps = {
    searchValue?: string;
    cached?: boolean;
    timezoneOffset: string;
}

const GetEventSchemas = gql(`
query GetEventSchemas {
  getEventSchemas {
    eventSchemaId
    eventName
  }
}
`);

const useGetEventSchemas = async ({ timezoneOffset, cached }: IProps) => {

    const { data: { getEventSchemas } } = await typescriptApolloClient.query({
        query: GetEventSchemas,
        fetchPolicy: cached ? "cache-first" : "network-only",
        context: {
            headers: {
                timedelta: timezoneOffset,
            },
        },
    });
    return getEventSchemas;
};

export const useGetEventSchemasChartData = async ({ timezoneOffset, searchValue }: IProps) => {

    const eventSchemaData = await useGetEventSchemas({ timezoneOffset, cached: !!searchValue });

    let schemas = await Promise.all(eventSchemaData.map(async (item) => {
        return await useGetEventSchemaCountByIdChartData({ timezoneOffset, cached: !!searchValue, id: item.eventSchemaId,days:3 }).then((count) => ({
            id: item.eventSchemaId,
            name: item.eventName,
            count: count,
        })
        )
    }))

    if (searchValue) {

        schemas = schemas.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.name
                    .toLowerCase()
                    .replaceAll("_", " ")
                    .includes(searchValue.toLowerCase())
            );
        });

    }

    const chartData = schemas.map((schema) => {
        return { schemaId: schema.id, schemaName: schema.name, datasets: schema.count.dataSets, labels: schema.count.labels };
    })
    return chartData;
}

export { useGetEventSchemas as default };