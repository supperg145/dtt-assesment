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

  async createHouse({ commit }, houseFormData) {
    try {
      // Log the data being sent for debugging
      console.log("Sending form-data to server:", houseFormData);

      const response = await axios.post(baseUrl, houseFormData, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      // Log response data
      console.log("Response data:", response.data);
      commit("addHouse", response.data);
      console.log("House created successfully:", response.data);
    } catch (error) {
      console.error("Error creating house:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  },

  async updateHouse({ commit }, house) {
    try {
      const response = await axios.post(`${baseUrl}/${house.id}`, house, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });
      commit("updateHouse", response.data);
      console.log("House updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating house:", error);
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
