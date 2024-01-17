"use client";
import { Flex, Box, Circle, Icon, Image } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

export default function BrowserMockup({ imageUrl }: { imageUrl: string }) {
  return (
    <Box
      border="1px"
      borderColor="gray.300"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
    >
      <Flex
        bg="gray.100"
        p={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box> {/* Placeholder for the address bar */} </Box>
        <Circle size="30px" bg="red.500" color="white">
          <Icon as={AiOutlineClose} />
        </Circle>
      </Flex>
      <Image src={imageUrl} alt="Displayed content" />
    </Box>
  );
}
