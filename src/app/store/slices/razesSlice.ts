import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { fetchRazes } from './razesApi';
import { IRazas } from '../../domain/interfaces';


const SLICE_NAME:string='races'

export enum EStatus {idle='idle',loading='loading', failed='failed'}
export interface RacesState {
  races: IRazas;
  status:   EStatus.idle | EStatus.loading | EStatus.failed;
  favorite:string|null
}



const initialState: RacesState = {
  races: {},
  status:EStatus.idle,
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
      state.races = action.payload;
    },
    setFavorite: (state, action:PayloadAction<string>) => {
      state.favorite = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRaces.pending, (state) => {
        state.status = EStatus.loading;
      })
      .addCase(getRaces.fulfilled, (state, action) => {
        state.status = EStatus.idle;
        state.races = action.payload;
      })
      .addCase(getRaces.rejected, (state) => {
        state.status = EStatus.failed;
      });
  },
});

export const {setRazas,setFavorite} = razasSlice.actions;

/**** SELECTIORS ****/

export const selectAllRaces = (state: RootState):IRazas => state.races.races;

export const selectStatus = (state: RootState):string => state.races.status

export const selectRace =(race:string)=> (state: RootState):string => state.races.races[race]


export const setFavoriteRace =
  (race: string): AppThunk =>
  (dispatch, getState) => {
    const races = selectAllRaces(getState());
      dispatch(setFavorite(races[race]));
  };


export default razasSlice.reducer;
