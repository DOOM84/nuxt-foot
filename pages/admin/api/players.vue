<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <crumbs :items="items" />
      <v-col
        cols="12"
        sm="12"
        md="12"
        class="text-center"
      >

        <v-card outlined tile>

          <v-tabs
            background-color="black accent-4"
            class="elevation-2"
            dark
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
              <v-simple-table>
                <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left"></th>
                  <th class="text-left">Команда</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(team, index) in champ.teams" :key="team.id">
                  <td class="text-xs-center">
                    {{index+1}}
                  </td>
                  <td class="text-xs-center pl-1 pr-1">
                    <img class="text-xs-center"
                         :src="team.img" alt="">
                  </td>
                  <td class="text-xs-left pa-0 ma-0">
                      {{ team.name }}
                  </td>
                  <td class="text-xs-center pl-1 pr-1">
                    <v-btn class="mb-5" color="success" @click="getTeams(team.parse_id, false)">Обновить состав</v-btn>
                    <v-btn class="mb-5" color="info" @click="getTeams(team.parse_id, true)">Фильтровать состав</v-btn>
                  </td>
                </tr>
                </tbody>
              </v-simple-table>
            </v-tab-item>
          </v-tabs>

        </v-card>
      </v-col>
    </v-row>
    </v-container>
</template>

<script>
    import Crumbs from '@/components/crumbs'
    export default {
        layout: 'admin',
        components: {Crumbs},
        data() {
            return {
                items: [
                    {
                        text: 'Панель управления',
                        disabled: false,
                        to: '/admin'
                    },
                    {
                        text: 'Api (составы)',
                        disabled: true,
                        to: '/admin'
                    },
                ],
                id: '',
                champs: '',
                prevIcon: false,
                nextIcon: false,
                icons: false,
            }
        },
        async asyncData({store}) {
            try {
                const {champs} = await store.dispatch('adminChamp/index');
                return {
                    champs
                }
            } catch (error) {
                if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }
            }
        },
        methods: {
            async getTeams(teamId, filter) {
                try {
                    const {teams} = await this.$axios.$get(`admin/apiTeams/${teamId}`);

                    let sq = teams.squad.filter((player) => player.role === 'PLAYER');
                    const squad = [];
                    for (var k in sq) {
                        squad[k] = {
                            'name': sq[k].name,
                            //'parse_id': sq[k].id,
                            'country': sq[k].nationality,
                            'position': sq[k].position,
                            'dob' : sq[k].dateOfBirth == null ? '1900-01-01'  : sq[k].dateOfBirth.substring(0, sq[k].dateOfBirth.length-10)
                        };
                    }
                    if(filter){
                        await this.$axios.$post('admin/filterTeam', {'squad': squad, 'teamName': teams.name});
                    }else{
                        await this.$axios.$post('admin/updTeam', {'squad': squad, 'teamName': teams.name});
                    }

                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Успешно',
                        color: 'success'
                    })

                }catch (e) {
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Ошибка',
                        color: 'error'
                    });
                    console.log(e);
                }
            },
        }
    }
</script>

<style scoped>

</style>
