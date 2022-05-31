import {
  Box,
  Collapse,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { SiThemoviedatabase } from "react-icons/si";
import { BsFillBookmarkStarFill, BsMenuAppFill } from "react-icons/bs";
import { GiPopcorn } from "react-icons/gi";
import { MdKeyboardArrowRight, MdUpcoming } from "react-icons/md";
import React, { useEffect, useState } from "react";

import NavLink from "./../elements/NavLink";
import api from "../../api";

export default function SidebarContent(props) {
  const [genres, setGenres] = useState([]);
  const integrations = useDisclosure();

  useEffect(
    () => api.getGenres().then((response) => setGenres(response.data.genres)),
    []
  );

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
      <Flex px="8" py="5" align="center">
        <Icon
          mr="2"
          boxSize="12"
          _groupHover={{
            color: useColorModeValue("gray.600", "gray.300"),
          }}
          as={SiThemoviedatabase}
        />
        <Text
          fontSize="2xl"
          ml="2"
          color={useColorModeValue("brand.500", "white")}
          fontWeight="semibold"
        >
          Movie DB
        </Text>
      </Flex>
      <Flex
        py="10"
        px="5"
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavLink
          icon={GiPopcorn}
          link="/movies/[category]"
          linkObject={{ category: "popular" }}
        >
          Popular
        </NavLink>
        <NavLink
          icon={MdUpcoming}
          link="/movies/[category]"
          linkObject={{ category: "upcoming" }}
        >
          Upcoming
        </NavLink>
        <NavLink
          icon={BsFillBookmarkStarFill}
          link="/movies/[category]"
          linkObject={{ category: "top_rated" }}
        >
          Top Rated
        </NavLink>
        <NavLink icon={BsMenuAppFill} onClick={integrations.onToggle}>
          Genres
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && "rotate(90deg)"}
          />
        </NavLink>
        <Collapse in={integrations.isOpen}>
          {genres &&
            genres.map((genre) => (
              <NavLink
                pl="12"
                py="2"
                key={genre.id}
                link={"/movies/[category]/[genreId]"}
                linkObject={{
                  category: "genre",
                  genreId: genre.id,
                  name: genre.name,
                }}
              >
                {genre.name}
              </NavLink>
            ))}
        </Collapse>
      </Flex>
      <Flex position="fixed" bottom="5" left="8" overflow="hidden">
        <div className="sc-gzVnrw bxYPLd">
          Copyright ©
          <a
            href="https://www.github.com/jeroenroels"
            className="sc-htoDjs iLMqGX"
          >
            jeroenroels
          </a>
        </div>
      </Flex>
    </Box>
  );
}
