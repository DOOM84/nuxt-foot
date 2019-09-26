export const state = () => ({
  //post: ''
});

export const mutations = {
  /*SET_POST(state, data) {
    state.posts = data;
  },*/

};


export const actions = {

  async fetchPlayerSlug({commit}, slug) {
    try {
      return await this.$axios.$get(`getPlayer/${slug}`);
    } catch (error) {
      throw error;
    }
  }
};

export const getters = {
  /*post(state) {
    return state.post
  }*/
};
