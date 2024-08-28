export default {
  setHouses(state, houses) {
    state.houses = houses;
  },

  setHouse(state, house) {
    state.house = house;
  },

  addHouse(state, house) {
    state.houses.push(house);
  },

  updateHouse(state, updatedHouse) {
    const index = state.houses.findIndex(
      (house) => house.id === updatedHouse.id
    );
    if (index !== -1) {
      state.houses.splice(index, 1, updatedHouse);
    }
  },

  deleteHouse(state, id) {
    state.houses = state.houses.filter((house) => house.id !== id);
  },
};
