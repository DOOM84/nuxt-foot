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
                <v-switch v-model="tour" label="Обновить результаты только текущего тура (вкл.) или сразу всех туров (выкл.)"></v-switch>
                <v-btn color="success" @click="getResults('PL')">Англия</v-btn>
                <v-btn color="success" @click="getResults('BL1')">Германия</v-btn>
                <v-btn color="success" @click="getResults('PD')">Испания</v-btn>
                <v-btn color="success" @click="getResults('SA')">Италия</v-btn>
                <v-btn color="success" @click="getResults('PPL')">Португалия</v-btn>
                <v-btn color="success" @click="getResults('FL1')">Франция</v-btn>
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
                        text: 'Api (результаты)',
                        disabled: true,
                        to: '/admin'
                    },
                ],
                tour: true,
            }
        },
        methods: {
            async getResults(id) {
                try {
                    const {games} = await this.$axios.$get(`admin/apiResults/${id}`);

                    let allResults = games.matches;
                    const champ = games.competition.area.name.toLowerCase();
                    const results = [];

                    for (var k in allResults) {
                        results[k] = {
                            'team1': allResults[k].homeTeam.name,
                            'team2': allResults[k].awayTeam.name,
                            'res1': allResults[k].score.fullTime.homeTeam,
                            'res2': allResults[k].score.fullTime.awayTeam,
                            'tour': allResults[k].matchday,
                            'date': allResults[k].utcDate.substring(0, 10),
                            'time': allResults[k].utcDate.substring(allResults[k].utcDate.length - 9).substring(0, 5),
                        }
                    }
                    this.updateResults({results, champ}, this.tour);

                }catch (e) {
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Ошибка',
                        color: 'error'
                    });
                    console.log(e);
                }
            },

            updateResults(data, tour){
                if(!tour){
                    this.addAllResults(data)
                }else{
                    this.updateResultOfTour(data)
                }
            },

            async addAllResults(data) {
                try {
                    await this.$axios.$post('admin/updResult', {'results': data.results, 'champ': data.champ});
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Успешно',
                        color: 'success'
                    });
                } catch (e) {
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Ошибка',
                        color: 'error'
                    });
                    console.log(e);
                }
            },

            async updateResultOfTour(data){

                try {
                    let {tour} = await this.$axios.$get(`getChampTour/${data.champ}`);
                    let results = data.results.filter(result => result.tour === Number(tour));
                    await this.$axios.$post('admin/updTourResult', {'results': results, 'champ': data.champ, 'tour': tour});

                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Успешно',
                        color: 'success'
                    });
                } catch (e) {
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Ошибка',
                        color: 'error'
                    });
                    console.log(e);
                }
            }
        }
    }





</script>

<style scoped>

</style>
