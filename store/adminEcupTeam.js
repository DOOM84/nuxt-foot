export const state = () => ({
});

export const mutations = {

};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/ecup-team')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/ecup-team', data)
        } catch (error) {
            throw error;
        }
    },

  async add({}) {
    try {
      return await this.$axios.$get(`admin/ecup-team/add`)
    } catch (error) {
      throw error;
    }
  },

  async edit({}) {
    try {
      return await this.$axios.$get(`admin/ecup-team/edit`)
    } catch (error) {
      throw error;
    }
  },

    async update({}, params){
      try {
        await this.$axios.$post(`admin/ecup-team/${params.id}`, params.data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        } catch (error) {
            throw error;
        }
    },

  async delete({}, id){
        try {
           return await this.$axios.$delete(`admin/ecup-team/${id}`);
        } catch (error) {
            throw error;
        }
    }
};

export const getters = {

};
