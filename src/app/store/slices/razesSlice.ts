import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, /*AppThunk*/ } from '../store';
import { fetchPictures, fetchRazes } from './razesApi';
import { IRazas, DinamicObject } from '../../domain/interfaces';


const SLICE_NAME:string='races'

export enum EStatus {idle='idle',loading='loading', failed='failed'}
export interface RacesState {
  races: IRazas;
  avatarRaces:DinamicObject,
  status:   EStatus.idle | EStatus.loading | EStatus.failed;
  statusAvatars:   EStatus.idle | EStatus.loading | EStatus.failed;
  favorite:string|null
}



const initialState: RacesState = {
  races: {},
  avatarRaces:{},
  status:EStatus.idle,
  statusAvatars:EStatus.idle,
  favorite: null,
};


export const getRaces = createAsyncThunk(
  `${SLICE_NAME}/fetchRace`,
  async () => {
    const response = await fetchRazes();
    return response.message;
  }
);


export const getAvatarRaces = createAsyncThunk(
  `${SLICE_NAME}/fetchAvatarRace`,
  async (urls:DinamicObject) => {
    const mappedUrl = await fetchPictures(urls);
    return mappedUrl;
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
    setAvatarRaces: (state, action: PayloadAction<DinamicObject>) => {
      state.avatarRaces = action.payload;
    },
    setFavorite: (state, action:PayloadAction<string>) => {
      state.favorite = action.payload;
    },
    clearAvatars:(state)=>{
      state.avatarRaces={}
    }
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
      })
      .addCase(getAvatarRaces.pending, (state) => {
        state.statusAvatars = EStatus.loading;
      })
      .addCase(getAvatarRaces.fulfilled, (state, action) => {
        state.statusAvatars = EStatus.idle;
        state.avatarRaces = action.payload;
      })
      .addCase(getAvatarRaces.rejected, (state) => {
        state.statusAvatars = EStatus.failed;
      });
  },
});

export const {setRazas, setFavorite, setAvatarRaces, clearAvatars} = razasSlice.actions;

/**** SELECTIORS ****/

export const selectAllRaces = (state: RootState):IRazas => state.races.races;

export const selectStatus = (state: RootState):string => state.races.status

export const selectRace =(race:string)=> (state: RootState):string[] => state.races.races[race]

export const selectAvatarRaces =()=> (state: RootState):DinamicObject => state.races.avatarRaces

export default razasSlice.reducer;
