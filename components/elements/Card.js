import { Box, useColorModeValue, Image, chakra, Badge } from "@chakra-ui/react";
import Link from "next/link";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export default function Card({ movie }) {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };

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
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {movie.original_language}
            </Badge>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {movie.title}
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => {
                const rating = Math.round(parseInt(movie.vote_average)) / 2;
                if (rating - i >= 1) {
                  return <BsStarFill key={i} style={{ marginLeft: "1" }} />;
                } else if (rating - i === 0.5) {
                  return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
                } else {
                  return <BsStar key={i} style={{ marginLeft: "1" }} />;
                }
              })}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {movie.vote_count} review{movie.vote_count > 1 && "s"}
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
