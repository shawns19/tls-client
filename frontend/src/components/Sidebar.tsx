import { Box, Text, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      bg="secondary"
      color="white"
      width="200px"
      height="100vh"
      position="fixed"
      top="0"
      left="0"
      zIndex="10"
    >
      <Stack spacing={4} p={4}>
        <Text fontSize="xl" fontWeight="bold">
          My App
        </Text>
        <NavLink to="/">
          <Text>Home</Text>
        </NavLink>
        <NavLink to="/tasksv2">
          <Text>TasksV2</Text>
        </NavLink>
      </Stack>
    </Box>
  );
};

export default Sidebar;
