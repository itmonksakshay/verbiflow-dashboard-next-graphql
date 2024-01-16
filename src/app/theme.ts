import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    btn: {
      grad: "linear-gradient(to right, rgb(215, 174, 251), rgb(255, 175, 204))",
      grad_hover:
        "linear-gradient(to right, rgba(215, 174, 251, 0.85), rgba(255, 175, 204, 0.85))",
    },
  },
});
