import { configureStore } from '@reduxjs/toolkit';
import placesHallSlice from './slices/placesHallSlice';

export const store = configureStore({
  reducer: {
    placesHallSlice: placesHallSlice,
  }
});

