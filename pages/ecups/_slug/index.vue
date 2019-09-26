<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="12"
        md="8"
      >
        <app-carousel :posts="promoPosts" />

        <v-row no-gutters>
          <v-col
            cols="12"
            sm="12"
            md="5"
          >
            <v-card v-for="(teams, group) in sortArr(ecup.teams)"
              :key="group"
              outlined
              tile
              class="elevation-2"
            >
              <v-simple-table>
                <thead>
                <tr style="background: black; color: white">
                  <th class="subtitle-1 font-weight-bold text-left white--text">#</th>
                  <th class="subtitle-1 text-left white--text"></th>
                  <th class="subtitle-1 font-weight-bold text-left white--text">Группа {{group}}</th>
                  <th class="subtitle-1 font-weight-bold text-left white--text">И</th>
                  <th class="subtitle-1 font-weight-bold text-left white--text">О</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(team, index) in teams" :key="team.id">
                  <td class="text-xs-center">
                    {{index+1}}
                  </td>
                  <td class="text-xs-center pl-1 pr-1">
                    <img class="text-xs-center"
                         :src="team.img" alt="">
                  </td>
                  <td class="text-xs-left pa-0 ma-0">
                    <nuxt-link v-if="team.champ_id" class="black--text tabLink" :to="'/team/' + team.team.slug">
                      {{ team.name }}
                    </nuxt-link>

                    <span v-else>{{ team.name }}</span>

                  </td>
                  <td class="text-left">
                    <span>{{team.games}}</span>
                  </td>
                  <td class="text-left">
                    <span>{{team.points}}</span>
                  </td>
                </tr>
                </tbody>
              </v-simple-table>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="7"
          >
            <app-posts :posts="posts" />
            <div v-if="showLoadMore && posts.length >= initPosts" class="text-center pt-1 pb-1">
              <v-btn @click="addPosts" tile outlined color="primary"style="width: 100%" >Загрузить еще</v-btn>
            </div>

            <div v-else class="text-right pr-2">
              <nuxt-link class="black--text tabLink text-right"
                         :to="'/news'"
              >
                Все новости
              </nuxt-link>
            </div>

          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="12"
      >
        <v-card
          outlined
          tile
          class="elevation-2"
        >
          <app-ecresults :ecup="ecup" :prevIcon="prevIcon" :nextIcon="nextIcon" :icons="icons" :right="right" :grow="grow"
                         :centered="centered" :vertical="vertical"/>
        </v-card>

      </v-col>
    </v-row>
  </v-container>

</template>

<script>
    import AppCarousel from "@/components/AppCarousel";
    import AppEcresults from "@/components/AppEcresults";
    import AppPosts from "@/components/AppPosts";
    import pusher from "@/plugins/pusher";
    export default {
        validate ({ params, store }) {
            return store.getters['home/menuEcups'].some((ecup) => ecup.slug === params.slug)
        },
        head () {
            return {
                title: `Новости еврофутбола. ${this.ecup.name}`,
                meta: [
                    { hid: 'description', name: 'description', content: `Просмотр: ${this.ecup.name}` }
                ]
            }
        },
        components: {AppCarousel, AppEcresults, AppPosts},
        data(){
            return {
                posts:'',
                ecup:'',
                showLoadMore: true,
                offset: 0,
                toLoad: 5,
                initPosts: 14,
                promoPosts: '',
                postChannel: null,
                resultChannel: null,
                icons: false,
                centered: false,
                grow: false,
                vertical: false,
                prevIcon: false,
                nextIcon: false,
                right: false,

            }
        },
        async asyncData({store, params}) {
            try {
                const {ecup} = await store.dispatch('ecups/ecupWithTeamsAndResults', params.slug);
                const {posts} = await store.dispatch('home/fetchEcupPosts', params.slug);
                return {
                    posts: posts.filter((post, id) => id <= 14),
                    ecup
                }
            } catch (error) {
                /*if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }*/
            }
        },
        methods: {
            addPosts(){
                let filtered = this.$store.getters['home/posts'].filter((post, idx) => idx > this.initPosts + this.offset && idx <= this.initPosts + this.toLoad + this.offset);
                this.posts.push(...filtered);
                this.offset += this.toLoad;
                if (this.posts.length >= this.$store.getters['home/posts'].length) {
                    this.showLoadMore = false;
                }
            }
        },
        mounted(){

            this.postChannel = pusher.subscribe('postChannel');
            this.postChannel.bind ('App\\Events\\PostEvent', function(data){
                if(data.post.ecup === this.$route.params.slug){
                    this.posts.unshift(data.post)
                }
            }.bind(this));
            this.resultChannel = pusher.subscribe('resultChannel');
            this.resultChannel.bind('App\\Events\\ResultEvent', function({result}){
                this.$store.commit('home/SET_LIVERES', result);
            }.bind(this));

        },
        beforeMount() {
            this.promoPosts = this.$store.getters['home/promoPosts'];
        },
        beforeDestroy() {
            this.postChannel.unbind();
        }
    }
</script>

<style scoped>

</style>
