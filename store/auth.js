import Cookie from 'cookie';
export const state = () => ({
    busy: false,
    loggedIn: false,
    strategy: "local",
    user: false,
    isAdmin: null,
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'error',
    answer: null,
    addedAnswer: null,
});

export const mutations = {
    /*SET_LOCATION(state, data){
        state.location = data
    },*/
    SET_SNACKBAR(state, data){
    state.snackbar = data.show;
    state.snackbarText = data.text;
    state.snackbarColor = data.color;
    },
  SET_ADMIN(state, data){
    state.isAdmin = data
  },
  SET_ANSWER(state, data){
    state.answer = data;
  },
  SET_ADDED_ANSWER(state, data){
    state.addedAnswer = data;
  }

};


export const actions = {
    async checkAdmin({commit}) {
        try {
            const adm = await this.$axios.$get('checkAdmin');
            commit('SET_ADMIN', adm);
            return adm;

        } catch (error) {
            throw error;
        }

    },

  async addAvatar({}, data){

    try {
      return await this.$axios.$post('addAvatar', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }catch (error) {
      throw error;
    }
  },

  async restore({}, data){
    try {
      return await this.$axios.$post('getPass', data);
    }catch (error) {
      throw error;
    }

  },

  async rate({}, {slug, rate}){
    try {
      return await this.$axios.$post('setPostRate', {slug, rate});
    }catch (error) {
      throw error;
    }
  },

  async comment({}, data){
    try {
      return await this.$axios.$post('comment', data);
    }catch (error) {
      throw error;
    }
  }


};

export const getters = {

    isAdmin(state){
        return state.isAdmin
    },
  snackbar(state){
    return state.snackbar
  },
  snackbarText(state){
    return state.snackbarText
  },
  snackbarColor(state){
    return state.snackbarColor
  },
  answer(state){
    return state.answer
  },

  addedAnswer(state){
    return state.addedAnswer
  }
};

