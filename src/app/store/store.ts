import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './slices/razesSlice';

export const store = configureStore({
  reducer: {
    races: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
