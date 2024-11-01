import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  // State
  state: () => ({
    favorites: [],
  }),

  // Getters
  getters: {
    allFavorites: (state) => state.favorites,
  },

  // Actions
  actions: {
    addFavorite(house) {
      if (!this.favorites.some((fav) => fav.id === house.id)) {
        this.favorites.push(house);
      }
    },
    removeFavorite(house) {
      this.favorites = this.favorites.filter((fav) => fav.id !== house.id);
    },
  },
});
