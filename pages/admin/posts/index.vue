<template>
  <div>
    <v-col>
      <v-row>
        <crumbs :items="items" />
        <v-spacer></v-spacer>
        <v-btn to="/admin/posts/create" color="success">Добавить новость</v-btn>
      </v-row>
    </v-col>



    <client-only>
      <v-card>
        <v-card-title>

          <div class="flex-grow-1"></div>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Поиск"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      <v-data-table
        :headers="headers"
        :items="posts"
        :items-per-page="15"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.id="{ item }">
          {{posts.indexOf(item)+1}}
        </template>
        <template v-slot:item.subtitle="{ item }">
          {{ item.subtitle ? item.subtitle.substring(0, 25) + '...' : '-' }}
        </template>
        <template v-slot:item.image="{ item }">
          <v-img
            :src="item.image"
            aspect-ratio="0.7"
            class="grey lighten-2"
          ></v-img>
        </template>
        <template v-slot:item.is_headline="{ item }">
          {{item.is_headline ? 'Да' : 'Нет'}}
        </template>
        <template v-slot:item.status="{ item }">
          {{item.status ? 'Да' : 'Нет'}}
        </template>
        <template v-slot:item.source="{ item }">
          {{ item.source ? item.source.substring(0, 25) + '...' : '-' }}
        </template>
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
      </v-card>
    </client-only>
  </div>

</template>

<script>
  import Crumbs from '@/components/crumbs'
    export default {
        layout: 'admin',
        components: {Crumbs},
        data () {
            return {
                items: [
                    {
                        text: 'Панель управления',
                        disabled: false,
                        to: "/admin",
                    },
                    {
                        text: 'Новости',
                        disabled: true,
                        to: '/admin/posts',
                    }
                ],
                posts: '',
                search: '',
                headers: [
                    { text: '#', value: 'id' },
                    { text: 'Название', value: 'title'},
                    { text: 'Описание', value: 'subtitle' },
                    { text: 'Изображение', value: 'image', sortable: false },
                    { text: 'Чемпионат', value: 'champ' },
                    { text: 'Еврокубок', value: 'ecup' },
                    { text: 'В "карусели"', value: 'is_headline' },
                    { text: 'Опубликовано', value: 'status' },
                    { text: 'Источник', value: 'source' },
                    { text: 'Actions', value: 'action', sortable: false },
                ],
            }
        },
        async asyncData({store}) {
            try {
                const {posts} = await store.dispatch('adminPost/index');
                return {
                    posts
                }
            } catch (error) {

            }
        },
        methods: {
            editItem(post){
                this.$router.push({name: 'admin-posts-edit', params: { 'post': post} })
            },
            async deleteItem(slug){
                if (confirm('Are You Sure?')){
                    const {success} = await this.$store.dispatch('adminPost/delete', slug);
                    this.posts.splice(this.posts.findIndex(item => item.slug === slug), 1);
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: success,
                        color: 'success'
                    });
                }
            },
        }
    }
</script>
