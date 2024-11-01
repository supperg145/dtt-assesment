import { defineStore } from "pinia";

export const useFilterStore = defineStore("filter", {
  // State
  state: () => ({
    filter: "price",
    searchQuery: "",
  }),

  // Getters
  getters: {
    filter: (state) => state.filter,
    searchQuery: (state) => state.searchQuery,
  },

  // Actions
  actions: {
    updateFilter(filter) {
      this.filter = filter;
    },
    updateSearchQuery(query) {
      this.searchQuery = query;
    },
  },
});
