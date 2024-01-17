import AppEventCard from "@/components/AppEventCard";
import BrowserMockup from "@/components/BrowserMockup";
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
  //   console.log(getEventCount);

  //   function formatDate(date) {
  //     return date.toISOString().split("T")[0];
  //   }

  // Calculate the dates for the past 7 days, including today
  const today = new Date();
  const datesForLast7Days: string[] = [];
  for (let i = 2; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    datesForLast7Days.push(date.toLocaleDateString("en-CA"));
  }

  const allDates = getEventCount.map((item) => item.date);
  const allValues = getEventCount.map((item) =>
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
      <Box height={"600px"} width={"500px"}>
        <AppChartChart data={chartData} />
      </Box>
      <Box w={500} h={500}>
        <BrowserMockup imageUrl="/assets/mockup.png" />
      </Box>
    </HStack>
  );
}
