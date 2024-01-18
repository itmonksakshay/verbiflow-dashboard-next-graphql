"use client";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";

export default function AppSearchBar({ searchValue }: { searchValue: string }) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(searchValue || "");
  let debounceTimer: any;

  function debounce(func: any, delay: number) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
  }

  const handleSubmit = (val: string) => {
    setInputValue(val);
    debounce(() => {
      const link = `/events?search=${inputValue.toLowerCase()}`;
      router.replace(link);
    }, 1000);
  };
  return (
    <InputGroup w={"fit-content"}>
      <InputLeftElement pointerEvents="none">
        <MdOutlineSearch color="gray.300" />
      </InputLeftElement>
      <Input
        placeholder="Search by event name"
        _placeholder={{ color: "#eeeeee" }}
        value={inputValue}
        w={"400px"}
        onChange={(e) => {
          handleSubmit(e.target.value);
        }}
        borderColor={"purple.600"}
        focusBorderColor={"pink.200"}
      />
    </InputGroup>
  );
}
