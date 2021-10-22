import {
  Container,
  SimpleGrid,
  Flex,
  Image,
  Box,
  Heading,
  Stack,
  Badge,
  Text,
  Avatar,
  Button,
  useColorModeValue,
  chakra,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect, Fragment } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

import api from "../../api";
import Card from "../../components/elements/Card";

export default function Category() {
  const router = useRouter();
  const { movieId } = router.query;

  const [movie, setMovie] = useState();
  const [recommendations, setRecommendations] = useState([]);
  const [credits, setCredits] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);

  const getMovieData = async (movieId) => {
    if (!movieId) return;
    let movie = (await api.getMovie(movieId)).data;
    setMovie(movie);

    getMovieRecommendations(movie);
    getMovieCredits(movie);
    getMovieReviews(movie);
  };

  const getMovieRecommendations = async (movie, page) => {
    if (!movie.id) return;
    let recommendations = await api.getMovieRecommendations(movie.id);
    setRecommendations(recommendations.data);
  };

  const getMovieCredits = async (movie, page) => {
    if (!movie.id) return;
    let credits = await api.getMovieCredits(movie.id);
    setCredits(credits.data);
  };

  const getMovieReviews = async (movie, page) => {
    if (!movie.id) return;
    let reviews = await api.getMovieReviews(movie.id);
    setReviews(reviews.data);
  };

  useEffect(() => getMovieData(movieId), [movieId]);

  return (
    <Container maxW={"full"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {movie && (
          <Flex maxW={"full"}>
            <Image
              shadow="2xl"
              rounded={"md"}
              alt={"feature image"}
              src={"https://image.tmdb.org/t/p/w342" + movie.poster_path}
              objectFit={"cover"}
            />

            <Box px={10}>
              <Heading>{movie.title}</Heading>
              <Text color={"gray.500"} fontSize={"lg"}>
                {movie.tagline}
              </Text>
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
                  {movie.vote_count} vote{movie.vote_count > 1 && "s"}
                </Box>
                <Box>
                  <Text color={"gray.500"} fontSize={"lg"}>
                    {movie.spoken_languages[0].name} / {movie.runtime}min. /
                    {movie.release_date}
                  </Text>
                </Box>
              </Box>
              <Stack direction="row">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id}>{genre.name}</Badge>
                ))}
              </Stack>
              <Heading>Storyline</Heading>
              <Text>{movie.overview}</Text>
              <Heading>The Cast</Heading>
              <Stack direction="row">
                {credits.cast &&
                  credits.cast
                    .filter((credit) => credit.order < 10)
                    .map((credit) => (
                      <Avatar
                        key={credit.id}
                        src={
                          "https://image.tmdb.org/t/p/w185" +
                          credit.profile_path
                        }
                      />
                    ))}
              </Stack>
              <Stack direction="row">
                {credits.crew &&
                  credits.crew
                    .filter(
                      (credit) =>
                        credit.job === "Director" || credit.job === "Screenplay"
                    )
                    .map((credit) => (
                      <Avatar
                        key={credit.id}
                        src={
                          "https://image.tmdb.org/t/p/w185" +
                          credit.profile_path
                        }
                      />
                    ))}
              </Stack>
              <Stack direction="row">
                <a href={movie.homepage}>
                  <Button>Website</Button>
                </a>
                <a>
                  <Button>Trailer</Button>
                </a>
                <a href={"https://www.imdb.com/title/" + movie.imdb_id}>
                  <Button>The MovieDB</Button>
                </a>
              </Stack>
              Director Shawn Levy Writers Matt Lieberman(screenplay by) (story
              by)Zak Penn(screenplay by)
            </Box>
          </Flex>
        )}
      </SimpleGrid>

      <Heading>Recommendations</Heading>
      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 4 }}
        px={4}
        py={3}
        spacing={4}
        mx="auto"
      >
        {recommendations.results &&
          recommendations.results.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
      </SimpleGrid>

      <Heading>Reviews</Heading>
      {reviews.results &&
        reviews.results.map((review) => (
          <Flex
            boxShadow={"lg"}
            width={"full"}
            rounded={"md"}
            p={10}
            mt={10}
            position={"relative"}
            bg={useColorModeValue("white", "gray.800")}
            _after={{
              content: '""',
              position: "absolute",
              height: "21px",
              width: "29px",
              left: "35px",
              top: "-10px",
              backgroundSize: "cover",
              backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='21' viewBox='0 0 29 21' fill='none'%3E%3Cpath d='M6.91391 21C4.56659 21 2.81678 20.2152 1.66446 18.6455C0.55482 17.0758 0 15.2515 0 13.1727C0 11.2636 0.405445 9.43939 1.21634 7.7C2.0699 5.91818 3.15821 4.3697 4.48124 3.05454C5.84695 1.69697 7.31935 0.678787 8.89845 0L13.3157 3.24545C11.5659 3.96667 9.98676 4.94242 8.57837 6.17273C7.21266 7.36061 6.25239 8.63333 5.69757 9.99091L6.01766 10.1818C6.27373 10.0121 6.55114 9.88485 6.84989 9.8C7.19132 9.71515 7.63944 9.67273 8.19426 9.67273C9.34658 9.67273 10.4776 10.097 11.5872 10.9455C12.7395 11.7939 13.3157 13.1091 13.3157 14.8909C13.3157 16.8848 12.6542 18.4121 11.3311 19.4727C10.0508 20.4909 8.57837 21 6.91391 21ZM22.5982 21C20.2509 21 18.5011 20.2152 17.3488 18.6455C16.2391 17.0758 15.6843 15.2515 15.6843 13.1727C15.6843 11.2636 16.0898 9.43939 16.9007 7.7C17.7542 5.91818 18.8425 4.3697 20.1656 3.05454C21.5313 1.69697 23.0037 0.678787 24.5828 0L29 3.24545C27.2502 3.96667 25.6711 4.94242 24.2627 6.17273C22.897 7.36061 21.9367 8.63333 21.3819 9.99091L21.702 10.1818C21.9581 10.0121 22.2355 9.88485 22.5342 9.8C22.8756 9.71515 23.3238 9.67273 23.8786 9.67273C25.0309 9.67273 26.1619 10.097 27.2715 10.9455C28.4238 11.7939 29 13.1091 29 14.8909C29 16.8848 28.3385 18.4121 27.0155 19.4727C25.7351 20.4909 24.2627 21 22.5982 21Z' fill='%239F7AEA'/%3E%3C/svg%3E")`,
            }}
            key={review.id}
          >
            <Flex
              direction={"column"}
              textAlign={"left"}
              justifyContent={"space-between"}
            >
              <chakra.p
                fontFamily={"Inter"}
                fontWeight={"medium"}
                fontSize={"15px"}
                pb={4}
              >
                {review.content}
              </chakra.p>
              <chakra.p
                fontFamily={"Work Sans"}
                fontWeight={"bold"}
                fontSize={14}
              >
                {review.author}
              </chakra.p>
            </Flex>
            <Avatar
              src={
                review.author_details.avatar_path &&
                review.author_details.avatar_path.substring(1)
              }
              height={"80px"}
              width={"80px"}
              alignSelf={"center"}
              m={{ base: "0 0 35px 0", md: "0 0 0 50px" }}
            />
          </Flex>
        ))}
    </Container>
  );
}
