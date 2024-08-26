const state = {
  filter: "price",
  searchQuery: "",
};

const getters = {
  filter: (state) => state.filter,
  searchQuery: (state) => state.searchQuery,
};

const mutations = {
  SET_FILTER(state, filter) {
    state.filter = filter;
  },
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query;
  },
};

const actions = {
  updateFilter({ commit }, filter) {
    commit("SET_FILTER", filter);
  },
  updateSearchQuery({ commit }, query) {
    commit("SET_SEARCH_QUERY", query);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
