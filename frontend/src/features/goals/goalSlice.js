import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Create a Goal
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goal, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await goalService.create(goal, token);
      if (response.error) {
        console.log(response.error);
        return thunkAPI.rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user goals
export const getGoals = createAsyncThunk("goals/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const response = await goalService.get(token);
    if (response.error) {
      console.log(response.error);
      return thunkAPI.rejectWithValue(response.error);
    }
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// delete a goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await goalService.delete(id, token);
      if (response.error) {
        console.log(response.error);
        return thunkAPI.rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createGoal.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(createGoal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = [...state.goals, action.payload];
      // state.goals.push(action.payload);
    });
    builder.addCase(createGoal.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(getGoals.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(getGoals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = action.payload;
    });
    builder.addCase(getGoals.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(deleteGoal.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(deleteGoal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = state.goals.filter(
        (goal) => goal._id !== action.payload.id
      );
    });
    builder.addCase(deleteGoal.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
