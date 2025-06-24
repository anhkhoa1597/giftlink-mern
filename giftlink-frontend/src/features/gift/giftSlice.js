import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";

export const fetchGifts = createAsyncThunk("gift/fetchGifts", async () => {
  const response = await axios.get(`${config.baseUrl}/api/gifts`);
  return response.data;
});

export const fetchGiftById = createAsyncThunk(
  "gift/fetchGiftById",
  async (id) => {
    const response = await axios.get(`${config.baseUrl}/api/gifts/${id}`);
    return response.data;
  }
);

const giftSlice = createSlice({
  name: "gift",
  initialState: {
    gifts: [],
    gift: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      //fetch all
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
      })

      //fetch by id
      .addCase(fetchGiftById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.gift = null;
      })
      .addCase(fetchGiftById.fulfilled, (state, action) => {
        state.loading = false;
        state.gift = action.payload;
      })
      .addCase(fetchGiftById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.gift = null;
      });
  },
});

export default giftSlice.reducer;
