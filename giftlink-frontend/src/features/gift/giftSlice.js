import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";

export const fetchGifts = createAsyncThunk("gift/fetchGifts", async () => {
  const response = await axios.get(`${config.baseUrl}/api/gifts`);
  return response.data;
});

const giftSlice = createSlice({
  name: "gift",
  initialState: {
    gifts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGifts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGifts.fulfilled, (state, action) => {
        state.loading = false;
        state.gifts = action.payload;
      })
      .addCase(fetchGifts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default giftSlice.reducer;
