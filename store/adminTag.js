export const state = () => ({
});

export const mutations = {

};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/tag')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/tag', data)
        } catch (error) {
            throw error;
        }
    },

    async update({}, params){
      try {
            await this.$axios.$patch(`admin/tag/${params.slug}`, params)
        } catch (error) {
            throw error;
        }
    },

  async delete({}, slug){

        try {
           return await this.$axios.$delete(`admin/tag/${slug}`);
        } catch (error) {
            throw error;
        }
    }
};

export const getters = {

  };
