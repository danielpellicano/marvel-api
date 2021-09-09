import { Heading, Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import { LinkPage } from "../Links";

interface IHeroCard {
  id: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  name: string;
}

export const HeroCard = ({ id, thumbnail, name }: IHeroCard) => {
  return (
    <Box
      cursor="pointer"
      p="7"
      bg="gray.900"
      width={{
        base: "100%",
        md: "46%",
        lg: "43%",
        xl: "23%",
      }}
      borderRadius="10"
      key={id}
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
      <LinkPage href={`character/${id}`} key={id}>
        <Image
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt={name}
          objectFit="fill"
          w="100%"
          height="245"
          borderRadius="5"
          filter="grayscale(1)"
          _hover={{ filter: "grayscale(0)" }}
        />
      </LinkPage>

      <Heading as="h3" fontSize="20px" mt="3" textAlign="center">
        {name}
      </Heading>
    </Box>
  );
};
