export default {
  getHouses: (state) => state.houses,
  getHouseById: (state) => (id) =>
    state.houses.find((house) => house.id === id),
};
