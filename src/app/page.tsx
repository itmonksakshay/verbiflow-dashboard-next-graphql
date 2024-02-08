import AppChartChart from "@/components/charts/AppChartChart";
import { getApolloClient } from "@/lib/apolloClient";
import { Center, HStack, Text, VStack } from "@chakra-ui/react";
import AppCard from "@/components/AppCard";
import AppPieChart from "@/components/charts/AppPieChart";
import { cookies } from "next/headers";
import { adjustDateForTimezone } from "@/lib/utils";
import { useGetUniqueVisitorsChartData } from "@/hooks/visitorsHooks/useGetUniqueVisitorsInterval";
import { useGetUniqueVisitorCount } from "@/hooks/visitorsHooks/useGetUniqueVisitorsCount";
import { useGetCountryCityChartData } from "@/hooks/countryHooks/useEventByCountryCityStats";
import useGetAverageSessionTime from "@/hooks/sessionHooks/useGetAverageSessionTime";
export default async function Page() {

  const nextCookies = cookies();
  const offsetValue = nextCookies.get("timezoneOffset")!.value;
  const today = adjustDateForTimezone(new Date(), Number(offsetValue));
  let weekAgo = new Date(today);
  let yesterday = new Date(today);
  weekAgo.setDate(yesterday.getDate() - 7);
  yesterday.setDate(yesterday.getDate() - 1);


  const todayVisitors = await useGetUniqueVisitorCount({ timezoneOffset: offsetValue, date: today.toLocaleDateString("en-CA") });
  const yesterdayVisitors = await useGetUniqueVisitorCount({ timezoneOffset: offsetValue, date: yesterday.toLocaleDateString("en-CA") });

  //Get UniqueVisitorsChartData
  const uniqueVisitorsChartData = await useGetUniqueVisitorsChartData({
    startingDate: weekAgo.toLocaleDateString("en-CA"),
    endingDate: today.toLocaleDateString("en-CA"),
    timezoneOffset: offsetValue
  });

  const countryCityChartData = await useGetCountryCityChartData({
    timezoneOffset: offsetValue,
  });

  const getAverageSessionTime = await useGetAverageSessionTime({
    timezoneOffset: offsetValue,
  });

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

          <VStack gap={0}>
            <Text fontWeight={700} fontSize={25} color={"purple.600"}>
              {todayVisitors + yesterdayVisitors}
            </Text>
            <Text fontWeight={700} fontSize={14} color={"gray.400"}>
              in 24h
            </Text>
          </VStack>
          <Center h={"100%"} w={"100%"}>
            <AppChartChart data={uniqueVisitorsChartData} y_title="Users" />
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
              <Text
                fontWeight={900}
                fontSize={"35px"}
                lineHeight={"45px"}
                color={"gray.400"}
              >
                s
              </Text>
            </HStack>
          </Center>
        </VStack>
      </AppCard>
    </HStack>
  );
}
