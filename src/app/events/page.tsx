import AppEventCard from "@/components/AppEventCard";
import AppSearchBar from "@/components/AppSearchBar";
import AppChartChart from "@/components/charts/AppChartChart";
import { getApolloClient } from "@/lib/apolloClient";
import { getEventCountById, getEvents } from "@/lib/gqls";
import { HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const searchValue = searchParams.search;
  const client = getApolloClient();
  const { getEventSchemas } = await getEvents({ client });
  const promises = getEventSchemas.map((schema) => {
    return getEventCountById({ client, id: schema.eventSchemaId }).then(
      (count) => {
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
  const DAYS = 3;
  for (let i = DAYS - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    datesForLast7Days.push(date.toLocaleDateString("en-CA"));
  }

  return (
    <VStack
      overflow={"auto"}
      h={"100%"}
      w={"100%"}
      py={10}
      pl={8}
      align={"flex-start"}
    >
      <AppSearchBar searchValue={searchValue} />
      <HStack
        h={"100%"}
        w={"100%"}
        wrap={"wrap"}
        spacing={8}
        align={"flex-start"}
        py={10}
        overflow={"auto"}
      >
        {schemas
          .filter((item) => {
            if (!searchValue) {
              return true;
            }
            // Check if the query is included in the name or description
            return item.name.toLowerCase().includes(searchValue);
          })
          .map((schema) => {
            // const allDates = schema.count.map((item) => item.date);
            // const allValues = schema.count.map((item) =>
            //   item.data.map((v) => v.countValue)
            // );

            const datasets: any = [];

            datesForLast7Days.forEach((date, dateIndex) => {
              schema.count.forEach((event, eventIndex) => {
                event.data.forEach((variant, variantIndex) => {
                  if (!datasets[variantIndex]) {
                    datasets[variantIndex] = {
                      label: `Variant ${variantIndex + 1}`,
                      data: new Array(datesForLast7Days.length).fill(0), // Initialize with zeros
                      backgroundColor:
                        variantIndex % 2 === 0
                          ? "rgba(107, 70, 193, 0.5)"
                          : "rgba(255, 165, 0, 0.5)",
                      borderColor:
                        variantIndex % 2 === 0
                          ? "rgb(107, 70, 193)"
                          : "rgb(255, 165, 0)",
                      borderWidth: 1,
                    };
                  }
                  // Fill the dataset with actual values or zeros
                  if (date === event.date) {
                    datasets[variantIndex].data[dateIndex] = variant.countValue;
                  }
                });
              });
            });
            const chartData = {
              labels: datesForLast7Days,
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
                    <AppChartChart data={chartData} />
                  </VStack>
                </AppEventCard>
              </Link>
            );
          })}
      </HStack>
    </VStack>
  );
}
