import { Box } from "@chakra-ui/react";

export default function AppEventCard({
  children,
}: {
  children: React.ReactNode;
}) {
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
