import { Box, Flex, Text, Heading, Image } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { GetStaticProps } from "next";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { LinkPage } from "../components/Links";

const hash = "bd0722d5750b6362d5ba0212ca36726b";

import { useState, useEffect } from "react";
import { HeroCard } from "../components/HeroCard";

interface ICharacters {
  id: number;
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

interface IHomeProps {
  firstCharacterData: Array<ICharacters>;
  totalCharacters: number;
}

export default function Home({
  firstCharacterData,
  totalCharacters,
}: IHomeProps) {
  const [characters, setCharacters] = useState<Array<ICharacters>>([]);
  const [resultData, setResultData] = useState({} as ICharacters);
  const [dataSearch, setDataSearch] = useState("");
  const [resultNotFound, setResultNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offsetPage, setOffsetPage] = useState(20);

  useEffect(() => {
    setCharacters(firstCharacterData);
  }, [firstCharacterData]);

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

  const getPagination = async () => {
    setOffsetPage((prevOffSetPage) => prevOffSetPage + 20);
    axios
      .get(
        `https://gateway.marvel.com:443/v1/public/characters?offset=${offsetPage}&apikey=344d40df0c8cc373141c1dc321fae9cf&hash=bd0722d5750b6362d5ba0212ca36726b`
      )
      .then((res: any) => {
        if (res.data) {
          setCharacters((prevCharacters) => [
            ...prevCharacters,
            ...res.data.data.results,
          ]);
        } else {
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
          {resultNotFound && <h1>Resultado não encontrado</h1>}

          {resultData.id && (
            <>
              <Text
                fontSize="lg"
                mb="10"
                ml="5"
                as="h1"
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
                    transform: "scale(1.05)",
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
                        objectPosition="left"
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
            <>
              <Heading
                fontSize="24px"
                mb="10"
                ml="5"
                pt="7"
                as="h1"
                display="flex"
                alignItems="baseline"
                fontFamily="Roboto"
              >
                Personagens da
                <Text
                  bg="#ED1D24"
                  ml="1"
                  p="1"
                  pt="8px"
                  color="#fff"
                  fontFamily="Bebas Neue"
                  lineHeight="30px"
                  fontSize="34px"
                >
                  MARVEL
                </Text>
              </Heading>

              <InfiniteScroll
                dataLength={characters.length} //This is important field to render the next data
                next={getPagination}
                hasMore={characters.length === totalCharacters ? false : true}
                loader={<h4>Carregando...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Não tem mais herois pra carregar</b>
                  </p>
                }
                // below props only if you need pull down functionality
                refreshFunction={getPagination}
                pullDownToRefresh
                pullDownToRefreshContent={
                  <h3 style={{ textAlign: "center" }}>
                    &#8595; Arraste para carregar mais heróis
                  </h3>
                }
                releaseToRefreshContent={
                  <h3 style={{ textAlign: "center" }}>
                    &#8593; Release to refresh
                  </h3>
                }
              >
                <Flex
                  flexWrap="wrap"
                  gridGap="7"
                  flex="1"
                  boxSizing="border-box"
                  justify="center"
                  pt="10"
                >
                  {characters.map((item) => (
                    <HeroCard
                      key={item.id}
                      name={item.name}
                      id={item.id}
                      thumbnail={item.thumbnail}
                    />
                  ))}{" "}
                </Flex>
              </InfiniteScroll>
            </>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=344d40df0c8cc373141c1dc321fae9cf&hash=${hash}`
  );
  const result = await res.json();
  if (!result) {
    return {
      notFound: true,
    };
  }

  const firstCharacterData = result.data.results;
  const totalCharacters = result.data.total;
  return {
    props: { firstCharacterData, totalCharacters }, // will be passed to the page component as props
  };
};
