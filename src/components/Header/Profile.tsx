import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex
      align="center"
      display={{ sm: "none", md: "flex", lg: "flex", xl: "flex" }}
    >
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Daniel Pellicano</Text>
          <Text color="gray.300" fontSize="small">
            daniel.pellicano@atom6.design
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Daniel Pellicano"
        src="https://avatars.githubusercontent.com/u/33453168"
      />
    </Flex>
  );
}
