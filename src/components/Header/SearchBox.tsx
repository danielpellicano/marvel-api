import { Flex, Icon, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useRef } from "react";
import { RiSearchLine } from "react-icons/ri";
interface PropsSearch {
  id: number;
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

export default function SearchBox({
  setDataSearch,
  setResultData,
  handleSearch,
}: {
  setDataSearch: Dispatch<SetStateAction<string>>;
  setResultData: Dispatch<SetStateAction<PropsSearch>>;
  handleSearch: Function;
}) {
  const getCharacters = (e: string) => {
    setDataSearch(e);
  };

  const searchRef: any = useRef();

  const hash = "bd0722d5750b6362d5ba0212ca36726b";
  const _handleKeyDown = function (e: any) {
    if (e.key === "Enter") {
      console.log(e);
    }
  };

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="105"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        onChange={(e) =>
          e.target.value === "" && setResultData({} as PropsSearch)
        }
        placeholder="Buscar Personagem"
        _placeholder={{ color: "gray.400" }}
        // onKeyDown={_handleKeyDown}
        ref={searchRef}
      />

      <Icon
        type="submit"
        as={RiSearchLine}
        fontSize="20"
        onClick={() => {
          setDataSearch(searchRef.current.value);
          handleSearch(searchRef.current.value);
        }}
        cursor="pointer"
        _hover={{ color: "#ED1D24" }}
      />
    </Flex>
  );
}
