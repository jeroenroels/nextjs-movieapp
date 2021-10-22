import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import api from "../../api";
import MovieGrid from "../../components/layouts/MovieGrid";

export default function Search() {
  const router = useRouter();
  const { search } = router.query;
  const [movies, setMovies] = useState({});
  const [page, setPage] = useState(1);

  const getMovies = async (search, page) => {
    const result = await api.searchMovieByTitle(search, page);
    setMovies(result.data);
  };

  useEffect(() => {
    if (search) {
      setPage(1);
      getMovies(search, page);
    }
  }, [search]);

  useEffect(() => {
    if (search) {
      getMovies(search, page);
    }
  }, [page]);

  return (
    <MovieGrid title={search} movies={movies} page={page} setPage={setPage} />
  );
}
