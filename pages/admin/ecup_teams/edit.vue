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
            <v-select
              v-if="$route.params.team.team_id"
              @change="changeTeam"
              v-model="controls.team_id"
              :items="teams"
              chips
              label="Команда"
              item-text="name"
              item-value="id"
              filled
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
            </v-select>


            <template v-if="$route.params.team.team_id">
              <v-select
                v-model="controls.champ_id"
                :items="champs"
                item-text="name"
                item-value="id"
                label="Чемпионат"
                chips
                disabled
              ></v-select>
            </template>
            <template v-else>
              <v-text-field
                v-model="controls.name"
                label="Название"
              ></v-text-field>
              <v-file-input
                :rules="rules"
                v-model="img"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Выберите иконку"
                label="Иконка команды"
                prepend-icon="mdi-camera"
              ></v-file-input>
            </template>
            <v-select
              v-model="controls.ecup_id"
              :items="ecups"
              item-text="name"
              item-value="id"
              label="Еврокубок"
            ></v-select>
            <v-select
              v-model="controls.group"
              :items="groups"
              label="Группа"
            ></v-select>
            <v-text-field
              v-model="controls.parse_name"
              label="Название для парсинга"
            ></v-text-field>
            <v-text-field
              v-model="controls.uefa_id"
              label="ID для парсинга"
            ></v-text-field>
            <v-switch
              v-model="controls.status"
              label="В турнирной таблице"
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
                        text: 'Команды (еврокубки)',
                        disabled: false,
                        to: '/admin/ecup_teams',
                    },
                    {
                        text: `Изменить команду: ${this.$route.params.team.name}`,
                        disabled: true,
                        to: '/admin/ecup_teams',
                    }
                ],
                rules: [
                    value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
                ],
                groups: ['A','B','C','D','E','F','G','H','I','J','K','L'],
                img: null,
                teams: '',
                controls: {
                    name : '',
                    parse_name : '',
                    uefa_id : '',
                    champ_id : '',
                    team_id : '',
                    ecup_id : '',
                    group : '',
                    status : false,
                },
            }
        },
        async asyncData({store}) {
            try {
                const {teams} = await store.dispatch('adminEcupTeam/edit');
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

               const formData = new FormData();
               for (let elem in this.controls) {
                   formData.append(elem, JSON.stringify(this.controls[elem]))
               }
               formData.append('img', this.img);
               formData.append('_method', 'PATCH');

               try {
                   await this.$store.dispatch('adminEcupTeam/update', {data: formData,
                       id: this.$route.params.team.id});

                   this.$store.commit('auth/SET_SNACKBAR', {
                       show: true,
                       text: 'Команда успешно изменена',
                       color: 'success'
                   });
                   this.$router.push('/admin/ecup_teams')
               } catch (e) {
                   console.log(e);
               }
            },
            changeTeam(){
                this.controls.champ_id = this.teams[this.teams.findIndex(team => team.id === this.controls.team_id)].champ.id;
                this.controls.parse_name = this.teams[this.teams.findIndex(team => team.id === this.controls.team_id)].parse_name;
                this.controls.uefa_id = this.teams[this.teams.findIndex(team => team.id === this.controls.team_id)].uefa_id;
            }

        },
        computed: {
            champs() {
                return this.$store.getters['home/menuChamps']
            },
            ecups() {
                return this.$store.getters['home/menuEcups']
            },
        },
        mounted() {
            this.controls.name = this.$route.params.team.name;
            this.controls.parse_name = this.$route.params.team.parse_name;
            this.controls.uefa_id = this.$route.params.team.uefa_id;
            this.controls.champ_id = this.$route.params.team.champ_id;
            this.controls.team_id = this.$route.params.team.team_id;
            this.controls.ecup_id = this.$route.params.team.ecup_id;
            this.controls.group = this.$route.params.team.group;
            this.controls.status = this.$route.params.team.status;
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
            },
        },
    }

</script>

<style scoped>

</style>
