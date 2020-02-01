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
        <v-btn class="mr-3" v-for="tour in tours" :key="tour" color="success" @click="getResults(tour, false)">{{tour}} тур</v-btn>
        <v-btn class="mr-3" v-for="playoff in playoffs" :key="playoff.stage" color="success" @click="getResults(playoff, true)">
          {{playoff.name}}
        </v-btn>
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
                        text: 'Api (результаты ЛЧ)',
                        disabled: true,
                        to: '/admin'
                    },
                ],
                tours: [1,2,3,4,5,6],
              playoffs:[
                {
                  stage:'ROUND_OF_16',
                  name:'1/8 финала'
                }
              ]
            }
        },
        methods: {
            async getResults(tour, playoff) {
                try {
                  /*if(!playoff){
                    const {games} = await this.$axios.$get(`admin/apiLchResults/${tour}`);
                  }else{
                    const {games} = await this.$axios.$get(`admin/apiLchPoResults/${playoff.stage}`);
                  }*/
                    //const {games} = await this.$axios.$get(`admin/apiLchResults/${tour}`);
                    //https://api.football-data.org/v2/competitions/CL/matches?stage=ROUND_OF_16
                  const {games} = !playoff ? await this.$axios.$get(`admin/apiLchResults/${tour}`)
                    : await this.$axios.$get(`admin/apiLchPoResults/${tour.stage}`);

                  let allResults = games.matches;

                  // const champ = games.competition.area.name.toLowerCase();
                    const results = [];

                    for (var k in allResults) {
                        results[k] = {
                            'team1': allResults[k].homeTeam.name,
                            'team2': allResults[k].awayTeam.name,
                            'res1': allResults[k].score.fullTime.homeTeam,
                            'res2': allResults[k].score.fullTime.awayTeam,
                            'tour': playoff ? 0 : allResults[k].matchday,
                            'ecup_id': 1,
                            'group': !playoff ? allResults[k].group.slice(-1) : null,
                            'playoff': playoff ? tour.name : null,
                            'date': allResults[k].utcDate.substring(0, 10),
                            'time': allResults[k].utcDate.substring(allResults[k].utcDate.length - 9).substring(0, 5),
                        }
                    }
                  //console.log(results);
                  //return false;
                    await this.$axios.$post('admin/updLchTourResult', {'results': results, 'ecup_id': 1/*, 'tour': tour*/});

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
