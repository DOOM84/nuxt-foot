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
  }
};

export const getters = {

};
