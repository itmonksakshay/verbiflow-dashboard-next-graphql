"use client";
import { Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function AppSearchBar({ searchValue }: { searchValue: string }) {
  const router = useRouter();

  const handleSubmit = (val: string) => {
    const link = `/events?search=${val.trim().toLowerCase()}`;
    router.replace(link);
  };
  return (
    <Input
      value={searchValue || ""}
      w={"400px"}
      onChange={(e) => {
        handleSubmit(e.target.value);
      }}
    />
  );
}
