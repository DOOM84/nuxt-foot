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
            <v-toolbar-title>Вход</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              validation
              @submit.prevent="onSubmit"
            >
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
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  type="submit"
                >Войти</v-btn>
                <v-btn @click="closeReset"
                       depressed small>Забыл пароль
                </v-btn>
              </v-card-actions>
            </v-form>
            <v-flex xs12>
              <div v-if="showReset" class="pt-1">
                <v-form
                  ref="resetForm"
                  @submit.prevent="resetMail"
                  v-model="resetValid"
                  validation
                >

                  <v-text-field
                    prepend-icon="email"
                    v-model="resetEmail"
                    label="E-mail"
                    name="email"
                    type="email"
                    :rules="ResEmailRules"
                  ></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="!resetValid"
                      color="primary"
                      type="submit"
                    >Отправить
                    </v-btn>
                  </v-card-actions>

                </v-form>
              </div>
            </v-flex>

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
                title: 'Новости еврофутбола. Вход',
                meta: [
                    { hid: 'description', name: 'description', content: 'Войти на сайт' }
                ]
            }
        },
        data(){
           return {
               showReset: null,
               resetEmail: null,
               email: '',
               regExpEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
               password: '',
               valid: false,
               resetValid: false,
               emailRules: [
                   v => !!v || 'Введите E-mail',

                   v => this.regExpEmail.test(v) || 'E-mail должен быть действительным'
               ],
               ResEmailRules: [
                   v => !!v || 'Введите E-mail',
                   v => this.regExpEmail.test(v) || 'E-mail должен быть действительным'
               ],
               passwordRules: [
                   v => !!v || 'Введите пароль',
                   v => (v && v.length >= 6) || 'Пароль должен быть не менее 6 символов'
               ]
           }
        },
        methods: {
            async onSubmit(){
                if (this.$refs.form.validate()) {
                    try {
                        const formData = {
                            email: this.email,
                            password: this.password
                        };
                        await this.$auth.loginWith('local', {data: formData});

                    }catch (e) {
                    }
                    }
            },
            closeReset(){
                this.showReset = !this.showReset;
                if(!this.showReset){this.resetEmail = null}
            },
            async resetMail() {


                if (this.$refs.resetForm.validate()) {
                    try {
                        const formData = {
                            email: this.resetEmail,
                        };
                        await this.$store.dispatch('auth/restore', formData);
                        this.$store.commit('auth/SET_SNACKBAR', {
                            show: true,
                            text: 'Информация была успешно отправлена на ваш адрес электронной почты',
                            color: 'success'
                        });
                        this.resetEmail = null;
                        this.showReset = null;
                    }catch (e) {
                    }
                }
            },
        },
        watch: {
            errors() {
                if(this.errors.email){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Пользователя с таким данными не существует',
                        color: 'error'
                    });
                }
                if(this.errors.blocked){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Ваш аккаунт неактивен. Пожалуйста, свяжитесь со своим администратором.',
                        color: 'error'
                    });
                }
            }
        },
    }
</script>

<style scoped>

</style>
