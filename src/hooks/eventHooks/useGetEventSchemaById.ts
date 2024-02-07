import { typescriptApolloClient } from "@/lib/apolloClient";
import { gql } from '@/gql/gql';
import { adjustDateForTimezone } from "@/lib/utils";
import { ChartDataset } from "chart.js";

type IProps = {
    id: number;
    cached: boolean;
    timezoneOffset: string;
    days?:number;
}

const GetEventSchemaCountById = gql(`
query GetEventSchemaCountById($eventSchemaId: Int!) {
  getEventCount(eventSchemaId: $eventSchemaId) {
    date
    data {
      countValue
      variantId
    }
  }
}
`);

const useGetEventSchemaCountById = async ({ timezoneOffset, cached, id }: IProps) => {

    const { data: { getEventCount } } = await typescriptApolloClient.query({
        query: GetEventSchemaCountById,
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
    return getEventCount;
};

const useGetEventSchemaCountByIdChartData = async ({ timezoneOffset, cached, id,days=0 }: IProps) => {
    const eventCount = await useGetEventSchemaCountById({ timezoneOffset, cached, id });
    const today = adjustDateForTimezone(new Date(), Number(timezoneOffset));
    const datesForLastDays: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        datesForLastDays.push(date.toLocaleDateString("en-CA"));
    }

    const datasets = datesForLastDays.reduce((acc, data, index) => {
        eventCount.map((schemaSetCount) => {
            schemaSetCount.data.map((variant) => {
                const variantId = variant.variantId;
                const idx = acc.findIndex((item) => item.variantId === variantId);
                if (idx === -1) {

                    acc.push({
                        variantId, dataSet: {
                            label: `Variant ${variantId}`,
                            data: new Array(datesForLastDays.length).fill(0),
                            backgroundColor:
                                variantId % 2 === 1
                                    ? "rgba(107, 70, 193, 0.5)"
                                    : "rgba(255, 175, 204,0.5)",
                            borderColor:
                                variantId % 2 === 1
                                    ? "rgb(107, 70, 193)"
                                    : "rgb(255, 175, 204)",
                            borderWidth: 1,
                        }
                    })

                }
                if (data === schemaSetCount.date) {
                    acc[idx].dataSet.data[index] = variant.countValue;
                }

            })

        })

        return acc;

    }, [] as { variantId: number; dataSet: ChartDataset<'bar', number[]> }[])

    const sortedDataSets: ChartDataset<'bar', number[]>[] = datasets.sort((a, b) => a.variantId - b.variantId).map((item) => item.dataSet);
    return {labels:datesForLastDays,dataSets:sortedDataSets}

}

export { useGetEventSchemaCountById,useGetEventSchemaCountByIdChartData }