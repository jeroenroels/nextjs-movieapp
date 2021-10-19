import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  Link,
  Image,
  chakra,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { FiMenu, FiSearch } from "react-icons/fi";
import React, { useState, useEffect } from "react";

import SidebarContent from "../components/SidebarContent";

export default function App() {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const sidebar = useDisclosure();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const convertResponse = (response) => setMovies(response.data);

    // if (params.category === "genre") {
    //  api.getByGenre(params.genreId).then(convertResponse);
    //} else {
    // api.getByCategory(params.category).then(convertResponse);
    //}
  }, []);

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup w="96" display={{ base: "none", md: "flex" }}>
            <InputLeftElement color="gray.500" children={<FiSearch />} />
            <Input placeholder="Search for articles..." />
          </InputGroup>

          <Flex align="center">
            <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${text} mode`}
              variant="ghost"
              color="current"
              ml={{ base: "0", md: "3" }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          {/* Add content here, remove div below  */}
          <Box h="96">
            {movies &&
              movies.map((movie) => (
                <Box
                  w="xs"
                  bg={useColorModeValue("white", "gray.800")}
                  shadow="lg"
                  rounded="lg"
                  overflow="hidden"
                  mx="auto"
                >
                  <Image
                    w="full"
                    h={56}
                    fit="cover"
                    src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    alt="avatar"
                  />

                  <Box py={5} textAlign="center">
                    <Link
                      display="block"
                      fontSize="2xl"
                      color={useColorModeValue("gray.800", "white")}
                      fontWeight="bold"
                    >
                      John Doe
                    </Link>
                    <chakra.span
                      fontSize="sm"
                      color={useColorModeValue("gray.700", "gray.200")}
                    >
                      Software Engineer
                    </chakra.span>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
