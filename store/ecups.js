export const state = () => ({

});

export const mutations = {


};


export const actions = {

  async ecupsWithTeams({}) {
    try {
      return await this.$axios.$get('ecupsWithTeams');
    } catch (error) {
      throw error;
    }
  },
  async ecupWithTeamsAndResults({}, slug) {
    try {
      return await this.$axios.$get(`ecupWithTeamsAndResults/${slug}`);
    } catch (error) {
      throw error;
    }
  },

  async ecupWithResults({}, slug) {
    try {
      return await this.$axios.$get(`ecupWithResults/${slug}`);
    } catch (error) {
      throw error;
    }
  },

  async ecupWithTeams({}, slug) {
    try {
      return await this.$axios.$get(`ecupWithTeams/${slug}`);
    } catch (error) {
      throw error;
    }
  }
};

export const getters = {

};
