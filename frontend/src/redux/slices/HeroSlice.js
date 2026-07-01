import { createSlice } from "@reduxjs/toolkit";
import { fetchHeroAnime } from "../thunks/animeThunk";

const initialState = {
  hero: null,
  loading: false,
  error: null,
};

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.hero = action.payload;
      })
      .addCase(fetchHeroAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Une erreur est survenue";
      });
  },
});

export default animeSlice.reducer;
