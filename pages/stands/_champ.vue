<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="12"
        md="8"
      >
        <span>Турнирная таблица {{champ.name}}</span>
        <client-only>
        <v-data-table
          :headers="ChampHeader"
          :items="champ.teams"
          :disable-pagination="true"
          hide-default-footer
          class="elevation-10 pb-5"
        >
          <template v-slot:body="{ items }">
            <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td class="text-xs-center pa-0 pl-2 ma-0">
                {{index+1}}
              </td>
              <td class="text-xs-center pl-1 pr-1">
                <img class="text-xs-center"
                     :src="item.img" alt="">
              </td>
              <td class="text-xs-left pr-0 ma-0">
                <nuxt-link class="black--text tabLink" :to="'/team/' + item.slug">
                  {{ item.name }}
                </nuxt-link>
              </td>
              <td class="text-left pa-0 pr-2 ma-0">
                {{item.games}}
              </td>
              <td class="text-left pa-0 pr-2 ma-0">
                {{item.win}}
              </td>
              <td class="text-left pa-0 pr-2 ma-0">
                {{item.draw}}
              </td>
              <td class="text-left pa-0 pr-2 ma-0">
                {{item.lost}}
              </td>
              <td class="text-left pa-0 pr-2 ma-0">
                {{item.goals}}
              </td>
              <td class="text-left pa-0 pr-2 ma-0">
                {{item.missed}}
              </td>
              <td class="text-left pa-0 ma-0">
                {{item.diff}}
              </td>
              <td class="text-left pa-0 ma-0">
                {{item.points}}
              </td>
            </tr>
            </tbody>
          </template>
        </v-data-table>
        </client-only>
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="12"
      >
        <span>Новости</span>
        <app-posts  class="elevation-2" :posts="posts" />
        <div class="text-right">
          <nuxt-link class="black--text tabLink text-right"
                     :to="'/news'"
          >
            Все новости
          </nuxt-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import AppPosts from "@/components/AppPosts";
  import pusher from "@/plugins/pusher";
    export default {
        validate ({ params, store }) {
            return store.getters['home/menuChamps'].some((champ) => champ.slug === params.champ)
        },
        head () {
            return {
                title: `Новости еврофутбола. Турнирная таблица: ${this.champ.name}`,
                meta: [
                    { hid: 'description', name: 'description', content: `Просмотр турнирной таблицы: ${this.champ.name}` }
                ]
            }
        },
        components: {AppPosts},
        data(){
            return {
                ChampHeader: [
                    {
                        text: '#',
                        value: '',
                        align: 'left',
                        sortable: false,
                        class: 'text-xs-left pa-0 pl-2 ma-0',
                        width: ''
                    },
                    {
                        text: '',
                        value: '',
                        align: 'left',
                        sortable: false,
                        class: 'text-xs-center pl-1 pr-1',
                        width: ''
                    },
                    {
                        text: 'Команда',
                        value: '',
                        align: 'left',
                        sortable: false,
                        class: 'text-xs-left pr-0 ma-0',
                        width: ''
                    },
                    {
                        text: 'И',
                        value: 'games',
                        align: 'left',
                        sortable: true,
                        class: 'text-xs-left pa-0 pr-2 ma-0',
                        width: ''
                    },
                    {
                        text: 'В',
                        value: 'win',
                        align: 'left',
                        sortable: true,
                        class: 'text-xs-left pa-0 pr-2 ma-0',
                        width: ''
                    },
                    {
                        text: 'Н',
                        value: 'draw',
                        align: 'left',
                        sortable: true,
                        class: 'text-xs-left pa-0 pr-2 ma-0',
                        width: ''
                    },
                    {
                        text: 'П',
                        value: 'lost',
                        align: 'left',
                        sortable: true,
                        class: 'text-xs-left pa-0 pr-2 ma-0',
                        width: ''
                    },
                    {
                        text: 'З',
                        value: 'goals',
                        align: 'left',
                        sortable: true,
                        class: 'text-xs-left pa-0 pr-2 ma-0',
                        width: ''
                    },
                    {
                        text: 'Пр',
                        value: 'missed',
                        align: 'left',
                        sortable: true,
                        class: 'text-xs-left pa-0 pr-2 ma-0',
                        width: ''
                    },
                    {
                        text: 'Р',
                        value: 'diff',
                        align: 'left',
                        sortable: true,
                        class: 'text-xs-left pa-0 pr-2 ma-0',
                        width: ''
                    },

                    {
                        text: 'О',
                        value: 'points',
                        align: 'left',
                        sortable: true,
                        class: 'text-xs-left pa-0 ma-0',
                        width: ''
                    },


                ],
                champ:'',
                postChannel: null,
                posts:''
            }
        },
        async asyncData({store, params}) {
            try {
                const {champs} = await store.dispatch('home/fetchChamps');
                const {posts} = await store.dispatch('home/fetchPosts');

                return {
                    posts: posts.filter((post, idx) => idx <= 9),
                    champ: champs.find(champ => champ.slug === params.champ)
                }
            } catch (error) {
                /*if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }*/
            }
        },
        mounted(){
            this.postChannel = pusher.subscribe('postChannel');
            this.postChannel.bind ('App\\Events\\PostEvent', function({post}){
                this.posts.unshift(post);
            }.bind(this));

        },
        beforeDestroy() {
            this.postChannel.unbind();
        }
    }
</script>

<style scoped>

</style>
