const state = {
  previousPath: null,
};

const mutations = {
  SET_PREVIOUS_PATH(state, path) {
    state.previousPath = path;
  },
};

const actions = {
  updatePreviousPath({ commit }, path) {
    commit("SET_PREVIOUS_PATH", path);
  },
};

const getters = {
  getPreviousPath: (state) => state.previousPath,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
