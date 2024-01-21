import AppEventCard from "@/components/AppEventCard";
import AppSearchBar from "@/components/AppSearchBar";
import AppChartChart from "@/components/charts/AppChartChart";
import { getApolloClient } from "@/lib/apolloClient";
import { getEventCountById, getEvents } from "@/lib/gqls";
import { HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { cookies } from "next/headers";
import { adjustDateForTimezone } from "@/lib/utils";
export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const nextCookies = cookies();
  const offsetValue = nextCookies.get("timezoneOffset")!.value;
  const searchValue = searchParams.search;
  const client = getApolloClient();
  const { getEventSchemas } = await getEvents({
    client,
    cached: !!searchValue,
    timezoneOffset: offsetValue,
  });
  const promises = getEventSchemas.map((schema) => {
    return getEventCountById({
      client,
      id: schema.eventSchemaId,
      cached: !!searchValue,
      timezoneOffset: offsetValue,
    }).then((count) => {
      return {
        id: schema.eventSchemaId,
        name: schema.eventName,
        count: count.getEventCount,
      };
    });
  });
  let schemas = await Promise.all(promises);
  const today = adjustDateForTimezone(new Date(), Number(offsetValue));
  const datesForLastDays: string[] = [];
  const DAYS = 3;
  for (let i = DAYS - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    datesForLastDays.push(date.toLocaleDateString("en-CA"));
  }
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
        {schemas.map((schema) => {
          const datasetsMap: any = {};

          datesForLastDays.forEach((date, dateIndex) => {
            schema.count.forEach((event) => {
              event.data.forEach((variant) => {
                const variantId = variant.variantId;
                if (!datasetsMap[variantId]) {
                  datasetsMap[variantId] = {
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
                  };
                }
                if (date === event.date) {
                  datasetsMap[variantId].data[dateIndex] = variant.countValue;
                }
              });
            });
          });
          const datasets = Object.values(datasetsMap).sort((a: any, b: any) => {
            const aId = parseInt(a.label.replace("Variant ", ""), 10);
            const bId = parseInt(b.label.replace("Variant ", ""), 10);
            return aId - bId;
          });
          const chartData = {
            labels: datesForLastDays,
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
