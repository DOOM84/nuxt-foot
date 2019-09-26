<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="12"
        md="8"
      >
        <v-col class="pl-2">
        <span class="title mb-5">РЕЗУЛЬТАТЫ ПОИСКА: {{this.$store.getters['search/search']}}</span>
        </v-col>
        <span class="pl-2 title">Команды (найдено {{result.totalTeams}}):</span>
        <v-row id="teams" class="pl-2 pr-2 pb-5">

            <v-col v-for="team in result.teams" :key="team.id" cols="12" sm="6" md="4">
            <nuxt-link style="text-decoration: none;" class="black--text"
                         :to="'/team/' + team.slug">
              <v-card class="elevation-2">
                <div class="text-center">
                  <v-img
                    :src="team.img"
                    height="151px"
                    contain
                  ></v-img>
                  <h3 class="headline mb-0">{{team.name}}</h3>
                </div>
              </v-card>
            </nuxt-link>
            </v-col>


          <v-pagination v-if="result.teamPages > 1" class="pt-5 pb-5"
             v-model="staticTeamPage"
             :length="result.teamPages"
             @input="nextTeamPage"
             v-scroll-to="{ el: '#teams', offset: -200 }"
          ></v-pagination>

        </v-row>
        <span class="pl-2 title">Игроки (найдено {{result.totalPlayers}}):</span>
        <v-row id="players" class="pl-2 pr-2 pb-5">

          <v-col v-for="player in result.players" :key="player.id" cols="12" sm="6" md="4">
            <v-card>
              <router-link style="text-decoration: none;" class="black--text" :to="'/player/' + player.slug">
                <v-img
                  :src="player.img"

                ></v-img>

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{player.name}}</h3>
                    <span class="body-2">{{player.position}}</span>
                    <img :title="player.team" style="vertical-align: middle;"

                         :src="player.team_icon" alt=""/>
                  </div>
                </v-card-title>
              </router-link>
            </v-card>
          </v-col>

          <v-pagination v-if="result.playerPages > 1" class="pt-5 pb-5"
              v-model="staticPlayerPage"
              :length="result.playerPages"
              @input="nextPlayerPage"
              v-scroll-to="{ el: '#players', offset: -200 }"
          ></v-pagination>
        </v-row>
        <span class="pl-2 title">Новости (найдено {{result.totalPosts}}):</span>
        <v-row id="posts" class="pl-2 pr-2 pb-5">

          <v-col v-for="post in result.posts" :key="post.id" cols="12" sm="6" md="4">
            <v-card>

              <nuxt-link :to="'/' + (post.ecup ? 'ecups/' : '') +  (post.champ.slug || post.champ || post.ecup)  + '/' + post.slug" style="text-decoration: none;"
                         class="black--text">
                <v-img
                  :src="post.img"
                  height="200px"
                >
                </v-img>
                <div class="text-right pr-2 caption">
                  <span class="grey--text">{{post.date}} </span>
                  <span class="red--text">{{post.champ_name || post.ecup_name}}  </span>

                </div>

                <div class="pa-3" >
                  <p class="title mb-0">{{post.title}}</p>
                </div>
              </nuxt-link>
            </v-card>
          </v-col>

          <v-pagination v-if="result.postPages > 1" class="pt-5 pb-5"
                        v-model="staticPostPage"
                        :length="result.postPages"
                        @input="nextPostPage"
                        v-scroll-to="{ el: '#posts', offset: -200 }"
          ></v-pagination>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="12"
      >
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
    export default {
        validate ({ params, store }) {
            return !!store.getters['search/search']
        },
        head () {
            return {
                title: `Новости еврофутбола. Поиск: ${this.$store.getters['search/search']}`,
                meta: [
                    { hid: 'description', name: 'description', content: 'Поиск по сайту' }
                ]
            }
        },
        components: {
            AppPosts
        },
        data() {
            return {
                page: 1,
                playerPage: 1,
                postPage: 1,
                teamPage: 1,
                staticPlayerPage: 1,
                staticPostPage: 1,
                staticTeamPage: 1,
                result: '',
                posts: '',

            }
        },
        async asyncData({store, params}) {
            try {
                const {posts} = await store.dispatch('home/fetchPosts');
                const result = await store.dispatch('search/fetchResults', store.getters['search/search']);
                return {
                    posts: posts.filter((post, idx) => idx <= 9),
                    result
                }
            } catch (error) {
                /*if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }*/
            }
        },
        mounted() {
            this.$store.watch(
                (state, getters) => getters['search/start'],
                (newValue, oldValue) => {
                    if(newValue){
                        this.searchFromThisPage()
                    }
                })
        },
        methods: {
            async searchFromThisPage(){
                const result = await this.$store.dispatch('search/fetchResults', this.$store.getters['search/search']);
                this.result = result;
                this.$store.commit('search/SET_START', false);
            },
            async nextPlayerPage(event) {
                if (event !== this.playerPage) {
                    this.playerPage = event;
                    const {players} = await this.$store.dispatch('search/fetchPagedPlayers',
                        {page: this.playerPage, query: this.$store.getters['search/search']});
                    this.result.players = players
                } else {
                    return false
                }

            },
            async nextPostPage(event) {
                if (event !== this.postPage) {
                    this.postPage = event;
                    const {posts} = await this.$store.dispatch('search/fetchPagedPosts',
                        {page: this.postPage, query: this.$store.getters['search/search']});
                    this.result.posts = posts
                } else {
                    return false
                }
            },
            async nextTeamPage(event) {
                if (event !== this.teamPage) {
                    this.teamPage = event;
                    const {teams} = await this.$store.dispatch('search/fetchPagedTeams',
                        {page: this.teamPage, query: this.$store.getters['search/search']});
                    this.result.teams = teams
                } else {
                    return false
                }
            }
        },
        beforeDestroy() {
            this.$store.commit('search/SET_SEARCH', '')
        }
    }
</script>

<style scoped>

</style>
