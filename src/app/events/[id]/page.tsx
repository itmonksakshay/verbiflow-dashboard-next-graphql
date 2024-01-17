import AppEventCard from "@/components/AppEventCard";
import AppChartChart from "@/components/charts/AppChartChart";
import { getApolloClient } from "@/lib/apolloClient";
import { getEventCountById, getEvents } from "@/lib/gqls";
import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";

export default async function Page({ params }: { params: { id: string } }) {
  const client = getApolloClient();
  const schemaId = params.id;
  const { getEventCount } = await getEventCountById({
    client,
    id: Number(schemaId),
  });

  const chartLabels = getEventCount.map((item) => item.date);
  const chartCounts = getEventCount.map((item) =>
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
    <HStack
      h={"100%"}
      w={"100%"}
      wrap={"wrap"}
      align={"center"}
      justifyContent={"space-around"}
      py={20}
      px={8}
      overflow={"auto"}
    >
      <Box height={"90%"}>
        <AppChartChart data={chartData} />
      </Box>
      <Box border={"1px solid whitesmoke"}>
        <iframe src="https://verbiflow.com/" width="500" height="500"></iframe>
      </Box>
    </HStack>
  );
}
