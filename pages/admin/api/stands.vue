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
        data() {
            return {
                items: [
                    {
                        text: 'Панель управления',
                        disabled: false,
                        to: '/admin'
                    },
                    {
                        text: 'Api (турнирные таблицы)',
                        disabled: true,
                        to: '/admin'
                    },
                ],
                ids: [
                    'PL',
                    'BL1',
                    'PD',
                    'SA',
                    'PPL',
                    'FL1'
                ],
            }
        },
        methods: {
            async getResults() {
                try {
                    for (var k in this.ids) {
                        const {stands} = await this.$axios.$get(`admin/apiStands/${this.ids[k]}`);
                        let allResults = stands.standings[0].table;
                        const results = [];
                        for (var j in allResults) {
                            results[j] = {
                                'team': allResults[j].team.name,
                                'games': allResults[j].playedGames,
                                'win': allResults[j].won,
                                'draw': allResults[j].draw,
                                'lost': allResults[j].lost,
                                'goals': allResults[j].goalsFor,
                                'missed': allResults[j].goalsAgainst,
                                'diff': allResults[j].goalDifference,
                                'points': allResults[j].points,
                            }
                        }
                        await this.$axios.$post('admin/updStands', {'results': results});
                    }
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
