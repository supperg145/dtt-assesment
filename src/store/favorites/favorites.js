const state = {
  favorites: [],
};

const getters = {
  allFavorites: (state) => state.favorites,
};

const actions = {
  addFavorite({ commit }, house) {
    commit("addFavorite", house);
  },
  removeFavorite({ commit }, house) {
    commit("removeFavorite", house);
  },
};

const mutations = {
  addFavorite(state, house) {
    if (!state.favorites.some((fav) => fav.id === house.id)) {
      state.favorites.push(house);
    }
  },
  removeFavorite(state, house) {
    state.favorites = state.favorites.filter((fav) => fav.id !== house.id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
