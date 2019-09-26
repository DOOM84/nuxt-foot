export const state = () => ({
});

export const mutations = {

};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/ecup')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/ecup', data)
        } catch (error) {
            throw error;
        }
    },

    async update({}, params){
      try {
            await this.$axios.$patch(`admin/ecup/${params.slug}`, params)
        } catch (error) {
            throw error;
        }
    },

  async stands({}, params){
    try {
      await this.$axios.$patch(`admin/ecup_stands/${params.id}`, params)
    } catch (error) {
      throw error;
    }
  },

  async delete({}, slug){

        try {
           return await this.$axios.$delete(`admin/ecup/${slug}`);
        } catch (error) {
            throw error;
        }
    }
};

export const getters = {

  };
