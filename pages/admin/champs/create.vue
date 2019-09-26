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
            label="Страна"
          ></v-text-field>
          <v-text-field
            v-model="controls.tour_n"
            label="Текущий тур"
          ></v-text-field>
          <v-text-field
            v-model="controls.all_tours"
            label="Всего туров"
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
    data () {
        return {
            items: [
                {
                    text: 'Панель управления',
                    disabled: false,
                    to: "/admin",
                },
                {
                    text: 'Чемпионаты',
                    disabled: false,
                    to: '/admin/champs',
                },
                {
                    text: 'Добавить чемпионат',
                    disabled: true,
                    to: '/admin/champs',
                }
            ],
            controls: {
                name: '',
                tour_n: '',
                all_tours: '',
                status: false,
            },
        }
    },
    methods: {
        async onSubmit(){
            try {
                await this.$store.dispatch('adminChamp/create', this.controls);

                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: 'Чемпионат успешно добавлен',
                    color: 'success'
                });
                this.$router.push('/admin/champs')
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
            if(this.errors.tour_n){
                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: this.errors.tour_n[0],
                    color: 'error'
                });
            }
            if(this.errors.all_tours){
                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: this.errors.all_tours[0],
                    color: 'error'
                });
            }
        }
    },
}
</script>
