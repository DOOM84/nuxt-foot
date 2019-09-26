<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar dark color="indigo">
            <v-toolbar-title>Регистрация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              validation
              @submit.prevent="onSubmit"
            >
              <v-text-field
                prepend-icon="person"
                name="name"
                label="Имя"
                type="text"
                v-model="name"
                :rules="nameRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="email"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Пароль"
                type="password"
                :counter="6"
                v-model="password"
                :rules="passwordRules"

              ></v-text-field>
              <v-text-field
                id="password_confirmation"
                prepend-icon="lock"
                name="password_confirmation"
                label="Пароль еще раз"
                type="password"
                :counter="6"
                v-model="password_confirmation"
                :rules="confirmPasswordRules"

              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  type="submit"
                >Регистрация</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        middleware: ['guest'],
        head () {
            return {
                title: 'Новости еврофутбола. Регистрация',
                meta: [
                    { hid: 'description', name: 'description', content: 'Зарегистрироваться на сайте' }
                ]
            }
        },
        data() {
            return {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                regExpEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                valid: false,
                nameRules: [
                    v => !!v || 'Введите имя',
                    v => (v && v.length > 2 && v.length <= 128) || 'Имя должно быть больше 2 и меньше 129 символов'
                ],
                emailRules: [
                    v => !!v || 'Введите E-mail',
                    v => this.regExpEmail.test(v) || 'E-mail должен быть действительным'
                ],
                passwordRules: [
                    v => !!v || 'Введите пароль',
                    v => (v && v.length >= 6) || 'Пароль должен быть не менее 6 символов'
                ],
                confirmPasswordRules: [
                    v => !!v || 'Введите пароль',
                    v => v === this.password || 'Пароли должны совпадать',
                ]
            }
        },
        methods: {
            async onSubmit() {
                if (this.$refs.form.validate()) {
                    try {
                        const formData = {
                            name: this.name,
                            email: this.email,
                            password: this.password,
                            password_confirmation: this.password_confirmation
                        };
                        await this.$axios.post('auth/register', formData);

                        await this.$auth.loginWith('local', {
                            data: {
                                email: formData.email,
                                password: formData.password
                            },
                        });
                         this.$router.push('/')

                    }catch (e) {

                    }

                }
            }
        },
        watch: {
            errors() {
                if(this.errors.email){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Пользователь с таким адресом электронной почты уже существует',
                        color: 'error'
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
