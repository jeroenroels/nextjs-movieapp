import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "9c1b8dc4cfb69b87ad590a25eb1d200d",
    language: "en-US",
  },
});

const api = {
  getByCategory: (category) =>
    instance({
      method: "GET",
      url: "/movie/" + category,
      transformResponse: [(data) => JSON.parse(data)],
    }),
  getTopRated: () =>
    instance({
      method: "GET",
      url: "/movie/top_rated",
      transformResponse: [(data) => JSON.parse(data)],
    }),
  getUpComing: () =>
    instance({
      method: "GET",
      url: "/movie/upcoming",
      transformResponse: [(data) => JSON.parse(data)],
    }),
  getGenres: () =>
    instance({
      method: "GET",
      url: "/genre/movie/list",
      transformResponse: [(data) => JSON.parse(data)],
    }),
  getByGenre: (genreId) =>
    instance({
      method: "GET",
      url: "/discover/movie",
      params: {
        with_genres: genreId,
        sort_by: "popularity.desc",
      },
      transformResponse: [(data) => JSON.parse(data)],
    }),
};

export default api;
