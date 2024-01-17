import AppEventCard from "@/components/AppEventCard";
import AppChartChart from "@/components/charts/AppChartChart";
import { getApolloClient } from "@/lib/apolloClient";
import { getEventCountById, getEvents } from "@/lib/gqls";
import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";

export default async function Home() {
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
  // console.log(counts[0]);
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
        const chartLabels = schema.count.map((item) => item.date);
        const chartCounts = schema.count.map((item) =>
          item.data.map((v) => v.countValue)
        );
        const datasets: any = [];

        chartCounts.forEach((valueArray, index) => {
          valueArray.forEach((value, valueIndex) => {
            if (!datasets[valueIndex]) {
              datasets[valueIndex] = {
                label: `Variant ${valueIndex + 1}`,
                data: new Array(chartLabels.length).fill(null),
                // backgroundColor: "rgba(107, 70, 193 0.5)",
                // borderColor: "rgba(107, 70, 193, 1)",
                // borderWidth: 1,
                backgroundColor:
                  valueIndex + (1 % 2) == 1
                    ? "rgb(107, 70, 193,0.5)"
                    : "rgb(255, 165, 0,0.5)",
                borderColor:
                  valueIndex + (1 % 2) == 1
                    ? "rgb(107, 70, 193)"
                    : "rgb(255, 165, 0)",
                borderWidth: 1,
              };
            }
            datasets[valueIndex].data[index] = value;
          });
        });

        const chartData = {
          labels: chartLabels,
          datasets: datasets,
        };

        return (
          <AppEventCard key={schema.id}>
            <VStack
              spacing={4}
              align={"flex-start"}
              width={"100%"}
              height={"100%"}
            >
              <Text fontWeight={900} fontSize={20}>
                {schema.name}
              </Text>
              <Center h={"100%"} w={"100%"}>
                <AppChartChart data={chartData} />
              </Center>
            </VStack>
          </AppEventCard>
        );
      })}
    </HStack>
  );
}
