import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { fetchRazes } from './razesApi';
import { IRazas } from '../../domain/interfaces';


const SLICE_NAME:string='counter'

export interface RacesState {
  razas: IRazas;
  status: 'idle' | 'loading' | 'failed';
  favorite:string|null
}

const initialState: RacesState = {
  razas: {},
  status:'idle',
  favorite: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getRaces = createAsyncThunk(
  `${SLICE_NAME}/fetchCount`,
  async () => {
    const response = await fetchRazes();
    // The value we return becomes the `fulfilled` action payload
    return response.message;
  }
);

export const razasSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setRazas: (state, action: PayloadAction<IRazas>) => {
      state.razas = action.payload;
    },
    setFavorite: (state, action:PayloadAction<string>) => {
      state.favorite = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRaces.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRaces.fulfilled, (state, action) => {
        state.status = 'idle';
        state.razas = action.payload;
      })
      .addCase(getRaces.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {setRazas,setFavorite} = razasSlice.actions;

/**** SELECTIORS ****/

export const selectAllRaces = (state: RootState) => state.counter.razas;

export const selectRace =
  (race: string): AppThunk =>
  (dispatch, getState) => {
    const races = selectAllRaces(getState());
      dispatch(setFavorite(races[race]));
  };


export default razasSlice.reducer;
