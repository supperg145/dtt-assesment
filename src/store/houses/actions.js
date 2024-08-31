import axios from "axios";

const baseUrl = "https://api.intern.d-tt.nl/api/houses";
const apiKey = process.env.VUE_APP_API_KEY;

export default {
  async fetchHouses({ commit }) {
    try {
      const response = await axios.get(baseUrl, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });
      commit("setHouses", response.data);
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  },

  async fetchHouseById({ commit }, id) {
    try {
      const response = await axios.get(`${baseUrl}/${id}`, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });
      const house = response.data[0];
      console.log(house);
      commit("setHouse", house);
      return house;
    } catch (error) {
      console.error("Error fetching house:", error);
    }
  },

  async deleteHouse({ commit }, id) {
    try {
      await axios.delete(`${baseUrl}/${id}`, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });
      commit("deleteHouse", id);
    } catch (error) {
      console.error("Error deleting house:", error);
    }
  },
};
