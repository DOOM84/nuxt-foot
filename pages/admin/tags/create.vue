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
                    text: 'Теги',
                    disabled: false,
                    to: '/admin/tags',
                },
                {
                    text: 'Добавить тег',
                    disabled: true,
                    to: '/admin/tags',
                }
            ],
            controls: {
                name: '',
            },
        }
    },
    methods: {
        async onSubmit(){
            try {
                await this.$store.dispatch('adminTag/create', this.controls);

                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: 'Тег успешно добавлен',
                    color: 'success'
                });
                this.$router.push('/admin/tags')
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
