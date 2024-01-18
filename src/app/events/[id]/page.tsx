import AppEventCard from "@/components/AppEventCard";
import BrowserMockup from "@/components/BrowserMockup";
import AppChartChart from "@/components/charts/AppChartChart";
import { getApolloClient } from "@/lib/apolloClient";
import { getEventCountById, getEventSchemaName } from "@/lib/gqls";
import {
  Box,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

export default async function Page({ params }: { params: { id: string } }) {
  const client = getApolloClient();
  const schemaId = params.id;
  const { getEventSchema } = await getEventSchemaName({
    client,
    id: Number(schemaId),
  });
  const { getEventCount } = await getEventCountById({
    client,
    id: Number(schemaId),
    cached: false,
  });
  const today = new Date();
  const datesForLastDays: string[] = [];
  const DAYS = 7;
  for (let i = DAYS - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    datesForLastDays.push(date.toLocaleDateString("en-CA"));
  }
  const datasetsMap: any = {}; // Use an object to map variantIds to datasets

  datesForLastDays.forEach((date, dateIndex) => {
    getEventCount.forEach((event) => {
      event.data.forEach((variant) => {
        const variantId = variant.variantId; // Use variantId directly as the key
        if (!datasetsMap[variantId]) {
          datasetsMap[variantId] = {
            label: `Variant ${variantId}`,
            data: new Array(datesForLastDays.length).fill(0), // Initialize with zero
            backgroundColor:
              variantId % 2 === 1
                ? "rgba(107, 70, 193, 0.5)"
                : "rgba(255, 175, 204,0.5)",
            borderColor:
              variantId % 2 === 1 ? "rgb(107, 70, 193)" : "rgb(255, 175, 204)",
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
    <VStack w={"100%"} h={"100%"} py={4}>
      <Text fontWeight={900} fontSize={20}>
        {getEventSchema.eventName}
      </Text>
      <HStack
        h={"100%"}
        w={"100%"}
        wrap={"wrap"}
        align={"center"}
        justifyContent={"space-around"}
        px={8}
      >
        <Box height={"75%"} maxHeight={"750px"} width={"600px"}>
          <AppChartChart data={chartData} y_title="Events" />
        </Box>
        <VStack gap={4} justifyContent={"center"} alignItems={"center"}>
          <Box width={"350px"} height={"100%"} maxHeight={"400px"}>
            <BrowserMockup imageUrl="/assets/mockup.png" />
          </Box>
          <AppEventCard width="400px">
            <VStack align={"center"} width={"100%"} height={"100%"}>
              <Text fontWeight={900} fontSize={20}>
                Metadata Comparison
              </Text>
              <TableContainer whiteSpace={"wrap"}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th color={"purple.500"}>Name</Th>
                      <Th color={"purple.500"}>Attribute</Th>
                      <Th color={"purple.500"} isNumeric>
                        Value
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>metadata name</Td>
                      <Td>Average length IF STRING</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>metadata 2 name</Td>
                      <Td>Mean IF NUMBER</Td>
                      <Td isNumeric>30.48</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </AppEventCard>
        </VStack>
      </HStack>
    </VStack>
  );
}
