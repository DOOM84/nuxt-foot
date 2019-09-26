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
            v-model="controls.email"
            label="Email"
          ></v-text-field>
          <v-text-field
            v-model="controls.password"
            label="Пароль"
            type="Password"
          ></v-text-field>
          <v-text-field
            v-model="controls.password_confirmation"
            label="Подтвердите пароль"
            type="Password"
          ></v-text-field>
          <v-switch
            v-model="controls.status"
            label="Активен"
          ></v-switch>
          <v-switch
            v-model="controls.is_admin"
            label="Администратор"
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
                    text: 'Пользователи',
                    disabled: false,
                    to: '/admin/users',
                },
                {
                    text: 'Добавить пользователя',
                    disabled: true,
                    to: '/admin/users',
                }
            ],
            controls: {
                id: '',
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                status: false,
                is_admin: false,
            },
        }
    },
    methods: {
        async onSubmit(){
            try {
                await this.$store.dispatch('adminUser/create', this.controls);

                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: 'Пользователь успешно добавлен',
                    color: 'success'
                });
                this.$router.push('/admin/users')
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
            if(this.errors.email){
                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: this.errors.email[0],
                    color: 'error'
                });
            }
            if(this.errors.password){
                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: this.errors.password[0],
                    color: 'error'
                });
            }
        }
    },
}
</script>
