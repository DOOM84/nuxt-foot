export const state = () => ({
});

export const mutations = {

};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/team')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/team', data)
        } catch (error) {
            throw error;
        }
    },

  async add({}) {
    try {
      return await this.$axios.$get(`admin/team/add`)
    } catch (error) {
      throw error;
    }
  },

  async edit({}) {
    try {
      return await this.$axios.$get(`admin/team/edit`)
    } catch (error) {
      throw error;
    }
  },

    async update({}, params){
      try {
        await this.$axios.$post(`admin/team/${params.slug}`, params.data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        } catch (error) {
            throw error;
        }
    },

  async delete({}, slug){
        try {
           return await this.$axios.$delete(`admin/team/${slug}`);
        } catch (error) {
            throw error;
        }
    }
};

export const getters = {

};
