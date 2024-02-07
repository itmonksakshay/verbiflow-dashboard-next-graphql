
import { typescriptApolloClient } from "@/lib/apolloClient";
import { gql } from '@/gql/gql';
import { ChartData } from "chart.js";

type IProps = {
    startingDate:string;
    endingDate:string;
    timezoneOffset:string;
}

const getUniqueVisitorsInterval = gql(/* GraphQL */ `
query GetUniqueVisitorsInterval(
  $startingDate: String!
  $endingDate: String!
) {
  getUniqueVisitorsInterval(
    startingDate: $startingDate
    endingDate: $endingDate
  ) {
    date
    count
  }
}
`);


const useGetUniqueVisitorsInterval = async({startingDate,endingDate,timezoneOffset}:IProps)=>{


    const {data:{getUniqueVisitorsInterval:uniqueVisitorsInterval}} =  await typescriptApolloClient.query({
        query:getUniqueVisitorsInterval,
        variables: { startingDate:startingDate, endingDate:endingDate },
        fetchPolicy: "network-only",
        context: {
          headers: {
            timedelta: timezoneOffset,
          },
        },
      });

      return uniqueVisitorsInterval;
    
}

const useGetUniqueVisitorsChartData=async({startingDate,endingDate,timezoneOffset}:IProps)=>{

    const uniqueVisitorsInterval = await useGetUniqueVisitorsInterval({startingDate,endingDate,timezoneOffset})

    const uniqueVisitorsLabels = uniqueVisitorsInterval.map(
        (item) => item.date
      );
      const uniqueVisitorsDataPoints = uniqueVisitorsInterval.map(
        (item) => item.count
      );
      const uniqueVisitorsChartData:ChartData<'bar',number[]> = {
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


    return  uniqueVisitorsChartData;
}

export { useGetUniqueVisitorsInterval as default,useGetUniqueVisitorsChartData};