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
  },

  async fetchArchCalendar({}, data) {
    try {
      return await this.$axios.$get(`getArchEcupCalendar/${data.ecup}/${data.season}`);
    } catch (error) {
      throw error;
    }
  },
  async fetchArchStands({}, data) {
    try {
      return await this.$axios.$get(`getArchEcupStands/${data.ecup}/${data.season}`);
    } catch (error) {
      throw error;
    }
  },
};

export const getters = {

};
