
import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';
import GenreOrCategoryReducer from '../features/currentGenreOrCategory';

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: GenreOrCategoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});

export default store;
