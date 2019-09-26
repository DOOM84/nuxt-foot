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
            >
              <v-tabs
                background-color="black accent-4"
                class="elevation-2"
                dark
                :centered="centered"
                :grow="grow"
                :vertical="vertical"
                :right="right"
                :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
                :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
                :icons-and-text="icons"
              >
                <v-tabs-slider></v-tabs-slider>
                <v-tab
                  v-for="champ in champs"
                  :key="champ.id"
                  :href="`#tab-${champ.id}`"
                >
                  {{ champ.name }}
                </v-tab>
                <v-tab-item
                  v-for="champ in champs"
                  :key="champ.id"
                  :value="'tab-' + champ.id"
                >
                  <app-stands :teams="champ.teams" />
                </v-tab-item>
              </v-tabs>
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

            <div v-else class="text-right">
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
        >
          <v-tabs
            background-color="black accent-4"
            class="elevation-2"
            dark
            :centered="centered"
            :grow="grow"
            :vertical="vertical"
            :right="right"
            :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
            :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
            :icons-and-text="icons"
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tab
              v-for="champ in champs"
              :key="champ.id"
              :href="`#tab-${champ.id}`"
            >
              {{ champ.name }}
            </v-tab>

            <v-tab-item
              v-for="champ in champs"
              :key="champ.id"
              :value="'tab-' + champ.id"
            >
              <app-results :tour="champ.tour" :results="champ.results"/>
            </v-tab-item>
          </v-tabs>
          <v-tabs
            background-color="black accent-4"
            class="mt-2 elevation-2"
            dark
            :centered="centered"
            :grow="grow"
            :vertical="vertical"
            :right="right"
            :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
            :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
            :icons-and-text="icons"
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tab
              v-for="champ in champs"
              :key="champ.id"
              :href="`#tab-${champ.id}`"
            >
              {{ champ.name }}
            </v-tab>

            <v-tab-item
              v-for="champ in champs"
              :key="champ.id"
              :value="'tab-' + champ.id"
            >
             <app-scorers :players="champ.players"/>
            </v-tab-item>
          </v-tabs>
          <v-card color="blue-grey lighten-5 mt-2" v-for="ecup in ecups" :key="ecup.slug" outlined tile>
            <app-ecstands :ecup="ecup" :prevIcon="prevIcon" :nextIcon="nextIcon" :icons="icons"/>

          </v-card>
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
import AppEcstands from "@/components/AppEcstands";
import pusher from "@/plugins/pusher";

export default {
    components: {AppCarousel, AppStands, AppResults, AppScorers, AppPosts, AppEcstands},
    head () {
        return {
            title: 'Новости еврофутбола. Добро пожаловать!',
            meta: [
                { hid: 'description', name: 'description', content: 'Новости еврофутбола. Главная страница' }
            ]
        }
    },
    data() {
        return {
            posts:'',
            champs:'',
            ecups:'',
            showLoadMore: true,
            offset: 0,
            toLoad: 5,
            initPosts: 14,
            icons: false,
            centered: false,
            grow: false,
            vertical: false,
            prevIcon: false,
            nextIcon: false,
            right: false,
            promoPosts: '',
            postChannel: null,
            resultChannel: null
        }
    },
    async asyncData({store}) {
        try {
            const {posts} = await store.dispatch('home/fetchPosts');
            const {champs} = await store.dispatch('home/fetchChamps');
            const {ecups} = await store.dispatch('ecups/ecupsWithTeams');
                return {
                    posts: posts.filter((post, id) => id <= 14),
                    champs,
                    ecups,
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
    beforeMount() {
        this.promoPosts = this.$store.getters['home/promoPosts'];
    },
    mounted(){
        this.postChannel = pusher.subscribe('postChannel');
        this.postChannel.bind ('App\\Events\\PostEvent', function(data){
            this.posts.unshift(data.post)
        }.bind(this));

        this.resultChannel = pusher.subscribe('resultChannel');
        this.resultChannel.bind('App\\Events\\ResultEvent', function({result}){
            this.$store.commit('home/SET_LIVERES', result);
            /*let ind = this.champs.findIndex(x => x.id === result.champ_id);
            let resInd = this.champs[ind].results[result.date].findIndex(res => res.id === result.id);
            this.champs[ind].results[result.date][resInd].res1 = result.res1;
            this.champs[ind].results[result.date][resInd].res2 = result.res2;
            this.champs[ind].results[result.date][resInd].is_live = result.is_live;*/
        }.bind(this));

    },
    beforeDestroy() {
        this.postChannel.unbind();
        this.resultChannel.unbind();
    }
}
</script>

<style scoped>

</style>
