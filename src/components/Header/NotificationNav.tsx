import { HStack, Icon } from "@chakra-ui/react";
import {
  RiMoonClearLine,
  RiNotification2Line,
  RiSunLine,
} from "react-icons/ri";
import { useColorMode } from "@chakra-ui/react";

export default function NotificationNav() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Icon
        cursor="pointer"
        as={colorMode === "light" ? RiSunLine : RiMoonClearLine}
        fontSize="20"
        onClick={toggleColorMode}
      />
      <Icon as={RiNotification2Line} fontSize="20" />
    </HStack>
  );
}
