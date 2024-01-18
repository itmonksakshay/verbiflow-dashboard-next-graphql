"use client";
import { Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AppSearchBar({ searchValue }: { searchValue: string }) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(searchValue);
  let debounceTimer: any;

  function debounce(func: any, delay: number) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
  }

  const handleSubmit = (val: string) => {
    setInputValue(val.trim());
    debounce(() => {
      const link = `/events?search=${inputValue.toLowerCase()}`;
      router.replace(link);
    }, 1000);
  };
  return (
    <Input
      value={inputValue}
      w={"400px"}
      onChange={(e) => {
        handleSubmit(e.target.value);
      }}
    />
  );
}
