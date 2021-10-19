import {
  Box,
  Collapse,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import React, { useEffect, useState } from "react";

import NavItem from "./NavItem";
import api from "../api";

export default function SidebarContent(props) {
  const [genres, setGenres] = useState([]);
  const integrations = useDisclosure();

  useEffect(() => {
    api.getGenres().then((response) => setGenres(response.data.genres));
  }, []);

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("white", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text
          fontSize="2xl"
          ml="2"
          color={useColorModeValue("brand.500", "white")}
          fontWeight="semibold"
        >
          Choc UI
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={MdHome} link="/">
          Home
        </NavItem>
        <NavItem icon={FaRss} link="/">
          Articles
        </NavItem>
        <NavItem icon={HiCollection} link="/">
          Collections
        </NavItem>
        <NavItem icon={FaClipboardCheck} link="/">
          Checklists
        </NavItem>
        <NavItem icon={HiCode} onClick={integrations.onToggle} link="/">
          Genres
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && "rotate(90deg)"}
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          {genres &&
            genres.map((genre) => (
              <NavItem
                pl="12"
                py="2"
                key={genre.id}
                link={"/movies/genre/" + genre.id}
              >
                {genre.name}
              </NavItem>
            ))}
        </Collapse>
      </Flex>
    </Box>
  );
}
