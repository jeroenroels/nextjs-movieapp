import { Box, useColorModeValue, Image, chakra } from "@chakra-ui/react";
import Link from "next/link";

export default function Card({ movie }) {
  return (
    <Link
      display="block"
      fontSize="2xl"
      color={useColorModeValue("gray.800", "white")}
      fontWeight="bold"
      href={{
        pathname: "/movie/[movieId]",
        query: { movieId: movie.id },
      }}
    >
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
          h={60}
          fit="cover"
          src={"https://image.tmdb.org/t/p/w342" + movie.poster_path}
          alt="avatar"
        />

        <Box py={5} textAlign="center">
          <chakra.span
            display="block"
            fontSize="2xl"
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
          >
            {movie.title}
          </chakra.span>
          <chakra.span
            fontSize="sm"
            color={useColorModeValue("gray.700", "gray.200")}
          >
            Software Engineer
          </chakra.span>
        </Box>
      </Box>
    </Link>
  );
}
