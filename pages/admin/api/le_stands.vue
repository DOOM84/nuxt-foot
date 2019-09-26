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
                        text: 'Api (ЛЕ турнирные таблицы)',
                        disabled: true,
                        to: '/admin'
                    },
                ],
            }
        },
        methods: {
            async getResults() {
                try {
                    //const aaa = await this.$axios.$get(`https://api.sportsdata.io/v3/soccer/scores/json/Standings/401?key=158b1c9db4934fdaa890c7c8a5bed78e`);
                    //const aaa = await this.$axios.$get(`https://api.sportsdata.io/v3/soccer/scores/json/Schedule/401?key=158b1c9db4934fdaa890c7c8a5bed78e`);
                    const stands = await this.$axios.$get(`https://digital-api.uefa.com/v1/competitions/14/seasons/2020/standings?language=EN`);

                    //console.log(stands);
                        const results = [];
                        for (var i in stands) {
                            for (var j in stands[i].standings){
                                results.push(
                                    {
                                        'team': stands[i].standings[j].team.id,
                                        'games': stands[i].standings[j].played,
                                        'win': stands[i].standings[j].won,
                                        'draw': stands[i].standings[j].drawn,
                                        'lost': stands[i].standings[j].lost,
                                        'goals': stands[i].standings[j].goalsFor,
                                        'missed': stands[i].standings[j].goalsAgainst,
                                        'diff': stands[i].standings[j].goalDifference,
                                        'points': stands[i].standings[j].points,
                                    });
                            }
                        }
                    await this.$axios.$post('admin/updLeStands', {'results': results});
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Успешно',
                        color: 'success'
                    })

                }catch (e) {
                    console.log(e);
                }
            },
        }
    }

</script>

<style scoped>

</style>
