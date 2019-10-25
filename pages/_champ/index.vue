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
            <v-card
              outlined
              tile
              class="elevation-2"
            >
                  <app-stands :teams="champ.teams" />
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
              <app-results :tour="champ.tour" :results="champ.results"/>
        </v-card>

          <v-card
            outlined
            tile
            class="elevation-2 mt-3"
          >
              <app-scorers :players="champ.players"/>

        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
    import AppCarousel from "@/components/AppCarousel";
    import AppStands from "@/components/AppStands";
    import AppResults from "@/components/AppResults";
    import AppScorers from "@/components/AppScorers";
    import AppPosts from "@/components/AppPosts";
    import pusher from "@/plugins/pusher";
    export default {
        validate ({ params, store }) {
            return store.getters['home/menuChamps'].some((champ) => champ.slug === params.champ)
        },
        head () {
            return {
                title: `Новости еврофутбола. ${this.champ.name}`,
                meta: [
                    { hid: 'description', name: 'description', content: `Просмотр чемпионата: ${this.champ.name}` }
                ]
            }
        },
        components: {AppCarousel, AppStands, AppResults, AppScorers, AppPosts},
        data(){
            return {
                posts:'',
                champ:'',
                showLoadMore: true,
                offset: 0,
                toLoad: 5,
                initPosts: 9,
                promoPosts: '',
                postChannel: null,
                resultChannel: null

            }
        },
        async asyncData({store, params}) {
            try {
                const {champs} = await store.dispatch('home/fetchChamps');
                const {posts} = await store.dispatch('home/fetchPosts', params.champ);

                return {
                    posts: posts.filter((post, id) => id <= 9),
                    champ: champs.find(champ => champ.slug === params.champ),
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
                if(data.post.champ === this.$route.params.champ){
                    this.posts.unshift(data.post)
                }
            }.bind(this));
            this.resultChannel = pusher.subscribe('resultChannel');
            this.resultChannel.bind('App\\Events\\ResultEvent', function({result}){
                if(!result.hasOwnProperty('ecup_id')){
                    this.$store.commit('home/SET_LIVERES', result);
                }
            }.bind(this));

        },
        beforeMount() {
          this.promoPosts = this.$store.getters['home/promoPosts'];
        },
        beforeDestroy() {
            this.postChannel.unbind();
            this.resultChannel.unbind();
        }
    }
</script>

<style scoped>

</style>
