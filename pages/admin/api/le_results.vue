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
        <v-btn class="mr-3" v-for="(tour, index) in tours" :key="tour" color="success" @click="getResults(index+1, tour, false)">
          {{index+1}} тур
        </v-btn>
        <v-btn class="mr-3" v-for="playoff in playoffs" :key="playoff.id" color="success" @click="getResults(playoff.name, playoff.id, true)">
          {{playoff.name}}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import Crumbs from '@/components/crumbs'
    import axios from 'axios'
    export default {
        layout: 'admin',
        components: {Crumbs},
        data() {
            return {
                results: [],
                items: [
                    {
                        text: 'Панель управления',
                        disabled: false,
                        to: '/admin'
                    },
                    {
                        text: 'Api (результаты ЛE)',
                        disabled: true,
                        to: '/admin'
                    },
                ],
                tours: [33963,33964,33965,33966,33967,33968],
                playoffs:[
                  {
                  id:2001151,
                  name:'1/16 финала'
                },
                  {
                  id:2001152,
                  name:'1/8 финала'
                }
                ]
            }
        },
        methods: {
            getResults(tour, uefa_tour, playoff) {
                try {

                    let url = 'https://match.uefa.com/v1/matches?fromDate=2019-09-19&toDate=2020-6-19&competitionId=14&style=SHORT&pagesize=200&language=EN';
                  axios
                        .get(url)
                        .then(response => {
                            let allResults = !playoff ? response.data.filter((game) => game.round.mode === "GROUP" && game.matchDay.id === uefa_tour.toString())
                              : response.data.filter((game) => game.round.mode === "KNOCK_OUT" && game.round.id === uefa_tour.toString());
                            for (var k in allResults) {
                                this.results[k] = {
                                    //'neme1': allResults[k].homeTeam.displayName,
                                    //'neme2': allResults[k].awayTeam.displayName,
                                    'team1': allResults[k].homeTeam.id,
                                    'team2': allResults[k].awayTeam.id,
                                    'res1': allResults[k].homeTeamScore ? allResults[k].homeTeamScore.score : null,
                                    'res2': allResults[k].awayTeamScore ? allResults[k].awayTeamScore.score : null,
                                    'tour': allResults[k].round.mode === "KNOCK_OUT" ? 0 : tour,
                                    'ecup_id': 2,
                                    'group': allResults[k].groupTeaser ? allResults[k].groupTeaser.displayShortName : null,
                                    'playoff': allResults[k].round.mode === "KNOCK_OUT" ? tour : null ,
                                    'date': allResults[k].kickoffTime.date,//allResults[k].utcDate.substring(0, 10),
                                    'time': allResults[k].kickoffTime.dateTime.substring(allResults[k].kickoffTime.dateTime.length - 13).substring(0, 5),
                                }
                            }

                          //console.log(this.results);
                            //return false;
                          this.$axios.$post('admin/updLeTourResult', {'results': this.results, 'ecup_id': 2/*, 'tour': tour*/});

                        });

                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Успешно',
                        color: 'success'
                    });

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
