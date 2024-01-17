import { Box, Center, Text, VStack } from "@chakra-ui/react";
import AppChartChart from "./charts/AppChartChart";
import { getEventCountById } from "@/lib/gqls";
import { getApolloClient } from "@/lib/apolloClient";

export default function AppEventCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = getApolloClient();
  return (
    <Box
      w={"370px"}
      h={"300px"}
      borderRadius="30px"
      overflow="hidden"
      bg={"gray.800"}
      py={6}
      px={6}
    >
      {children}
    </Box>
  );
}
