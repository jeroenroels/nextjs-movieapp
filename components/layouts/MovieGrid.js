import { SimpleGrid, Stack, Button, Heading } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

import Card from "../../components/elements/Card";

export default function MovieGrid({ title, movies, page, setPage }) {
  return (
    <Fragment>
      <Heading>{title}</Heading>
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
            <Button
              px={6}
              onClick={() => setPage(page - 1)}
              leftIcon={<MdArrowBackIos />}
            >
              Page {page - 1}
            </Button>
          )}
          {page < movies.total_pages && (
            <Button
              px={6}
              onClick={() => setPage(page + 1)}
              rightIcon={<MdArrowForwardIos />}
            >
              Page {page + 1}
            </Button>
          )}
        </Stack>
      </Stack>
    </Fragment>
  );
}
