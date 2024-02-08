import AppEventCard from "@/components/AppEventCard";
import BrowserMockup from "@/components/BrowserMockup";
import AppChartChart from "@/components/charts/AppChartChart";
import { getApolloClient } from "@/lib/apolloClient";
import { getEventSchemaName } from "@/lib/gqls";
import {
  Box,
  Center,
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
  Flex
} from "@chakra-ui/react";
import { cookies } from "next/headers";
import dynamic from 'next/dynamic';

const FilterTagComponent = dynamic(() => import("@/components/FilterTagComponent"), { ssr: false });

export default async function Page({ params }: { params: { id: string } }) {

  const nextCookies = cookies();
  const offsetValue = nextCookies.get("timezoneOffset")!.value;
  const client = getApolloClient();
  const schemaId = params.id;
  const { getEventSchema } = await getEventSchemaName({
    client,
    id: Number(schemaId),
    timezoneOffset: offsetValue,
  });

  return (
    <VStack w={"100%"} h={"100%"} overflow={"auto"}>
      <Text fontWeight={900} fontSize={20} marginTop={"10px"} >
          {getEventSchema.eventName}
      </Text>
       {/* Align FilterTagComponent to the left */}
      <Flex w={"100%"} justifyContent={"flex-start"} px={8}>
        <FilterTagComponent eventSchemaId={Number(schemaId)} timezoneOffset={offsetValue} />
      </Flex>

      <Center w={"100%"} h={"100%"} overflow={"auto"}>
        <VStack w={"100%"} h={"100%"}>
          
          <HStack
            h={"100%"}
            w={"100%"}
            wrap={"wrap"}
            align={"center"}
            justifyContent={"space-around"}
            px={8}
          >
            <Box height={"600px"} width={"60%"} id="filterBarChart">
            </Box>
            <VStack gap={3} h={'full'} justifyContent={"center"} alignItems={"center"}>
              <Box width={"390px"} height={"100%"} maxHeight={"400px"}>
                <BrowserMockup imageUrl="/assets/mockup.png" />
              </Box>
              {/* <AppEventCard width="400px">
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
              </AppEventCard> */}
            </VStack>
          </HStack>
        </VStack>
      </Center>
    </VStack>
  );
}
