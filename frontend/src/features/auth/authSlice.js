import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

// get user from localstorage
const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: getUser(),
  isError: false,
  success: false,
  message: "",
};

// Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await authService.register(user);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await authService.login(user);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Logout user
export const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    authService.logOut();
  } catch (error) {
    return error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.success = true;
      state.message = "Registration Successful";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.success = false;
      state.message = action.payload;
      state.user = null;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.success = true;
      state.message = "Registration Successful";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.success = false;
      state.message = action.payload;
      state.user = null;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.user = null;
      state.message = "Logout Successful";
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
