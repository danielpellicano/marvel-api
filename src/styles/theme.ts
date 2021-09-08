import { extendTheme } from "@chakra-ui/react";
import "@fontsource/bebas-neue"; // Defaults to weight 400.

export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#D1D2DC",
    },
    green: {
      "300": "#00ffe6",
    },
    blue: {
      "900": "#1F0533",
    },
  },
  fonts: {
    heading: "Bebas Neue",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.100",
      },
      label: {
        color: "gray.100",
      },
    },
  },
});
