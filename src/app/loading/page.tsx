"use client";

import { setCookieClientSide } from "@/lib/utils";
import { Center, Spinner } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const to = searchParams.get("to");
  useEffect(() => {
    setCookieClientSide(
      "timezoneOffset",
      String(-new Date().getTimezoneOffset() / 60),
      365
    );
    router.replace(to || "/");
  }, [router, to]);

  return (
    <Center>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple.600"
        size="xl"
      />
    </Center>
  );
}
