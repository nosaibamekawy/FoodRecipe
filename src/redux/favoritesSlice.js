import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Updated to handle favorite articles
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const exists = state.favoriterecipes.some(
        (fav) => fav.idFood === action.payload.idFood
      );
      if (exists) {
        state.favoriterecipes = state.favoriterecipes.filter(
          (fav) => fav.idFood !== action.payload.idFood
        );
      } else {
        state.favoriterecipes.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
