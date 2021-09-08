import { Box, Button, Checkbox, Flex, Heading, Icon, Text, Table, Tbody, Th, Thead, Tr, Td, theme } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";

export default function UserList() {
  return(
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Button
              as="a"
              size="sm"
              fontSize="14"
              colorScheme="green"
              leftIcon={<Icon as={RiAddLine} />}
         >
              Criar novo
            </Button>

          </Flex>

          <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th px="6" color="gray.300" width="8">
                    <Checkbox colorScheme="pink" />
                  </Th>
                  <Th>
                    Usuário
                  </Th>
                  <Th>
                    Dada de cadastro
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                  <Tr>
                    <Td px="6">
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Daniel Pellicano</Text>
                        <Text fontSize="sm" color="gray.300">daniel.pellicano@pessoalize.com</Text>
                      </Box>
                    </Td>
                    <Td>
                      23 de Agosto de 2021
                    </Td>
                  </Tr>
                  <Tr>
                    <Td px="6">
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Daniel Pellicano</Text>
                        <Text fontSize="sm" color="gray.300">daniel.pellicano@pessoalize.com</Text>
                      </Box>
                    </Td>
                    <Td>
                      23 de Agosto de 2021
                    </Td>
                  </Tr>
                  <Tr>
                    <Td px="6">
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Daniel Pellicano</Text>
                        <Text fontSize="sm" color="gray.300">daniel.pellicano@pessoalize.com</Text>
                      </Box>
                    </Td>
                    <Td>
                      23 de Agosto de 2021
                    </Td>
                  </Tr>
                  <Tr>
                    <Td px="6">
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Daniel Pellicano</Text>
                        <Text fontSize="sm" color="gray.300">daniel.pellicano@pessoalize.com</Text>
                      </Box>
                    </Td>
                    <Td>
                      23 de Agosto de 2021
                    </Td>
                  </Tr>
              </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  )
}