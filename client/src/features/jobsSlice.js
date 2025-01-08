import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ page, category, location }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/jobs`, {
        params: { page, category, location },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    totalPages: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobsSlice.reducer;