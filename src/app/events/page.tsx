import AppEventCard from "@/components/AppEventCard";
import AppChartChart from "@/components/charts/AppChartChart";
import { getApolloClient } from "@/lib/apolloClient";
import { getEventCountById, getEvents } from "@/lib/gqls";
import { HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default async function Page() {
  const client = getApolloClient();
  const { getEventSchemas } = await getEvents({ client });
  const promises = getEventSchemas.map((schema) => {
    return getEventCountById({ client, id: schema.eventSchemaId }).then(
      (count) => {
        // Return an object containing both the count and the name
        return {
          id: schema.eventSchemaId,
          name: schema.eventName,
          count: count.getEventCount,
        };
      }
    );
  });
  const schemas = await Promise.all(promises);
  const today = new Date();
  const datesForLast7Days: string[] = [];
  for (let i = 2; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    datesForLast7Days.push(date.toLocaleDateString("en-CA"));
  }
  return (
    <HStack
      h={"100%"}
      w={"100%"}
      wrap={"wrap"}
      spacing={8}
      align={"flex-start"}
      py={20}
      pl={8}
      overflow={"auto"}
    >
      {schemas.map((schema) => {
        const allDates = schema.count.map((item) => item.date);
        const allValues = schema.count.map((item) =>
          item.data.map((v) => v.countValue)
        );
        const initializedDataset: any[] = datesForLast7Days.map((date) => ({
          date,
          values: [],
        }));

        allDates.forEach((date, index) => {
          const datasetIndex = datesForLast7Days.indexOf(date);
          if (datasetIndex !== -1) {
            initializedDataset[datasetIndex].values = allValues[index];
          }
        });
        const datasets: any = [];

        initializedDataset.forEach((dayData, index) => {
          dayData.values.forEach((value: any, valueIndex: any) => {
            if (!datasets[valueIndex]) {
              datasets[valueIndex] = {
                label: `Variant ${valueIndex + 1}`,
                data: new Array(initializedDataset.length).fill(null),
                backgroundColor:
                  (valueIndex + 1) % 2 === 1
                    ? "rgba(107, 70, 193, 0.5)"
                    : "rgba(255, 165, 0, 0.5)",
                borderColor:
                  (valueIndex + 1) % 2 === 1
                    ? "rgb(107, 70, 193)"
                    : "rgb(255, 165, 0)",
                borderWidth: 1,
              };
            }
            datasets[valueIndex].data[index] = value;
          });
        });

        const chartData = {
          labels: initializedDataset.map((day) => day.date),
          datasets: datasets,
        };

        return (
          <Link key={schema.id} passHref href={`/events/${schema.id}`}>
            <AppEventCard>
              <VStack
                spacing={4}
                align={"flex-start"}
                width={"100%"}
                height={"100%"}
              >
                <Text fontWeight={900} fontSize={20}>
                  {schema.name}
                </Text>
                {/* <Center h={"100%"} w={"100%"}> */}
                <AppChartChart data={chartData} />
                {/* </Center> */}
              </VStack>
            </AppEventCard>
          </Link>
        );
      })}
    </HStack>
  );
}
