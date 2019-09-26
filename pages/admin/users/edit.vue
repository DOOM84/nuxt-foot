<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <crumbs :items="items" />
      <v-avatar>
        <img :src="$route.params.user.avatar" alt="avatar">
      </v-avatar>
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
    validate ({ params }) {
        return !!params.user
    },
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
                    text: `Изменить пользователя: ${this.$route.params.user.name}`,
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
                status: '',
                is_admin: '',
            },
        }
    },
    mounted() {
        this.controls.id = this.$route.params.user.id;
        this.controls.name = this.$route.params.user.name;
        this.controls.email = this.$route.params.user.email;
        this.controls.password = this.$route.params.user.password;
        this.controls.password_confirmation = this.$route.params.user.password_confirmation;
        this.controls.status = this.$route.params.user.status ;
        this.controls.is_admin = this.$route.params.user.is_admin;
    },
    methods: {
        async onSubmit(){
            try {
                await this.$store.dispatch('adminUser/update', this.controls);

                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: 'Пользователь успешно изменен',
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
