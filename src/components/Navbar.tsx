"use client";
import { VStack, Button, Icon } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdAnalytics } from "react-icons/md";
export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <VStack py={8} px={4} spacing={5}>
      <Image
        src={"/assets/verbiflow-logo.png"}
        alt="logo"
        width={149}
        height={129}
        style={{ marginBottom: "16px" }}
      />

        <Button
          justifyContent={"space-between"}
          width={160}
          size={"lg"}
          px={6}
          bg={isActive("/") ? "btn.grad" : undefined}
          color={isActive("/") ? "purple.600" : "white"}
          colorScheme={isActive("/") ? undefined : "grey"}
          _hover={
            isActive("/") ? { bg: "btn.grad_hover" } : { color: "gray.300" }
          }
          leftIcon={<Icon as={MdDashboard} boxSize={8} />}
          onClick={() => {
            document.location.href = '/';
          }}
        
        >
          Home
        </Button>
      <Link href="/events" passHref>
        <Button
          justifyContent={"space-between"}
          width={160}
          size={"lg"}
          px={6}
          bg={isActive("/events") ? "btn.grad" : undefined}
          color={isActive("/events") ? "purple.600" : "white"}
          colorScheme={isActive("/events") ? undefined : "grey"}
          _hover={
            isActive("/events")
              ? { bg: "btn.grad_hover" }
              : { color: "gray.300" }
          }
          leftIcon={<Icon as={MdAnalytics} boxSize={8} />}
        >
          Events
        </Button>
      </Link>
    </VStack>
  );
}
