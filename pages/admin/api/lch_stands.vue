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
        <v-btn color="success" @click="getResults">Обновить все турнирные таблицы</v-btn>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
    import Crumbs from '@/components/crumbs'
    export default {
        layout: 'admin',
        components: {Crumbs},
        data(){
            return {
                items: [
                    {
                        text: 'Панель управления',
                        disabled: false,
                        to: '/admin'
                    },
                    {
                        text: 'Api (ЛЧ турнирные таблицы)',
                        disabled: true,
                        to: '/admin'
                    },
                ],
            }
        },
        methods: {
            async getResults() {
                try {
                    const {stands} = await this.$axios.$get(`admin/apiLchStands`);

                    //const aaa = await this.$axios.$get(`https://api.sportsdata.io/v3/soccer/scores/json/Standings/401?key=158b1c9db4934fdaa890c7c8a5bed78e`);
                    //const aaa = await this.$axios.$get(`https://api.sportsdata.io/v3/soccer/scores/json/Schedule/401?key=158b1c9db4934fdaa890c7c8a5bed78e`);
                    //console.log(aaa);
                    let allResults = stands.standings.filter((stand) => stand.type === 'TOTAL');
                        const results = [];
                        for (var i in allResults) {
                            for (var j in allResults[i].table){
                                results.push(
                                    {
                                        'team': allResults[i].table[j].team.name,
                                        'games': allResults[i].table[j].playedGames,
                                        'win': allResults[i].table[j].won,
                                        'draw': allResults[i].table[j].draw,
                                        'lost': allResults[i].table[j].lost,
                                        'goals': allResults[i].table[j].goalsFor,
                                        'missed': allResults[i].table[j].goalsAgainst,
                                        'diff': allResults[i].table[j].goalDifference,
                                        'points': allResults[i].table[j].points,
                                    });
                            }
                        }
                    await this.$axios.$post('admin/updLchStands', {'results': results});
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
