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
      height={"100%"}
      width={"100%"}
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
            color="white"
            bg="#4B5563"
            borderColor="transparent"
            borderRadius="md"
            _hover={{ bg: "#4B5563", borderColor: "transparent" }}
            _focus={{
              bg: "#4B5563",
              borderColor: "transparent",
              boxShadow: "none",
            }}
            width="100%"
            pr="10"
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
      <Image
        src={imageUrl}
        alt="Displayed content"
        width={"100%"}
        height={"100%"}
      />
    </Box>
  );
}
