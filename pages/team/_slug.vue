<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        md="4"
        sm="12"
      >
        <v-card>
          <div class="headline text-center pb-2"><strong>{{team.name}}</strong></div>
          <v-img
            :src="team.img"
            height="151px"
            contain
          ></v-img>
          <ul class="text-center pa-0 pt-2" style="list-style-type: none">
            <li>Президент:
              <p><strong>{{team.pres}}</strong></p></li>
            <li>Главный тренер:<p><strong>{{team.coach}}</strong></p></li>
            <li>Стадион:<p><strong>{{team.stad}}</strong></p></li>
            <li>Год основания:<p><strong>{{team.year}}</strong></p></li>
            <li>Сайт клуба:<p><a target="_blank" :href="team.site">{{team.site}}</a>
            </p></li>
          </ul>
        </v-card>
        <v-card
          outlined
          tile
          class="elevation-2"
        >
          <app-stands :teams="champ.teams" />
        </v-card>
        <v-card v-if="team.ecup_team"
          outlined
          tile
          class="elevation-2 mt-2"
        >
        <template
          v-for="(teams, group ) in team.ecup_team"
        >
          <v-simple-table>
            <thead>
            <tr>
              <th colspan="5" class="text-center">
                {{team.ecup}}. Группа {{group}}
              </th>
            </tr>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left"></th>
              <th class="text-left">Команда</th>
              <th class="text-left">И</th>
              <th class="text-left">О</th>
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
        </template>
        </v-card>
        <template v-if="team.posts.length">
          <span>Новости команды</span>
          <app-posts  class="elevation-2" :posts="team.posts" />
          <div class="text-right">
            <nuxt-link class="black--text tabLink text-right"
                       :to="'/news'"
            >
              Все новости
            </nuxt-link>
          </div>
        </template>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="8"
      >
        <span class="title pl-2">Состав</span>
        <v-row class="pl-2 pr-2">
          <v-col v-for="player in players" :key="player.id" cols="12" sm="6" md="4">
              <v-card>
                <router-link style="text-decoration: none;" class="black--text" :to="'/player/' + player.slug">
                  <v-img
                    :src="player.img"
                  ></v-img>
                  <div class="pl-4" >
                    <p class="headline mb-0">{{player.name}}</p>
                    <div class="body-2 pb-2">{{player.player_detail.player_position.name}}</div>
                  </div>

                </router-link>
              </v-card>
          </v-col>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
    import AppPosts from "@/components/AppPosts";
    import AppStands from "@/components/AppStands";
    export default {
        validate ({ params }) {
            return !!params.slug
        },
        head () {
            return {
                title: `Новости еврофутбола. Команда: ${this.team.name}`,
                meta: [
                    { hid: 'description', name: 'description', content: `Просмотр команды: ${this.team.name}` }
                ]
            }
        },
        components: {AppPosts, AppStands},
        data() {
            return {
            team:'',
            champ: '',

            }
        },
        async asyncData({store, params}) {
            try {
                const {team} = await store.dispatch('teams/fetchTeamSlug', params.slug);
                const {champs} = await store.dispatch('home/fetchChamps');
                return {
                    team,
                    champ: champs.find(champ => champ.slug === team.champ_slug),
                }
            } catch (error) {
                /*console.log(error);
                if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }*/
            }
        },
        computed : {
            players(){
                const players = Object.values(this.team.players);
                players.sort((a, b) => (a.player_detail.position_id > b.player_detail.position_id) ? -1 : 1);
                return players
            }
        }
    }
</script>

<style scoped>

</style>
