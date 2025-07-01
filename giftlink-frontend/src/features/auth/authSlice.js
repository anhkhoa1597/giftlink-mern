import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient, { handleApi } from "../../api/apiClient";
import config from "../../config/config";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  (formData, { rejectWithValue }) => {
    return handleApi(
      () => apiClient.post(`${config.baseUrl}/api/users/register`, formData),
      rejectWithValue,
      "Register failed"
    );
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  (formData, { rejectWithValue }) => {
    return handleApi(
      () => apiClient.post(`${config.baseUrl}/api/users/login`, formData),
      rejectWithValue,
      "Login failed"
    );
  }
);

export const updateUserName = createAsyncThunk(
  "auth/updateUserName",
  (name, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    return handleApi(
      () =>
        apiClient.put(
          `${config.baseUrl}/api/users/update-user-name`,
          {
            lastName: name,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      rejectWithValue,
      "User's name update failed"
    );
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  (formData, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    return handleApi(
      () =>
        apiClient.put(`${config.baseUrl}/api/users/update-password`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      rejectWithValue,
      "Password update failed"
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
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(updateUserName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.user.lastName = action.payload.lastName;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setToken, setUser, logout, setError, setLoading, setReset } =
  authSlice.actions;
export default authSlice.reducer;
