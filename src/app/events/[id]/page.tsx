import AppEventCard from "@/components/AppEventCard";
import BrowserMockup from "@/components/BrowserMockup";
import AppChartChart from "@/components/charts/AppChartChart";
import { getApolloClient } from "@/lib/apolloClient";
import { getEventCountById } from "@/lib/gqls";
import {
  Box,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

export default async function Page({ params }: { params: { id: string } }) {
  const client = getApolloClient();
  const schemaId = params.id;
  const { getEventCount } = await getEventCountById({
    client,
    id: Number(schemaId),
  });
  const today = new Date();
  const datesForLast7Days: string[] = [];
  const DAYS = 3;
  for (let i = DAYS - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    datesForLast7Days.push(date.toLocaleDateString("en-CA"));
  }
  const datasets: any = [];
  datesForLast7Days.forEach((date, dateIndex) => {
    getEventCount.forEach((event, eventIndex) => {
      event.data.forEach((variant, variantIndex) => {
        if (!datasets[variantIndex]) {
          datasets[variantIndex] = {
            label: `Variant ${variantIndex + 1}`,
            data: new Array(datesForLast7Days.length).fill(0), // Initialize with zeros
            backgroundColor:
              variantIndex % 2 === 0
                ? "rgba(107, 70, 193, 0.5)"
                : "rgba(255, 165, 0, 0.5)",
            borderColor:
              variantIndex % 2 === 0 ? "rgb(107, 70, 193)" : "rgb(255, 165, 0)",
            borderWidth: 1,
          };
        }
        // Fill the dataset with actual values or zeros
        if (date === event.date) {
          datasets[variantIndex].data[dateIndex] = variant.countValue;
        }
      });
    });
  });

  const chartData = {
    labels: datesForLast7Days, // Use the last 7 days as labels
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
      <VStack>
        <Box w={500} h={500}>
          <BrowserMockup imageUrl="/assets/mockup.png" />
        </Box>
        <AppEventCard width="500px">
          <VStack spacing={4} align={"center"} width={"100%"} height={"100%"}>
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
                {/* <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot> */}
              </Table>
            </TableContainer>
          </VStack>
        </AppEventCard>
      </VStack>
    </HStack>
  );
}
