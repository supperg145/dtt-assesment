import { defineStore } from "pinia";

export const usePreviousPathStore = defineStore("previousPath", {
  // State
  state: () => ({
    previousPath: null,
  }),

  // Getters
  getters: {
    getPreviousPath: (state) => state.previousPath,
  },

  // Actions
  actions: {
    updatePreviousPath(path) {
      this.previousPath = path; // Directly setting state
    },
  },
});
