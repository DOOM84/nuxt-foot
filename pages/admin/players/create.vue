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
            v-model="controls.name"
            label="Имя"
          ></v-text-field>
          <v-text-field
            v-model="controls.parse_name"
            label="Имя для парсинга"
          ></v-text-field>
          <v-file-input
            :rules="rules"
            v-model="file"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Выберите изображение"
            label="Изображение игрока"
            prepend-icon="mdi-camera"
          ></v-file-input>
          <v-text-field
            v-model="controls.goals"
            label="Забил голов"
          ></v-text-field>
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
                v-model="controls.dob"
                label="Дата рождения"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="ru-ru"
              ref="picker"
              v-model="controls.dob"
              min="1950-01-01"
            ></v-date-picker>
          </v-menu>
          <v-select
            v-model="controls.position_id"
            :items="positions"
            item-text="name"
            item-value="id"
            label="Позиция"
            chips
          ></v-select>
          <v-select
            v-model="controls.country_id"
            :items="countries"
            item-text="name"
            item-value="id"
            label="Страна"
            chips
            deletable-chips
          ></v-select>
          <v-autocomplete
            v-model="controls.team_id"
            :items="teams"
            chips
            label="Команды"
            item-text="name"
            item-value="id"
            filled
            deletable-chips
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

          <v-switch
            v-model="controls.is_scorer"
            label="Бомбардир"
          ></v-switch>
          <v-text-field
            v-model="controls.height"
            label="Рост"
          ></v-text-field>
          <v-text-field
            v-model="controls.weight"
            label="Вес"
          ></v-text-field>
          <v-switch
            v-model="controls.status"
            label="Опубликовано"
          ></v-switch>

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
                        text: 'Игроки',
                        disabled: false,
                        to: '/admin/players',
                    },
                    {
                        text: 'Добавить игрока',
                        disabled: true,
                        to: '/admin/players',
                    }
                ],
                rules: [
                    value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
                ],
                menu: false,
                file: null,
                controls: {
                  name: '',
                  parse_name: '',
                  team_id: '',
                  is_scorer: false,
                  goals: '',
                  dob: new Date().toISOString().substr(0, 10),
                  country_id: '',
                  position_id: '',
                  height: '',
                  weight: '',
                  status: false,
                },
                countries: '',
                teams: '',
            }
        },
        async asyncData({store}) {
            try {
                const {countries, teams, positions} = await store.dispatch('adminPlayer/edit');
                return {
                    countries,
                    teams,
                    positions
                }
            } catch (error) {
                if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }
            }
        },
        methods: {
           async onSubmit(){

               const formData = new FormData();
               for (let elem in this.controls) {
                   formData.append(elem, JSON.stringify(this.controls[elem]))
               }
               formData.append('img', this.file);
               //formData.append('_method', 'PATCH');

               try {
                   await this.$store.dispatch('adminPlayer/create', formData);

                   this.$store.commit('auth/SET_SNACKBAR', {
                       show: true,
                       text: 'Игрок успешно добавлен',
                       color: 'success'
                   });
                   this.$router.push('/admin/players')
               } catch (e) {
                   console.log(e);
               }
            }
        },
        watch: {
            errors() {
                if(this.errors.name){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.name[0],
                        color: 'error'
                    });
                }
            }
        },
    }

</script>

<style scoped>

</style>
