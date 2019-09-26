export const state = () => ({
  champs: '',
  posts: '',
  menuChamps: '',
  menuEcups: '',
  wall: {background:'#013220'},
});

export const mutations = {
  SET_POSTS(state, data) {
    state.posts = data;
  },
  SET_CHAMPS(state, data) {
    state.champs = data;
  },
  SET_MENU_CHAMPS(state, data) {
    state.menuChamps = data;
  },
  SET_WALL(state, data) {
    state.wall = {background: `url(/img/${data}_bg.jpg) no-repeat fixed, linear-gradient(to bottom, #081422, #081422)`};
  },
  CLEAR_WALL(state) {
    state.wall = {background: `url(/img/_bg.jpg) no-repeat fixed, linear-gradient(to bottom, #081422, #081422)`}//{background:'#013220'};
  },
  SET_MENU_ECUPS(state, data) {
    state.menuEcups = data;
  },
  SET_LIVERES(state, result) {
    let ind = state.champs.findIndex(x => x.id === result.champ_id);
    let resInd = state.champs[ind].results[result.date].findIndex(res => res.id === result.id);
    state.champs[ind].results[result.date][resInd].res1 = result.res1;
    state.champs[ind].results[result.date][resInd].res2 = result.res2;
    state.champs[ind].results[result.date][resInd].is_live = result.is_live;
  },

};


export const actions = {
  async fetchPosts({commit}, slug = '') {
    try {
      let result;
      result = await this.$axios.$get(`getPosts/${slug}`);
      commit('SET_POSTS', result.posts);
      return result;
    } catch (error) {
      throw error;
    }
  },
  async fetchEcupPosts({commit}, slug) {
    try {
      let result;
      result = await this.$axios.$get(`getEcupPosts/${slug}`);
      commit('SET_POSTS', result.posts);
      return result;
    } catch (error) {
      throw error;
    }
  },
  async fetchChamps({commit}) {
    try {
      let result;
      result =  await this.$axios.$get(`getChamps`);
      commit('SET_CHAMPS', result.champs);
      return result;
    } catch (error) {
      throw error;
    }
  },
  async fetchTopMenuChamps({commit}) {
    try {
      let result;
      result =  await this.$axios.$get(`getTopMenuChamps`);
      commit('SET_MENU_CHAMPS', result.champs);
      return result;
    } catch (error) {
      throw error;
    }
  },
  async fetchTopMenuEcups({commit}) {
    try {
      let result;
      result =  await this.$axios.$get(`getTopMenuEcups`);
      commit('SET_MENU_ECUPS', result.ecups);
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export const getters = {
  posts(state) {
    return state.posts
  },
  champs(state) {
    return state.champs
  },
  menuChamps(state) {
    return state.menuChamps
  },
  menuEcups(state) {
    return state.menuEcups
  },
  promoPosts(state){
    //return state.posts.filter(post => post.is_headline === 1);
    if(state.posts.length)return state.posts.filter(post => post.is_headline === 1).slice(0, 4);
    return null;
  },
  wall(state){
    return state.wall
  }
};
