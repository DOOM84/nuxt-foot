export const state = () => ({

});

export const mutations = {


};


export const actions = {

  async fetchTeamSlug({}, slug) {
    try {
      return await this.$axios.$get(`getTeam/${slug}`);
    } catch (error) {
      throw error;
    }
  }
};

export const getters = {

};
