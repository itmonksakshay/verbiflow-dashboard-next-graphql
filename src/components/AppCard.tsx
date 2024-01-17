import { Box } from "@chakra-ui/react";

export default function AppCard({ children }: { children: React.ReactNode }) {
  return (
    <Box
      w={"370px"}
      h={"600px"}
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
