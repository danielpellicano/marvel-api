import {
  Box,
  Flex,
  Text,
  Heading,
  Image,
  Button,
  UnorderedList,
  ListItem,
  useDisclosure,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Icon } from "@chakra-ui/react";
import { RiArrowGoBackLine, RiEdit2Line, RiTv2Line } from "react-icons/ri";
import { LinkPage } from "../../components/Links";
// @ts-ignore
import { Animated } from "react-animated-css";

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
      items: [
        {
          name: string;
        }
      ];
    };
    stories: {
      items: [
        {
          name: string | FocusEvent;
        }
      ];
      name: string;
    };
    urls: [{ url: string }];
  }
  const [characterID, setCharacterID] = useState("");
  const [characterIDLocal, setCharacterIDLocal] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [characterNameLocal, setCharacterNameLocal] = useState("");
  const [characterDescription, setCharacterDescription] = useState("");
  const [characterDescriptionLocal, setCharacterDescriptionLocal] =
    useState("");

  const [characterSeries, setCharacterSeries] = useState<{
    items: Array<{ name: string }>;
  }>({ items: [] });
  const [characterSeriesLocal, setCharacterSeriesLocal] = useState<{
    items: Array<{ name: string }>;
  }>({ items: [] });

  const [characterStories, setCharacterStories] = useState<{
    items: Array<{ name: string }>;
  }>({ items: [] });
  const [characterStoriesLocal, setCharacterStoriesLocal] = useState<{
    items: Array<{ name: string }>;
  }>({ items: [] });

  const { isOpen, onOpen, onClose } = useDisclosure();
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
        setCharacterName(res.data.data.results[0].name);
        setCharacterDescription(res.data.data.results[0].description);
        setCharacterSeries(res.data.data.results[0].series);
        setCharacterStories(res.data.data.results[0].stories);
        setCharacterID(res.data.data.results[0].id);
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        console.log(characterID);
      });
  }, [pid]);

  useEffect(() => {
    let characterID: any = localStorage.getItem("id");
    let nomeLocal: any = localStorage.getItem("name");
    let descriptionLocal: any = localStorage.getItem("description");
    let seriesLocal: any = localStorage.getItem("series");
    let storiesLocal: any = localStorage.getItem("stories");
    setCharacterIDLocal(characterID);
    setCharacterNameLocal(nomeLocal);
    setCharacterDescriptionLocal(descriptionLocal);
    setCharacterSeriesLocal(JSON.parse(seriesLocal));
    setCharacterStoriesLocal(JSON.parse(storiesLocal));
    console.log(characterID);
  }, []);

  const updateCharacters = () => {
    onClose();
    setCharacterNameLocal(characterName);
    setCharacterDescriptionLocal(characterDescription);
    setCharacterSeriesLocal(characterSeries);
    setCharacterStoriesLocal(characterStories);
    localStorage.setItem("id", characterID);
    localStorage.setItem("name", characterName);
    localStorage.setItem("description", characterDescription);
    localStorage.setItem("series", JSON.stringify(characterSeries));
    localStorage.setItem("stories", JSON.stringify(characterStories));
    console.log(characterSeriesLocal);
  };

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
        console.log(resultData);
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
                    <LinkPage href={`/character/${resultData.id}`}>
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

          {resultNotFound && "Resultado não encontrado"}

          {!resultData.id && !resultNotFound && (
            <Animated
              animationIn="bounceInUp"
              animationOut="zoomOutDown"
              animationInDuration={1000}
              animationOutDuration={1000}
              isVisible={true}
            >
              <Box>
                <Flex
                  alignItems={["center", "flex-start", "flex-start"]}
                  flexDirection={[
                    "column",
                    "column",
                    "initial",
                    "initial",
                    "initial",
                  ]}
                >
                  <Box>
                    <Image
                      src={
                        characterData.thumbnail &&
                        characterData.thumbnail.path +
                          "." +
                          characterData.thumbnail.extension
                      }
                      width="300px"
                      mb="5"
                    />
                    <UnorderedList listStyleType="none" p="0" m="0">
                      <ListItem>
                        <Button
                          w="100%"
                          bg="gray.700"
                          borderRadius="0"
                          mb="4"
                          _hover={{ bg: "#ED1D24" }}
                        >
                          <Link href="#" taget="_blank">
                            Detail
                          </Link>
                        </Button>
                        <Button
                          w="100%"
                          bg="gray.700"
                          borderRadius="0"
                          mb="4"
                          _hover={{ bg: "#ED1D24" }}
                        >
                          <Link href="#" taget="_blank">
                            Wiki
                          </Link>
                        </Button>
                        <Button
                          w="100%"
                          bg="gray.700"
                          borderRadius="0"
                          mb="4"
                          _hover={{ bg: "#ED1D24" }}
                        >
                          <Link href="#" taget="_blank">
                            Comiclick
                          </Link>
                        </Button>
                      </ListItem>
                    </UnorderedList>
                  </Box>
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
                      <span>
                        {characterNameLocal && characterID === characterIDLocal
                          ? characterNameLocal
                          : characterName}
                      </span>

                      <Box>
                        <Button
                          onClick={onOpen}
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
                          <Link href="/">
                            <Icon as={RiArrowGoBackLine} mr="2" />
                            Voltar
                          </Link>
                        </Button>
                      </Box>
                    </Heading>
                    <Text>
                      {characterDescriptionLocal &&
                      characterID === characterIDLocal
                        ? characterDescriptionLocal
                        : characterDescription}
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
                        {characterSeriesLocal &&
                        characterID === characterIDLocal
                          ? characterSeriesLocal.items.map((serie: any) => {
                              return (
                                <ListItem key={serie.name}>
                                  {serie.name}
                                </ListItem>
                              );
                            })
                          : characterSeries.items.map((serie: any) => {
                              return (
                                <ListItem key={serie.name}>
                                  {serie.name}
                                </ListItem>
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
                        {characterStoriesLocal &&
                        characterID === characterIDLocal
                          ? characterStoriesLocal.items.map((storie: any) => {
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
                            })
                          : characterStories.items.map((storie: any) => {
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
            </Animated>
          )}
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="gray.700">
            Editar Personagem {characterData.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name="name"
              type="text"
              defaultValue={
                characterNameLocal ? characterNameLocal : characterName
              }
              placeholder="Nome do personagem"
              mb="5"
              color="gray.800"
              onChange={(e) => setCharacterName(e.target.value)}
            />
            <Heading
              fontFamily="Roboto"
              as="h3"
              fontSize="18px"
              fontWeight="bold"
              mb="3"
              color="gray.500"
            >
              Descrição do personagem
            </Heading>
            <Textarea
              placeholder="Descreva o personagem aqui"
              h="150px"
              mb="5"
              defaultValue={characterDescription}
              color="gray.800"
              onChange={(e) => setCharacterDescription(e.target.value)}
            />
            <Heading
              fontFamily="Roboto"
              as="h3"
              fontSize="18px"
              fontWeight="bold"
              mb="3"
              color="gray.500"
            >
              Séries que o personagem participou
            </Heading>
            <Textarea
              placeholder="Liste as séries aqui ( 1 por linha )"
              h="150px"
              mb="5"
              //defaultValue={characterSeries}
              onBlur={(e: any) => {
                let newObject: { items: Array<{ name: string }> } = {
                  items: [],
                };
                const values = e.target.value.split("\n");
                values.forEach((element: string) => {
                  newObject.items.push({ name: element });
                });
                setCharacterSeries(newObject);
              }}
            />
            <Heading
              fontFamily="Roboto"
              as="h3"
              fontSize="18px"
              fontWeight="bold"
              mb="3"
              color="gray.500"
            >
              Histórias que o personagem participou
            </Heading>
            <Textarea
              placeholder="Liste as Histórias aqui ( 1 por linha )"
              h="150px"
              onBlur={(e: any) => {
                let newObject: { items: Array<{ name: string }> } = {
                  items: [],
                };
                const values = e.target.value.split("\n");
                values.forEach((element: string) => {
                  newObject.items.push({ name: element });
                });
                setCharacterStories(newObject);
              }}
            />
          </ModalBody>

          <ModalFooter justifyContent="flex-start">
            <Button
              colorScheme="blue"
              mr={3}
              bg="#ED1D24"
              onClick={updateCharacters}
            >
              Atualizar personagem
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Post;
