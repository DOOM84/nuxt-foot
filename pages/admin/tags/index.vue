<template>
  <div>
    <v-col>
      <v-row>
        <crumbs :items="items" />
        <v-spacer></v-spacer>
        <v-btn to="/admin/tags/create" color="success">Добавить тег</v-btn>
      </v-row>
    </v-col>
    <client-only>
      <v-data-table
        :headers="headers"
        :items="tags"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-icon
            small
            color="info"
            class="mr-2"
            @click="editItem(item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            color="info"
            @click="deleteItem(item.slug)"
          >
            delete
          </v-icon>
        </template>
      </v-data-table>
    </client-only>
  </div>
</template>

<script>
    import Crumbs from '@/components/crumbs'
export default {
    layout: 'admin',
    components: { Crumbs },
    data () {
        return {
            items: [
                {
                    text: 'Панель управления',
                    disabled: false,
                    to: "/admin",
                },
                {
                    text: 'Теги',
                    disabled: true,
                    to: '/admin/tags',
                }
            ],
            tags: '',
            headers: [
                {
                    text: 'Название',
                    //align: 'left',
                    //sortable: false,
                    value: 'name',
                },
                { text: 'Псевдоним', value: 'slug' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
        }
    },

    async asyncData({store}) {
        try {
            const {tags} = await store.dispatch('adminTag/index');
            return {
                tags
            }
        } catch (error) {
            if (error.response.status === 401) {
                return $nuxt.$router.replace('/login');
            }
        }
    },
    methods: {
        editItem(tag){this.$router.push({name: 'admin-tags-edit', params: { 'tag' : tag}})},

        async deleteItem(slug){
            if (confirm('Are You Sure?')){
                const {success} = await this.$store.dispatch('adminTag/delete', slug);
                this.tags.splice(this.tags.findIndex(item => item.slug === slug), 1);
                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: success,
                    color: 'success'
                });
            }
        }
    }
}
</script>
