<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <crumbs :items="items" />
      <v-col
        cols="12"
        sm="12"
        md="12"
      >
        <v-card class="pa-5">
          <v-form @submit.prevent="onSubmit">
            <v-text-field
              v-model="controls.tour"
              label="Тур"
            ></v-text-field>
            <v-autocomplete
              v-model="controls.team1"
              :items="teams"
              chips
              label="Команда 1"
              item-text="name"
              item-value="id"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  @click="data.select"
                >
                  <v-avatar left>
                    <v-img :src="data.item.img"></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-avatar>
                    <img style="max-width: 30px; height: auto" :src="data.item.img">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
            <v-slider
              :label="'Результат (хозяева) '+ controls.res1"
              v-model="controls.res1"
              max="20"
            ></v-slider>
            <v-slider
              :label="'Результат (гости) '+ controls.res2"
              v-model="controls.res2"
              max="20"
            ></v-slider>
            <v-autocomplete
              v-model="controls.team2"
              :items="teams"
              chips
              label="Команда 2"
              item-text="name"
              item-value="id"

            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  @click="data.select"
                >
                  <v-avatar left>
                    <v-img :src="data.item.img"></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-avatar>
                    <img style="max-width: 30px; height: auto" :src="data.item.img">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="controls.date"
                  label="Дата"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="ru-ru"
                ref="picker"
                v-model="controls.date"
                min="1950-01-01"
              ></v-date-picker>
            </v-menu>
            <v-time-picker v-model="controls.time" format="24hr"></v-time-picker>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary">Сохранить</v-btn>
            </v-card-actions>
          </v-form>

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
        data(){
            return {
                items: [
                    {
                        text: 'Панель управления',
                        disabled: false,
                        to: "/admin",
                    },
                    {
                        text: 'Результаты',
                        disabled: false,
                        to: '/admin/results',
                    },
                    {
                        text: 'Добавить результат',
                        disabled: true,
                        to: '/admin/results',
                    }
                ],
                menu: false,
                teams: '',
                controls: {
                    team1: null,
                    res1: '-',
                    team2: null,
                    res2: '-',
                    tour: null,
                    date: new Date().toISOString().substr(0, 10),
                    time: '00:00',
                    //term: null,
                }
            }
        },
        async asyncData({store}) {
            try {
                const {teams} = await store.dispatch('adminResult/edit');
                return {
                    teams
                }
            } catch (error) {
                if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }
            }
        },
        watch: {
            errors() {
                if(this.errors.team1){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.team1[0],
                        color: 'error'
                    });
                }
                if(this.errors.team2){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.team2[0],
                        color: 'error'
                    });
                }
                if(this.errors.tour){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.tour[0],
                        color: 'error'
                    });
                }
                if(this.errors.error){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.error[0],
                        color: 'error'
                    });
                }
            }
        },
        methods: {
            async onSubmit(){
                try {
                    await this.$store.dispatch('adminResult/create', this.controls);

                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Результат успешно добавлен',
                        color: 'success'
                    });
                    this.$router.push('/admin/results')
                } catch (e) {
                    console.log(e);
                }
            },
        }
    }

</script>

<style scoped>

</style>
