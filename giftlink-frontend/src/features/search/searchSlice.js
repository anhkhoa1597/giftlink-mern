import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";
import apiClient, { handleApi } from "../../api/apiClient";

export const fetchSearchGifts = createAsyncThunk(
  "gift/search",
  async ({ query, page = 1, limit = 12 }, { rejectWithValue }) => {
    return handleApi(
      () =>
        apiClient.get(`${config.baseUrl}/api/search`, {
          params: { ...query, page, limit },
        }),
      rejectWithValue,
      "Search failed"
    );
  }
);

const giftSlice = createSlice({
  name: "search",
  initialState: {
    searchGifts: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    page: 1,
    totalPages: 1,
    total: 0,
  },
  reducers: {
    clearSearchGifts: (state) => {
      state.searchGifts = [];
      state.status = "idle";
      state.error = null;
      state.page = 1;
      state.total = 0;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchGifts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSearchGifts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchGifts = action.payload.gifts;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      })
      .addCase(fetchSearchGifts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearSearchGifts } = giftSlice.actions;
export default giftSlice.reducer;
