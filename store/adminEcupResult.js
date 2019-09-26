export const state = () => ({
});

export const mutations = {

};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/ecup_result')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/ecup_result', data)
        } catch (error) {
            throw error;
        }
    },

  async edit({}) {
    try {
      return await this.$axios.$get(`admin/ecup_result/edit`)
    } catch (error) {
      throw error;
    }
  },

    async update({}, data){
      try {
            await this.$axios.$patch(`admin/ecup_result/${data.id}`, data.params)
        } catch (error) {
            throw error;
        }
    },

  async delete({}, id){

        try {
           return await this.$axios.$delete(`admin/ecup_result/${id}`);
        } catch (error) {
            throw error;
        }
    }
};

export const getters = {

  };
