<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="12"
        md="8"
      >
        <span>Турнирные таблицы {{ecup.name}}</span>
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
              <th class="subtitle-1 font-weight-bold text-left white--text">В</th>
              <th class="subtitle-1 font-weight-bold text-left white--text">Н</th>
              <th class="subtitle-1 font-weight-bold text-left white--text">П</th>
              <th class="subtitle-1 font-weight-bold text-left white--text">З</th>
              <th class="subtitle-1 font-weight-bold text-left white--text">Пр</th>
              <th class="subtitle-1 font-weight-bold text-left white--text">Р</th>
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
                {{team.games}}
              </td>
              <td class="text-left">
                {{team.win}}
              </td>
              <td class="text-left">
                {{team.draw}}
              </td>
              <td class="text-left">
                {{team.lost}}
              </td>
              <td class="text-left">
                {{team.goals}}
              </td>
              <td class="text-left">
                {{team.missed}}
              </td>
              <td class="text-left">
                {{team.diff}}
              </td>
              <td class="text-left">
                {{team.points}}
              </td>
            </tr>
            </tbody>
          </v-simple-table>
        </v-card>
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
                title: `Новости еврофутбола. ${this.ecup.name}. Группы. Турнирные таблицы`,
                meta: [
                    { hid: 'description', name: 'description', content: `Группы. Просмотр турнирных таблиц: ${this.ecup.name}` }
                ]
            }
        },
        components: {AppPosts},
        data(){
            return {
                ecup:'',
                posts: '',
                postChannel: null,
            }
        },
        async asyncData({store, params}) {
            try {
                const {ecup} = await store.dispatch('ecups/ecupWithTeams', params.slug);
                const {posts} = await store.dispatch('home/fetchPosts');

                return {
                    posts: posts.filter((post, idx) => idx <= 9),
                    ecup
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

