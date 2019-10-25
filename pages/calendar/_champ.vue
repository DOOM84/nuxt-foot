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
          <span v-else>Календарь {{champ.name}}. </span>


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


        <template v-for="(matches, tour) in results">
          <div class="elevation-10 white--text text-center pa-2" style="width: 100%; background: black" >
            <span class="subheading font-weight-black" >{{tour}}-й тур.</span>
          </div>
          <v-simple-table class="elevation-10">
            <tbody>
            <template v-for="(dates, ind) in matches">
              <tr>
                <th class="pa-0 ma-0 text-center" style="background-color: #F5F5F5" colspan="6">
                   {{ ind }}
                </th>
              </tr>
              <tr v-for="match in dates" :key="match.id">
                <td style="width: 10%" class="text-xs-left pa-0 ma-0 caption">
                  {{ match.time }}
                </td>
                <td style="width: 25%" class="text-center pa-0 ma-0">
                  <img class="text-xs-center"
                       :src="match.team11.img" alt="">
                  <br>
                  <nuxt-link class="tabLink black--text"
                               :to="'/team/' + match.team11.slug"
                  >
                    {{ match.team11.name }}
                  </nuxt-link>
                </td>

                <td style="width: 5%" class="text-center pa-0 ma-0">
                  {{ match.res1 }}
                </td>
                <td style="width: 5%" class="text-center  pa-0 ma-0">
                  :
                </td>
                <td style="width: 5%" class="text-center  pa-0 ma-0">
                  {{ match.res2 }}
                </td>
                <td style="width: 35%" class="text-center  pa-0 ma-0">
                  <img class="text-center"
                       :src="match.team22.img" alt="">
                  <br>
                  <nuxt-link class="tabLink black--text" :to="'/team/' + match.team22.slug">
                    {{ match.team22.name }}
                  </nuxt-link>
                </td>
              </tr>
            </template>
            </tbody>
          </v-simple-table>
        </template>
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
                title: `Новости еврофутбола. Календарь: ${this.champ.name}`,
                meta: [
                    { hid: 'description', name: 'description', content: `Просмотр календаря: ${this.champ.name}` }
                ]
            }
        },
        components: {AppPosts},
        data: function () {
            return {
                results: '',
                years: '',
                posts: '',
                champ: '',
                archDesc: '',
                postChannel: null
            }
        },
        async asyncData({store, params}) {
            try {
                const {posts} = await store.dispatch('home/fetchPosts');
                const {results, years} = await store.dispatch('calendar/fetchCalendar', params.champ);

                return {
                    posts: posts.filter((post, idx) => idx <= 9),
                    results,
                    years,
                    champ: store.getters['home/menuChamps'].find(champ => champ.slug === params.champ)
                }
            } catch (error) {
                /*if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }*/
            }
        },
        methods: {
            async getArchInfo(year){
                const {results} = await this.$store.dispatch('calendar/fetchArchCalendar', {'champ':this.champ.slug, 'season': year});
                this.results = results;
                this.archDesc = year ? `Календарь ${this.champ.name}. Сезон ${year}` : ''
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
        },

    }
</script>

<style scoped>

</style>
