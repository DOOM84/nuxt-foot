<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <h2>Изменить результат</h2>
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
            label="Результат (хозяева)"
            v-model="controls.res1"
            max="20"
            thumb-label="always"
          ></v-slider>
          <v-slider
            label="Результат (гости)"
            v-model="controls.res2"
            max="20"
            thumb-label="always"
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
                v-model="controls.term"
                label="Дата"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="ru-ru"
              ref="picker"
              v-model="controls.term"
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
    export default {
        validate ({ params }) {
            return !!params.result
        },
        layout: 'admin',
        data(){
            return {
                menu: false,
                teams: '',
                controls: {
                    team1: null,
                    res1: 0,
                    team2: null,
                    res2: 0,
                    tour: null,
                    date: null,
                    time: null,
                    term: null,
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
        methods: {
           async onSubmit(){
               this.controls.date = this.controls.term;

               if(this.controls.team1){
                   this.controls.team1 = this.controls.team1.id ? this.controls.team1.id : this.controls.team1;
               }else{
                   this.controls.team1 = null;
               }
               if(this.controls.team2){
                   this.controls.team2 = this.controls.team2.id ? this.controls.team2.id : this.controls.team2;
               }else{
                   this.controls.team2 = null;
               }
               try {
                   await this.$store.dispatch('adminResult/update', {params : this.controls, id : this.$route.params.result.id});

                   this.$store.commit('auth/SET_SNACKBAR', {
                       show: true,
                       text: 'Результат успешно изменен',
                       color: 'success'
                   });
                   this.$router.push('/admin/results')
               } catch (e) {
                   console.log(e);
               }
            },
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
        mounted() {
            this.controls.team1 = this.$route.params.result.team1;
            this.controls.res1 = this.$route.params.result.res1;
            this.controls.team2 = this.$route.params.result.team2;
            this.controls.res2 = this.$route.params.result.res2;
            this.controls.tour = this.$route.params.result.tour;
            this.controls.date = this.$route.params.result.date;
            this.controls.time = this.$route.params.result.time;
            this.controls.term = this.$route.params.result.term;

        },
    }

</script>

<style scoped>

</style>
