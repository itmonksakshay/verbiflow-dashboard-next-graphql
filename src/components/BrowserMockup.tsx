"use client";
import { Flex, Box, Circle, Icon, Image, Input } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function BrowserMockup({ imageUrl }: { imageUrl: string }) {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <Image
        src={"/assets/verbiflow-logo.png"}
        alt="Displayed content"
        onClick={() => {
          setOpen(true);
        }}
      />
    );
  }
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
        <Box>
          <Input
            value="https://verbiflow.com"
            readOnly
            color="white" // Text color
            bg="#4B5563" // A grayish tone, similar to Chrome's search bar; adjust as needed
            borderColor="transparent" // To remove any default border styling
            borderRadius="md" // Medium rounded corners
            _hover={{ bg: "#4B5563", borderColor: "transparent" }} // Maintain styles on hover
            _focus={{
              bg: "#4B5563",
              borderColor: "transparent",
              boxShadow: "none",
            }} // Maintain styles on focus
            width="full" // Full width of the container
            pr="10" // Padding right to make room for the close button
          />
        </Box>
        <Circle
          size="30px"
          bg="red.500"
          color="white"
          onClick={() => {
            setOpen(false);
          }}
        >
          <Icon as={AiOutlineClose} />
        </Circle>
      </Flex>
      <Image src={imageUrl} alt="Displayed content" />
    </Box>
  );
}
