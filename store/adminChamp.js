export const state = () => ({
});

export const mutations = {

};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/champ')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/champ', data)
        } catch (error) {
            throw error;
        }
    },

    async update({}, params){
      try {
            await this.$axios.$patch(`admin/champ/${params.slug}`, params)
        } catch (error) {
            throw error;
        }
    },

  async stands({}, params){
      try {
            await this.$axios.$patch(`admin/stands/${params.slug}`, params)
        } catch (error) {
            throw error;
        }
    },
  async delete({}, slug){

        try {
           return await this.$axios.$delete(`admin/champ/${slug}`);
        } catch (error) {
            throw error;
        }
    }
};

export const getters = {

  };
