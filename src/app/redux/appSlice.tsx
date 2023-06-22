import { createSlice } from '@reduxjs/toolkit';
import NProgress from 'nprogress';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    selectedCharacters: undefined,
  },
  reducers: {
    loading: (state, action) => {
      NProgress.configure({ easing: 'ease', speed: 1000 });
      if (action.payload) {
        NProgress.start();
        NProgress.set(0.1);
      } else {
        NProgress.done();
      }

      return { ...state, loading: action.payload };
    },
    setSelectedCharactersReducer: (state, action) => {
      if (action.payload)
        return {
          ...state,
          selectedCharacters: action.payload.selectedCharacters,
        };
    },
  },
});

// Action creators are generated for each case reducer function
export const { loading, setSelectedCharactersReducer } = appSlice.actions;

export default appSlice.reducer;
