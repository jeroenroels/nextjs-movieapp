import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import api from "../../api";

import MovieGrid from "../../components/layouts/MovieGrid";

export default function Category() {
  const router = useRouter();
  const { category } = router.query;
  const [movies, setMovies] = useState({});
  const [page, setPage] = useState(1);

  const getMovies = async (category, page) => {
    const result = await api.getByCategory(category, page);
    setMovies(result.data);
  };

  useEffect(() => {
    if (category) {
      setPage(1);
      getMovies(category, page);
    }
  }, [category]);

  useEffect(() => {
    if (category) {
      getMovies(category, page);
    }
  }, [page]);

  return (
    <MovieGrid title={category} movies={movies} page={page} setPage={setPage} />
  );
}
