import { Center, HStack } from "@chakra-ui/react";
import { fonts } from "./fonts";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VerbiFlow Dashboard",
  description: "VerbiFlow dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // if (process.env.GRAPHQL_ENDPOINT === undefined) {
  //   throw new Error("graphql endpoint url is missing in env");
  // }
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <Providers>
          <Center bg={"gray.800"} color={"whitesmoke"} height={"100vh"}>
            <HStack width={"100%"} height={"100%"} align={"flex-start"}>
              <Navbar />
              <Center bg={"gray.900"} height={"100%"} width={"100%"}>
                {children}
              </Center>
            </HStack>
          </Center>
        </Providers>
      </body>
    </html>
  );
}
