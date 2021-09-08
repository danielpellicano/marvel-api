import { Box, Button, Checkbox, Flex, Heading, Icon, Text, Table, Tbody, Th, Thead, Tr, Td, theme, Divider, SimpleGrid, VStack, HStack } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";

export default function UserList() {
  return(
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
            <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>
            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
                <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                  <Input name="name" label="Nome Completo" />
                  <Input name="email" type="email" label="Email" />
                </SimpleGrid>

                <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                  <Input name="password" type="password" label="Senha" />
                  <Input name="email" type="password" label="Confirmação da senha" />
                </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                  <Button colorScheme="whiteAlpha">Cancelar</Button>
                  <Button colorScheme="green">Salvar</Button>
              </HStack>

            </Flex>
        </Box>
      </Flex>
    </Box>
  )
}