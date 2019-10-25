<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="12"
        md="8"
      >
        <v-row class="pl-5 pr-5 pt-2 pb-2">
          <span v-if="archDesc">{{archDesc}}. <v-btn text small class="text-right" @click="getArchInfo('')">Вернуться</v-btn></span>
          <span v-else>Турнирная таблица {{champ.name}}. </span>
          <v-spacer></v-spacer>

          <v-menu v-if="years.length" offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                color="dark"
                dark
                v-on="on"
              >
                Архив. Сезоны
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(year, index) in years"
                :key="index"
                @click="getArchInfo(year)"
              >
                <v-list-item-title>{{ year }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
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
                years:'',
                postChannel: null,
                archDesc: '',
                archTeams: [],
                posts:''
            }
        },
        async asyncData({store, params}) {
            try {
                const {champ, years} = await store.dispatch('home/fetchChamp', params.champ);
                const {posts} = await store.dispatch('home/fetchPosts');

                return {
                    posts: posts.filter((post, idx) => idx <= 9),
                    years,
                    champ/*: champs.find(champ => champ.slug === params.champ)*/
                }
            } catch (error) {
                /*if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }*/
            }
        },
        computed: {
            teams(){
                return this.archTeams.length ? this.archTeams : this.champ.teams
            }
        },
        methods: {
            async getArchInfo(year){
                const {teams} = await this.$store.dispatch('calendar/fetchArchStands', {'champ':this.champ.slug, 'season': year});
                this.champ.teams = teams;
                this.archDesc = year ? `Турнирная таблица ${this.champ.name}. Сезон ${year}` : ''
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
