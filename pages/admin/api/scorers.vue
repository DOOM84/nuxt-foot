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
        <v-btn color="success" @click="getResults">Обновить бомбардиров всех чемпионатов</v-btn>
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
                        text: 'Api (бомбардиры)',
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
                        const {players} = await this.$axios.$get(`admin/apiScorers/${this.ids[k]}`);
                        const results = [];

                        for (var j in players.scorers) {
                            results[j] = {
                                'player': players.scorers[j].player.name,
                                'dob': players.scorers[j].player.dateOfBirth,
                                'goals': players.scorers[j].numberOfGoals,
                                'is_scorer': 1,
                            }
                        }
                        await this.$axios.$post('admin/updScorers', {'results': results});
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
