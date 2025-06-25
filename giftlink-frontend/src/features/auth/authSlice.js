import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient, { handleApi } from "../../api/apiClient";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  (formData, { rejectWithValue }) => {
    return handleApi(
      () => apiClient.post(`/api/users/register`, formData),
      rejectWithValue,
      "Register failed"
    );
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  (formData, { rejectWithValue }) => {
    return handleApi(
      () => apiClient.post(`/api/users/login`, formData),
      rejectWithValue,
      "Login failed"
    );
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setReset: (state, action) => {
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("action payload: ", action.payload);
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setToken, setUser, logout, setError, setLoading, setReset } =
  authSlice.actions;
export default authSlice.reducer;
