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
    import axios from 'axios'
    export default {
        layout: 'admin',
        components: {Crumbs},
        data(){
            return {
                results: [],
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
            getResults() {
                try {
                    let url = 'https://digital-api.uefa.com/v1/competitions/14/seasons/2020/standings?language=EN';
                    axios
                        .get(url)
                        .then(stands => {
                            for (var i in stands.data) {
                                for (var j in stands.data[i].standings){
                                    this.results.push(
                                        {
                                            'team': stands.data[i].standings[j].team.id,
                                            'games': stands.data[i].standings[j].played,
                                            'win': stands.data[i].standings[j].won,
                                            'draw': stands.data[i].standings[j].drawn,
                                            'lost': stands.data[i].standings[j].lost,
                                            'goals': stands.data[i].standings[j].goalsFor,
                                            'missed': stands.data[i].standings[j].goalsAgainst,
                                            'diff': stands.data[i].standings[j].goalDifference,
                                            'points': stands.data[i].standings[j].points,
                                        });
                                }
                            }
                            this.$axios.$post('admin/updLeStands', {'results': this.results});
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
