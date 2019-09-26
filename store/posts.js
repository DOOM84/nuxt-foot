export const state = () => ({
  post: ''
});

export const mutations = {
  SET_POST(state, data) {
    state.posts = data;
  },

};


export const actions = {

  async fetchPost({}, slug) {
    try {
      return await this.$axios.$get(`getPostBySlug/${slug}`);
    } catch (error) {
      throw error;
    }
  },

  async fetchTagPagedPosts({}, {slug, page}) {
    try {
      return await this.$axios.$get(`tagPagedPosts/${slug}/${page}`);
    } catch (error) {
      throw error;
    }
  },

  async fetchPlayerPagedPosts({}, {slug, page}) {
    try {
      return await this.$axios.$get(`playerPagedPosts/${slug}/${page}`);
    } catch (error) {
      throw error;
    }
  },

  async fetchAllPagedPosts({}, page) {

    try {
      return await this.$axios.$get(`allPagedPosts/${page}`);
    } catch (error) {
      throw error;
    }
  },
};

export const getters = {
  post(state) {
    return state.post
  }
};
