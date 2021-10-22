import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import api from "../../../api";

import MovieGrid from "../../../components/layouts/MovieGrid";

export default function Category() {
  const router = useRouter();
  const { genreId, name } = router.query;
  const [movies, setMovies] = useState({});
  const [page, setPage] = useState(1);

  const getMovies = async (genreId, page) => {
    const result = await api.getByGenre(genreId, page);
    setMovies(result.data);
  };

  useEffect(() => {
    if (genreId) {
      setPage(1);
      getMovies(genreId, page);
    }
  }, [genreId]);

  useEffect(() => {
    if (genreId) {
      getMovies(genreId, page);
    }
  }, [page]);

  return (
    <MovieGrid title={name} movies={movies} page={page} setPage={setPage} />
  );
}
