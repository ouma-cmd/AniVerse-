import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchHeroAnime = createAsyncThunk(
  "anime/fetchHeroAnime",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "https://api.jikan.moe/v4/top/anime",
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
