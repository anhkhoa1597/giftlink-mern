import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";

export const fetchGifts = createAsyncThunk(
  "gift/fetchGifts",
  async ({ page = 1, limit = 12 }) => {
    const response = await axios.get(`${config.baseUrl}/api/gifts`, {
      params: { page, limit },
    });
    return response.data; // {gifts,total,page,totalPages} //gifts: current page of list gifts
  }
);

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
    searchGifts: [],
    gift: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    page: 1,
    totalPages: 1,
    total: 0,
  },
  reducers: {
    clearGifts: (state) => {
      state.gifts = [];
      state.status = "idle";
      state.error = null;
    },
    clearGift: (state) => {
      state.gift = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch all
      .addCase(fetchGifts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGifts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gifts = action.payload.gifts;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      })
      .addCase(fetchGifts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //fetch by id
      .addCase(fetchGiftById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.gift = null;
      })
      .addCase(fetchGiftById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gift = action.payload;
      })
      .addCase(fetchGiftById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.gift = null;
      });
  },
});

export const { clearGifts } = giftSlice.actions;
export default giftSlice.reducer;
