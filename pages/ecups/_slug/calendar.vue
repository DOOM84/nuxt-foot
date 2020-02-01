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
          <span v-else>Календарь {{ecup.name}}. </span>
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
          <v-simple-table class="elevation-10">
            <template v-for="(games, group) in ecup.results ? sortArr(ecup.results) : ecup.results">
              <tr style="background: black; color: white">
                <th class="subtitle-1 font-weight-bold text-left white--text text-center" colspan="5">
                  Группа {{group}}
                </th>
              </tr>
              <template v-for="(dates, tour) in games">
                <template v-for="(times, date) in dates">
                  <tr>
                    <th class="pa-0 ma-0 text-center" style="background-color: #d9e3e6" colspan="5">
                      {{tour}} Тур, {{date}}
                    </th>
                  </tr>
                  <template v-for="(matches, time) in times">
                    <tr>
                      <th class="pa-0 ma-0 text-center" style="background-color: #F5F5F5" colspan="5">
                        {{time}}
                      </th>
                    </tr>
                    <template v-for="match in matches">
                      <tr>
                        <td style="width: 35%" class="text-center pa-0 ma-0">
                          <img class="text-center"
                               :src="match.team11.img" alt="">
                          <br>

                          <nuxt-link v-if="match.team11.champ_id" class="black--text tabLink" :to="'/team/' + match.team11.team.slug">
                            {{ match.team11.name }}
                          </nuxt-link>

                          <span v-else>{{ match.team11.name }}</span>
                        </td>

                        <td :class="{ 'isLive': match.is_live, 'text-center pa-0 ma-0' : true }">
                          {{match.res1}}
                        </td>
                        <td :class="{ 'isLive': match.is_live,  'text-center pa-0 ma-0' : true}">
                          :
                        </td>
                        <td :class="{ 'isLive': match.is_live, 'text-center pa-0 ma-0' : true }">
                          {{match.res2}}
                        </td>
                        <td style="width: 35%" class="text-center  pa-0 ma-0">
                          <img class="text-center"
                               :src="match.team22.img" alt="">
                          <br>
                          <nuxt-link v-if="match.team22.champ_id" class="black--text tabLink" :to="'/team/' + match.team22.team.slug">
                            {{ match.team22.name }}
                          </nuxt-link>
                          <span v-else>{{ match.team22.name }}</span>
                        </td>
                      </tr>

                    </template>
                  </template>

                </template>
              </template>
            </template>
          </v-simple-table>

          <v-simple-table class="elevation-10 mt-3">
            <template v-for="(dates, playoff) in ecup.playOffResults ? sortArr(ecup.playOffResults) : ecup.playOffResults">
              <tr style="background: black; color: white">
                <th class="subtitle-1 font-weight-bold text-left white--text text-center" colspan="5">
                  {{playoff}}
                </th>
              </tr>
                <template v-for="(times, date) in dates">
                  <tr>
                    <th class="pa-0 ma-0 text-center" style="background-color: #d9e3e6" colspan="5">
                      {{date}}
                    </th>
                  </tr>
                  <template v-for="(matches, time) in times">
                    <tr>
                      <th class="pa-0 ma-0 text-center" style="background-color: #F5F5F5" colspan="5">
                        {{time}}
                      </th>
                    </tr>
                    <template v-for="match in matches">
                      <tr>
                        <td style="width: 35%" class="text-center pa-0 ma-0">
                          <img class="text-center"
                               :src="match.team11.img" alt="">
                          <br>

                          <nuxt-link v-if="match.team11.champ_id" class="black--text tabLink" :to="'/team/' + match.team11.team.slug">
                            {{ match.team11.name }}
                          </nuxt-link>

                          <span v-else>{{ match.team11.name }}</span>
                        </td>

                        <td :class="{ 'isLive': match.is_live, 'text-center pa-0 ma-0' : true }">
                          {{match.res1}}
                        </td>
                        <td :class="{ 'isLive': match.is_live,  'text-center pa-0 ma-0' : true}">
                          :
                        </td>
                        <td :class="{ 'isLive': match.is_live, 'text-center pa-0 ma-0' : true }">
                          {{match.res2}}
                        </td>
                        <td style="width: 35%" class="text-center  pa-0 ma-0">
                          <img class="text-center"
                               :src="match.team22.img" alt="">
                          <br>
                          <nuxt-link v-if="match.team22.champ_id" class="black--text tabLink" :to="'/team/' + match.team22.team.slug">
                            {{ match.team22.name }}
                          </nuxt-link>
                          <span v-else>{{ match.team22.name }}</span>
                        </td>
                      </tr>

                    </template>
                  </template>

                </template>
            </template>
          </v-simple-table>
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
            return store.getters['home/menuEcups'].some((ecup) => ecup.slug === params.slug)
        },
        head () {
            return {
                title: `Новости еврофутбола. ${this.ecup.name}. Календарь`,
                meta: [
                    { hid: 'description', name: 'description', content: `Просмотр календаря: ${this.ecup.name}` }
                ]
            }
        },
        components: {AppPosts},
        data(){
            return {
                ecup:'',
                years:'',
                posts: '',
                archDesc: '',
                postChannel: null,
            }
        },
        async asyncData({store, params}) {
            try {
                const {ecup, years} = await store.dispatch('ecups/ecupWithResults', params.slug);
                const {posts} = await store.dispatch('home/fetchPosts');

                return {
                    posts: posts.filter((post, idx) => idx <= 9),
                    ecup,
                    years
                }
            } catch (error) {
                /*if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }*/
            }
        },
        methods: {
            async getArchInfo(year){
                const {results, playOffResults} = await this.$store.dispatch('ecups/fetchArchCalendar', {'ecup':this.ecup.slug, 'season': year});
                this.ecup.results = results;
                this.ecup.playOffResults = playOffResults;
                this.archDesc = year ? `Календарь ${this.ecup.name}. Сезон ${year}` : ''
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

