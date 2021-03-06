import racesSplice, {RacesState } from './slices/razesSlice';
import { EStatus } from './slices/razesSlice';


describe('counter reducer', () => {
  const initialState: RacesState = {
    races: {},
    status:EStatus.idle,
    favorite: null,
    avatarRaces:{},
    statusAvatars:EStatus.idle,
  };
  it('should handle initial state', () => {
    expect(racesSplice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

/*   it('should handle increment', () => {
    const actual = counterReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = counterReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = counterReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  }); */
});
