import AppEventCard from "@/components/AppEventCard";
import AppSearchBar from "@/components/AppSearchBar";
import AppChartChart from "@/components/charts/AppChartChart";
import { HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { cookies } from "next/headers";
import { useGetEventSchemasChartData } from "@/hooks/eventHooks/useGetEventSchemas";


export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const nextCookies = cookies();
  const offsetValue = nextCookies.get("timezoneOffset")!.value;
  const searchValue = searchParams.search;
  const eventsChartData =await useGetEventSchemasChartData({searchValue,
    timezoneOffset: offsetValue})
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
        {eventsChartData && eventsChartData.map((event) => {
          const chartData = {
            labels: event.labels,
            datasets: event.datasets,
          };
          return (
            <Link key={event.schemaId} passHref href={`/events/${event.schemaId}`}>
              <AppEventCard>
                <VStack
                  spacing={4}
                  align={"flex-start"}
                  width={"100%"}
                  height={"100%"}
                >
                  <Text fontWeight={900} fontSize={20}>
                    {event.schemaName}
                  </Text>
                  <AppChartChart data={chartData} y_title="Events" />
                </VStack>
              </AppEventCard>
            </Link>
          );
        })}
      </HStack>
    </VStack>
  );
}
