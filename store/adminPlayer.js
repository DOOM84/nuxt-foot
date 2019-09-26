export const state = () => ({
});

export const mutations = {

};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/player')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/player', data)
        } catch (error) {
            throw error;
        }
    },

  async add({}) {
    try {
      return await this.$axios.$get(`admin/player/add`)
    } catch (error) {
      throw error;
    }
  },

  async edit({}) {
    try {
      return await this.$axios.$get(`admin/player/edit`)
    } catch (error) {
      throw error;
    }
  },

    async update({}, params){
      try {
        await this.$axios.$post(`admin/player/${params.slug}`, params.data, {
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
           return await this.$axios.$delete(`admin/player/${slug}`);
        } catch (error) {
            throw error;
        }
    }
};

export const getters = {

};
