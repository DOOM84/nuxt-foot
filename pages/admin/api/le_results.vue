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
                <v-btn class="mr-3" v-for="(tour, index) in tours" :key="tour" color="success" @click="getResults(index+1,tour)">{{index+1}} тур</v-btn>
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
                        text: 'Api (результаты ЛE)',
                        disabled: true,
                        to: '/admin'
                    },
                ],
                tours: [33963,33964,33965,33966,33967,33968],
            }
        },
        methods: {
            async getResults(tour, uefa_tour) {
                try {
                    const games = await this.$axios.$get(`https://match.uefa.com/v1/matches?fromDate=2019-09-19&toDate=2020-6-19&competitionId=14&style=SHORT&pagesize=200&language=EN`);//const aaa = await this.$axios.$get(`https://api.sportsdata.io/v3/soccer/scores/json/Schedule/401?key=158b1c9db4934fdaa890c7c8a5bed78e`);
                    let allResults = games.filter((game) => game.matchDay.id === uefa_tour.toString());
                    const results = [];

                    for (var k in allResults) {
                        results[k] = {
                            'team1': allResults[k].homeTeam.id,
                            'team2': allResults[k].awayTeam.id,
                            'res1': allResults[k].homeTeamScore ? allResults[k].homeTeamScore.score : null,
                            'res2': allResults[k].awayTeamScore ? allResults[k].awayTeamScore.score : null,
                            'tour': tour,
                            'ecup_id': 2,
                            'group': allResults[k].groupTeaser.displayShortName,
                            'date': allResults[k].kickoffTime.date,//allResults[k].utcDate.substring(0, 10),
                            'time': allResults[k].kickoffTime.dateTime.substring(allResults[k].kickoffTime.dateTime.length - 13).substring(0, 5),
                        }
                    }
                    await this.$axios.$post('admin/updLeTourResult', {'results': results, 'ecup_id': 2, 'tour': tour});

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
