export const state = () => ({

});

export const mutations = {

};

export const actions = {
  async nuxtServerInit({dispatch, commit}, {params}){
    if(params.slug === 'lch' || params.slug === 'le'){
      await commit('home/SET_WALL', params.slug);
    }else{
      await commit('home/CLEAR_WALL');
    }
    await dispatch('home/fetchTopMenuChamps');
    await dispatch('home/fetchTopMenuEcups');
  }
};

export const getters = {

};
