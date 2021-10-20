import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "9c1b8dc4cfb69b87ad590a25eb1d200d",
    language: "en-US",
  },
});

const api = {
  getByCategory: (category, page) =>
    instance({
      method: "GET",
      url: "/movie/" + category,
      params: { page: page },
      transformResponse: [(data) => JSON.parse(data)],
    }),
  getTopRated: (page) =>
    instance({
      method: "GET",
      url: "/movie/top_rated",
      params: { page: page },
      transformResponse: [(data) => JSON.parse(data)],
    }),
  getUpComing: (page) =>
    instance({
      method: "GET",
      url: "/movie/upcoming",
      params: { page: page },
      transformResponse: [(data) => JSON.parse(data)],
    }),
  getGenres: () =>
    instance({
      method: "GET",
      url: "/genre/movie/list",
      transformResponse: [(data) => JSON.parse(data)],
    }),
  getByGenre: (genreId, page) =>
    instance({
      method: "GET",
      url: "/discover/movie",
      params: {
        with_genres: genreId,
        sort_by: "popularity.desc",
        page: page,
      },
      transformResponse: [(data) => JSON.parse(data)],
    }),

  getMovie: (movieId) =>
    instance({
      method: "GET",
      url: "/movie/" + movieId,
      transformResponse: [(data) => JSON.parse(data)],
    }),

  getMovieRecommendations: (movieId, page) =>
    instance({
      method: "GET",
      url: "/movie/" + movieId + "/recommendations",
      params: { page: page },
      transformResponse: [(data) => JSON.parse(data)],
    }),

  getMovieCredits: (movieId, page) =>
    instance({
      method: "GET",
      url: "/movie/" + movieId + "/credits",
      params: { page: page },
      transformResponse: [(data) => JSON.parse(data)],
    }),

  getMovieReviews: (movieId, page) =>
    instance({
      method: "GET",
      url: "/movie/" + movieId + "/reviews",
      params: { page: page },
      transformResponse: [(data) => JSON.parse(data)],
    }),
};

export default api;
