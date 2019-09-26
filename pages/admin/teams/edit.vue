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
            label="Название"
          ></v-text-field>
          <v-text-field
            v-model="controls.parse_name"
            label="Название для парсинга"
          ></v-text-field>
          <v-text-field
            v-model="controls.parse_id"
            label="ID для парсинга"
          ></v-text-field>
          <v-select
            v-model="controls.champ_id"
            :items="champs"
            item-text="name"
            item-value="id"
            label="Чемпионат"
            chips
          ></v-select>
          <v-img
            :src="$route.params.team.img"
            style="max-width:30px"
          ></v-img>
          <v-img
            :src="$route.params.team.big_img"
            style="max-width:150px"
          ></v-img>
          <v-file-input
            :rules="rules"
            v-model="img"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Выберите иконку"
            label="Иконка команды"
            prepend-icon="mdi-camera"
          ></v-file-input>

          <v-file-input
            :rules="rules"
            v-model="big_img"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Выберите изображение"
            label="Изображение команды"
            prepend-icon="mdi-camera"
          ></v-file-input>

          <v-switch
            v-model="controls.status"
            label="В турнирной таблице"
          ></v-switch>

          <v-text-field
            v-model="controls.pres"
            label="Президент"
          ></v-text-field>

          <v-text-field
            v-model="controls.coach"
            label="Главный тренер"
          ></v-text-field>

          <v-text-field
            v-model="controls.stad"
            label="Стадион"
          ></v-text-field>

          <v-text-field
            v-model="controls.year"
            label="Год основания"
          ></v-text-field>

          <v-text-field
            v-model="controls.site"
            label="Сайт"
          ></v-text-field>

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
        validate ({ params }) {
            return !!params.team
        },
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
                        text: 'Команды',
                        disabled: false,
                        to: '/admin/teams',
                    },
                    {
                        text: `Изменить кманду: ${this.$route.params.team.name}`,
                        disabled: true,
                        to: '/admin/teams',
                    }
                ],
                rules: [
                    value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
                ],
                img: null,
                big_img: null,
                controls: {
                  name : '',
                  parse_name : '',
                  parse_id : '',
                  champ_id : '',
                  status : '',
                  pres : '',
                  coach : '',
                  stad : '',
                  year : '',
                  site : ''
                },
            }
        },
        methods: {
           async onSubmit(){

               const formData = new FormData();
               for (let elem in this.controls) {
                   formData.append(elem, JSON.stringify(this.controls[elem]))
               }
               formData.append('img', this.img);
               formData.append('big_img', this.big_img);
               formData.append('_method', 'PATCH');

               try {
                   await this.$store.dispatch('adminTeam/update', {data: formData,
                       slug: this.$route.params.team.slug});

                   this.$store.commit('auth/SET_SNACKBAR', {
                       show: true,
                       text: 'Команда успешно изменена',
                       color: 'success'
                   });
                   this.$router.push('/admin/teams')
               } catch (e) {
                   console.log(e);
               }
            }
        },
        computed: {
            champs() {
                return this.$store.getters['home/menuChamps']
            },
        },
        mounted() {
            this.controls.name = this.$route.params.team.name;
            this.controls.parse_name = this.$route.params.team.parse_name;
            this.controls.parse_id = this.$route.params.team.parse_id;
            this.controls.champ_id = this.$route.params.team.champ_id;
            this.controls.status = this.$route.params.team.status;
            this.controls.pres = this.$route.params.team.pres;
            this.controls.coach = this.$route.params.team.coach;
            this.controls.stad = this.$route.params.team.stad;
            this.controls.year = this.$route.params.team.year;
            this.controls.site = this.$route.params.team.site;
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
                if(this.errors.champ_id){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.champ_id[0],
                        color: 'error'
                    });
                }
            }
        },
    }

</script>

<style scoped>

</style>
