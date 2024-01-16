import AppChartChart from "@/components/AppChartChart";
import AppPieChart from "@/components/AppPieChart";
import { getApolloClient } from "@/lib/apolloClient";
import {
  getUniqueVisitorsByDate,
  getUniqueVisitors,
  getCountryCityStats,
} from "@/lib/gqls";
import { Box, Container, HStack, Text, VStack } from "@chakra-ui/react";
export default async function Home() {
  const client = getApolloClient();
  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // en-CA uses YYYY-MM-DD
  const { getUniqueVisitorCount } = await getUniqueVisitorsByDate({
    date: yesterday.toLocaleDateString("en-CA"),
    client,
  });
  const { getUniqueVisitorsInterval } = await getUniqueVisitors({
    startingDate: firstDayOfMonth.toLocaleDateString("en-CA"),
    endingDate: today.toLocaleDateString("en-CA"),
    client,
  });
  const uniqueVisitorsLabels = getUniqueVisitorsInterval.map(
    (item) => item.date
  );
  const uniqueVisitorsDataPoints = getUniqueVisitorsInterval.map(
    (item) => item.count
  );
  const uniqueVisitorsChartData = {
    labels: uniqueVisitorsLabels,
    datasets: [
      {
        label: "Unique Visitors",
        data: uniqueVisitorsDataPoints,
        backgroundColor: "rgba(107, 70, 193 0.5)",
        borderColor: "rgba(107, 70, 193, 1)",
        borderWidth: 1,
      },
    ],
  };
  const uniqueCities: Record<string, any> = {};
  const { getEventByCountryCity } = await getCountryCityStats({ client });
  getEventByCountryCity.forEach((event) => {
    const key = `${event.country}-${event.city}`;
    if (uniqueCities[key]) {
      uniqueCities[key].count += event.count;
    } else {
      uniqueCities[key] = {
        country: event.country,
        city: event.city,
        count: event.count,
      };
    }
  });
  const sortedData = Object.values(uniqueCities).sort(
    (a, b) => b.count - a.count
  );
  const locationLabels = sortedData.map((event) => event.city);
  const locationCounts = sortedData.map((event) => event.count);
  const countryCityChartData = {
    labels: locationLabels,
    datasets: [
      {
        label: "Event Counts by City",
        data: locationCounts,
      },
    ],
  };
  return (
    <HStack h={"100%"} w={"100%"} spacing={4} px={8}>
      <Box
        w={"30%"}
        h={"432px"}
        borderRadius="30px"
        overflow="hidden"
        bg={"gray.800"}
        py={8}
        px={8}
      >
        <VStack spacing={4} align={"flex-start"} width={"100%"} height={"100%"}>
          <Text fontWeight={900}>Daily Active Users (DAU)</Text>
          <HStack justify={"space-around"} width={"100%"}>
            <VStack>
              <Text>
                {getUniqueVisitorCount}{" "}
                {getUniqueVisitorCount === 1 ? "user" : "users"}
              </Text>
              <Text>Yesterday</Text>
            </VStack>
            <Text>from {firstDayOfMonth.toLocaleDateString("en-CA")}</Text>
          </HStack>
          <AppChartChart data={uniqueVisitorsChartData} />
        </VStack>
      </Box>
      <Box
        w={"30%"}
        h={"432px"}
        borderRadius="30px"
        overflow="hidden"
        bg={"gray.800"}
        py={8}
        px={8}
      >
        <VStack spacing={4} align={"flex-start"} width={"100%"} height={"90%"}>
          <Text fontWeight={900} mb={6}>
            Breakdown of users by country
          </Text>
          <AppChartChart data={countryCityChartData} />
        </VStack>
      </Box>
    </HStack>
  );
}
