import {
  Box,
  Flex,
  Text,
  Heading,
  Image,
  Button,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Icon } from "@chakra-ui/react";
import { RiArrowGoBackLine, RiEdit2Line, RiTv2Line } from "react-icons/ri";
import { LinkPage } from "../../components/Links";

const Post = () => {
  interface ICharacters {
    id: number;
    name: string;
    thumbnail: {
      extension: string;
      path: string;
    };
    description: string;
    series: {
      items: [];
      name: string;
    };
    stories: {
      items: [];
      name: string;
    };
  }

  const [dataSearch, setDataSearch] = useState("");
  const [resultData, setResultData] = useState({} as any);
  const [resultNotFound, setResultNotFound] = useState(false);

  const router = useRouter();
  const { pid } = router.query;
  const [characterData, setCharacterData] = useState({} as ICharacters);
  useEffect(() => {
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters/${pid}?ts=1&apikey=344d40df0c8cc373141c1dc321fae9cf&hash=bd0722d5750b6362d5ba0212ca36726b`
      )
      .then((res) => {
        setCharacterData(res.data.data.results[0]);
        console.log(res.data.data.results[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log(characterData);
      });
  }, [pid]);

  const handleSearch = async (inputData: string) => {
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${inputData}&ts=1&apikey=344d40df0c8cc373141c1dc321fae9cf&hash=bd0722d5750b6362d5ba0212ca36726b`
      )
      .then((res: any) => {
        if (res.data.data.results[0]) {
          setResultData(res.data.data.results[0]);
          setResultNotFound(false);
        } else {
          setResultNotFound(true);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        //console.log(resultData);
      });
  };

  return (
    <Flex direction="column" h="100vh">
      <Header
        setDataSearch={setDataSearch}
        setResultData={setResultData}
        handleSearch={handleSearch}
      />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Box
          bg="gray.800"
          flex="1"
          flexDir="column"
          gap="4"
          p="10"
          align="flex-start"
        >
          {resultData.id && (
            <>
              <Text
                fontSize="lg"
                mb="10"
                ml="5"
                as="h3"
                display="flex"
                alignItems="baseline"
              >
                Resultado de Pesquisa para
                <Text bg="#ED1D24" ml="1" p="1" color="#fff">
                  {resultData.name}
                </Text>
              </Text>
              <Flex>
                <Box
                  cursor="pointer"
                  p="7"
                  bg="gray.900"
                  width={{ base: "100%", md: "23%", lg: "23%" }}
                  borderRadius="10"
                  key={resultData.id}
                  boxSizing="border-box"
                  border="1px"
                  borderColor="gray.700"
                  transition="all 0.5s ease-out"
                  _hover={{
                    border: "1px solid #ccc",
                    bg: "gray.800",
                    transform: "scale(1.1)",
                  }}
                >
                  {resultData.thumbnail && (
                    <LinkPage href={`character/${resultData.id}`}>
                      <Image
                        src={
                          resultData.thumbnail.extension == "jpg"
                            ? resultData.thumbnail.path + ".jpg"
                            : resultData.thumbnail.path + ".gif"
                        }
                        alt={resultData.name}
                        objectFit="cover"
                        w="100%"
                        height="245"
                        borderRadius="5"
                        filter="grayscale(1)"
                        _hover={{ filter: "grayscale(0)" }}
                      />
                    </LinkPage>
                  )}

                  <Heading as="h3" fontSize="20px" mt="3" textAlign="center">
                    {resultData.name}
                  </Heading>
                </Box>
              </Flex>
            </>
          )}

          {!resultData.id && !resultNotFound && (
            <Box>
              <Flex alignItems="flex-start">
                <Image
                  src={
                    characterData.thumbnail &&
                    characterData.thumbnail.path +
                      "." +
                      characterData.thumbnail.extension
                  }
                  width="300px"
                />
                <Box pl="5" w="100%">
                  <Heading
                    w="100%"
                    as="h1"
                    bg="#ED1D24"
                    p="1"
                    color="#fff"
                    fontSize="34"
                    mb="3"
                    textTransform="uppercase"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pl="3"
                  >
                    <span>{characterData.name}</span>
                    <Box>
                      <Button
                        bg="gray.800"
                        mr="1"
                        fontFamily="Roboto"
                        borderRadius="0"
                        _hover={{ bg: "gray.700" }}
                      >
                        <Icon as={RiEdit2Line} mr="2" />
                        Editar Personagem
                      </Button>
                      <Button
                        borderRadius="0"
                        bg="gray.800"
                        mr="0"
                        fontFamily="Roboto"
                        _hover={{ bg: "gray.700" }}
                      >
                        <Icon as={RiArrowGoBackLine} mr="2" />
                        Voltar
                      </Button>
                    </Box>
                  </Heading>
                  <Text>
                    {characterData.description
                      ? characterData.description
                      : "Não tem descrição deste personagem na API"}
                  </Text>
                  <Box pt="5">
                    <Heading
                      as="h5"
                      fontFamily="Roboto"
                      fontSize="20px"
                      borderBottom="1px"
                      mb="3"
                      pb="3"
                      borderColor="gray.700"
                    >
                      <Icon as={RiTv2Line} mr="2" />
                      Séries que este personagem participou
                    </Heading>
                    <UnorderedList pl="3">
                      {characterData.series &&
                        characterData.series.items.map((serie: any) => {
                          return (
                            <ListItem key={serie.name}>{serie.name}</ListItem>
                          );
                        })}
                    </UnorderedList>
                  </Box>

                  <Box pt="5">
                    <Heading
                      as="h5"
                      fontFamily="Roboto"
                      fontSize="20px"
                      borderBottom="1px"
                      mb="3"
                      pb="3"
                      borderColor="gray.700"
                    >
                      <Icon as={RiTv2Line} mr="2" />
                      Histórias que este personagem participou
                    </Heading>
                    <UnorderedList
                      pl="0"
                      listStyleType="none"
                      display="flex"
                      flexWrap="wrap"
                    >
                      {characterData.stories &&
                        characterData.stories.items.map((storie: any) => {
                          return (
                            <ListItem
                              border="1px"
                              borderColor="gray.700"
                              p="3"
                              m="1"
                              key={storie.name}
                              fontSize="14px"
                            >
                              {storie.name}
                            </ListItem>
                          );
                        })}
                    </UnorderedList>
                  </Box>
                </Box>
              </Flex>
            </Box>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Post;
