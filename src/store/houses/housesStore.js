import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = process.env.VUE_APP_API_URL;
const apiKey = process.env.VUE_APP_API_KEY;

export const useHousesStore = defineStore("houses", {
  // State
  state: () => ({
    houses: [],
    house: {},
  }),

  // Getters
  getters: {
    getHouses: (state) => state.houses,
    getHouseById: (state) => (id) =>
      state.houses.find((house) => house.id === id),
  },

  // Actions
  actions: {
    async fetchHouses() {
      try {
        const response = await axios.get(baseUrl, {
          headers: {
            "X-Api-Key": apiKey,
          },
        });
        this.houses = response.data; // Directly setting state
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    },

    async fetchHouseById(id) {
      try {
        const response = await axios.get(`${baseUrl}/${id}`, {
          headers: {
            "X-Api-Key": apiKey,
          },
        });
        this.house = response.data[0]; // Directly setting state
        return this.house;
      } catch (error) {
        console.error("Error fetching house:", error);
      }
    },

    async deleteHouse(id) {
      try {
        await axios.delete(`${baseUrl}/${id}`, {
          headers: {
            "X-Api-Key": apiKey,
          },
        });
        this.houses = this.houses.filter((house) => house.id !== id); // Directly updating state
      } catch (error) {
        console.error("Error deleting house:", error);
      }
    },

    addHouse(house) {
      this.houses.push(house); // Directly modifying state
    },

    updateHouse(updatedHouse) {
      const index = this.houses.findIndex(
        (house) => house.id === updatedHouse.id
      );
      if (index !== -1) {
        this.houses.splice(index, 1, updatedHouse); // Directly modifying state
      }
    },
  },
});
