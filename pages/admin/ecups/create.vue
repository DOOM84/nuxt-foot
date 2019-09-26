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
                        text: 'Еврокубки',
                        disabled: false,
                        to: '/admin/ecups',
                    },
                    {
                        text: 'Добавить еврокубок',
                        disabled: true,
                        to: '/admin/ecups',
                    }
                ],
                controls: {
                    name: '',
                    playoff: false
                },
            }
        },

        methods: {
            async onSubmit(){
                try {
                    await this.$store.dispatch('adminEcup/create', this.controls);

                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Еврокубок успешно добавлен',
                        color: 'success'
                    });
                    this.$router.push('/admin/ecups')
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
