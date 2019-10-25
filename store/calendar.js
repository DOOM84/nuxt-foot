export const state = () => ({

});

export const mutations = {


};


export const actions = {

  async fetchCalendar({}, champ) {
    try {
      return await this.$axios.$get(`getCalendar/${champ}`);
    } catch (error) {
      throw error;
    }
  },
  async fetchArchCalendar({}, data) {
    try {
      return await this.$axios.$get(`getArchCalendar/${data.champ}/${data.season}`);
    } catch (error) {
      throw error;
    }
  },
  async fetchArchStands({}, data) {
    try {
      return await this.$axios.$get(`getArchStands/${data.champ}/${data.season}`);
    } catch (error) {
      throw error;
    }
  }
};

export const getters = {

};
