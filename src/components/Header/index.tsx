import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { Profile } from "./Profile";
import NotificationNav from "./NotificationNav";
import SearchBox from "./SearchBox";
import Logo from "./Logo";
import { SetStateAction } from "react";
import { Dispatch } from "react-dom/node_modules/@types/react";

interface PropsSearch {
  id: number;
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

export function Header({
  setDataSearch,
  setResultData,
  handleSearch,
}: {
  setDataSearch: Dispatch<SetStateAction<string>>;
  setResultData: Dispatch<SetStateAction<PropsSearch>>;
  handleSearch: Function;
}) {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth="1480"
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Logo />

      <SearchBox
        setDataSearch={setDataSearch}
        setResultData={setResultData}
        handleSearch={handleSearch}
      />

      <Flex align="center" ml="auto">
        <NotificationNav />

        <Profile />
      </Flex>
    </Flex>
  );
}
