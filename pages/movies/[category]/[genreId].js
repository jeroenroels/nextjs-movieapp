import { SimpleGrid, Stack, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect, Fragment } from "react";

import Card from "../../../components/elements/Card";
import api from "../../../api";

export default function Genre() {
  const router = useRouter();
  const { genreId } = router.query;
  const [movies, setMovies] = useState({});
  const [page, setPage] = useState(1);

  useEffect(
    () =>
      api
        .getByGenre(genreId, page)
        .then((response) => setMovies(response.data)),
    [genreId, page]
  );

  return (
    <Fragment>
      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 4 }}
        px={4}
        py={3}
        spacing={4}
        mx="auto"
      >
        {movies.results &&
          movies.results.map((movie) => <Card movie={movie} key={movie.id} />)}
      </SimpleGrid>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={10}
      >
        <Stack spacing={6} direction={"row"}>
          {page > 1 && (
            <Button rounded={"full"} px={6} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
          )}
          {page < movies.total_pages && (
            <Button rounded={"full"} px={6} onClick={() => setPage(page + 1)}>
              Next
            </Button>
          )}
        </Stack>
      </Stack>
    </Fragment>
  );
}
