import { Container, SimpleGrid, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect, Fragment } from "react";

import api from "../../api";

export default function Category() {
  const router = useRouter();
  const { movieId } = router.query;
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getMovieData = async () => {
      let movie = (await api.getMovie(movieId)).data;
      setMovie(movie);
    };
    const getRelatedData = async () => {
      /* movie.recommendations = await api.getMovieRecommendations(movieId);
      movie.credits = await api.getMovieCredits(movieId);
      movie.reviews = await api.getMovieReviews(movieId);
      setMovie(movie);*/
    };
    if (movieId) {
      getMovieData();
      getRelatedData();
    }
  }, [movieId]);

  return (
    <Container maxW={"5xl"} py={12}>
      {movie.id && (
        <Fragment>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Flex>
              <Image
                rounded={"md"}
                alt={"feature image"}
                src={"https://image.tmdb.org/t/p/w342" + movie.poster_path}
                objectFit={"cover"}
              />
            </Flex>
          </SimpleGrid>
        </Fragment>
      )}
    </Container>
  );
}
