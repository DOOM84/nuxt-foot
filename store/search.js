export const state = () => ({
  search: '',
  start: false
});

export const mutations = {
  SET_SEARCH(state, data) {
    state.search = data;
  },
  SET_START(state, data) {
    state.start = data;
  },

};


export const actions = {

  async fetchResults({commit}, query) {
    try {
      return await this.$axios.$get(`search/${query}`);
    } catch (error) {
      commit('SET_START', false);
      throw error;
    }
  },

  async fetchPagedPlayers({commit}, {page, query}) {
    try {
      return await this.$axios.$get(`getPagedPlayers/${page}/${query}`);
    } catch (error) {
      throw error;
    }
  },

  async fetchPagedPosts({commit}, {page, query}) {
    try {
      return await this.$axios.$get(`getPagedPosts/${page}/${query}`);
    } catch (error) {
      throw error;
    }
  },

  async fetchPagedTeams({commit}, {page, query}) {
    try {
      return await this.$axios.$get(`getPagedTeams/${page}/${query}`);
    } catch (error) {
      throw error;
    }
  }
};

export const getters = {
  search(state) {
    return state.search
  },
  start(state) {
    return state.start
  }
};
