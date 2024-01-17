import { Box } from "@chakra-ui/react";

export default function AppEventCard({
  children,
  width,
}: {
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <Box
      w={width || "370px"}
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
