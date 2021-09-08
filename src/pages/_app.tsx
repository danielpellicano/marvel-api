import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;
