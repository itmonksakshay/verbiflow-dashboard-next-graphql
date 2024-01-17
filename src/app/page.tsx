import AppChartChart from "@/components/charts/AppChartChart";
import { getApolloClient } from "@/lib/apolloClient";
import {
  getUniqueVisitors,
  getCountryCityStats,
  getAverageSessions,
  getEvents,
  getUniqueVisitorsByDate,
} from "@/lib/gqls";
import { Center, HStack, Text, VStack } from "@chakra-ui/react";
import AppCard from "@/components/AppCard";
import AppPieChart from "@/components/charts/AppPieChart";
export default async function Page() {
  const client = getApolloClient();
  let today = new Date();
  let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // en-CA uses YYYY-MM-DD
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const todayVisitors = (
    await getUniqueVisitorsByDate({
      date: today.toLocaleDateString("en-CA"),
      client,
    })
  ).getUniqueVisitorCount;
  const yesterdayVisitors = (
    await getUniqueVisitorsByDate({
      date: yesterday.toLocaleDateString("en-CA"),
      client,
    })
  ).getUniqueVisitorCount;
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
        backgroundColor: "rgba(107, 70, 193, 0.5)",
        borderColor: "rgba(107, 70, 193, 1)",
        borderWidth: 1,
      },
    ],
  };
  const uniqueCountries: Record<string, any> = {};
  const { getEventByCountryCity } = await getCountryCityStats({ client });
  getEventByCountryCity.forEach((event) => {
    const key = event.country;
    if (key === "-") {
      return;
    }
    if (uniqueCountries[key]) {
      uniqueCountries[key].count += event.count;
    } else {
      uniqueCountries[key] = {
        country: event.country,
        city: event.city,
        count: event.count,
      };
    }
  });
  const sortedData = Object.values(uniqueCountries).sort(
    (a, b) => b.count - a.count
  );
  const locationLabels = sortedData.map((event) => event.country);
  const locationCounts = sortedData.map((event) => event.count);
  const countryCityChartData = {
    labels: locationLabels,
    datasets: [
      {
        label: "Users",
        data: locationCounts,
        // backgroundColor: "rgba(107, 70, 193, 0.5)",
        // borderColor: "rgba(107, 70, 193, 1)",
        borderWidth: 1,
      },
    ],
  };
  const { getAverageSessionTime } = await getAverageSessions({ client });

  return (
    <HStack
      h={"100%"}
      w={"100%"}
      justify={"center"}
      spacing={8}
      align={"flex-start"}
      py={20}
    >
      <AppCard>
        <VStack spacing={4} align={"center"} width={"100%"} height={"100%"}>
          <Text fontWeight={900} fontSize={20}>
            Daily Active Users
          </Text>
          <Text fontWeight={900} fontSize={20}>
            {todayVisitors + yesterdayVisitors} in 24h
          </Text>
          <Center h={"100%"} w={"100%"}>
            <AppChartChart data={uniqueVisitorsChartData} y_label=" Users" />
          </Center>
        </VStack>
      </AppCard>
      <AppCard>
        <VStack spacing={4} align={"center"} width={"100%"} height={"90%"}>
          <Text fontWeight={900} fontSize={20}>
            Breakdown of users by country
          </Text>
          <Center h={"100%"} w={"100%"}>
            <AppPieChart data={countryCityChartData} />
          </Center>
        </VStack>
      </AppCard>
      <AppCard>
        <VStack spacing={4} align={"center"} width={"100%"} height={"90%"}>
          <Text fontWeight={900} fontSize={20}>
            Average session length
          </Text>
          <Center h={"100%"} w={"100%"}>
            <HStack align={"end"}>
              <Text
                fontWeight={900}
                fontSize={"50px"}
                lineHeight={"50px"}
                color={"purple.600"}
              >
                {getAverageSessionTime}
              </Text>
              <Text fontWeight={900} fontSize={"35px"} lineHeight={"45px"}>
                s
              </Text>
            </HStack>
          </Center>
        </VStack>
      </AppCard>
    </HStack>
  );
}
