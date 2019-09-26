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
          <v-select
            @change="switchPlayoff"
            v-model="controls.po_stage"
            item-text="name"
            item-value="value"
            :items="playoffs"
            label="Плейофф"
          ></v-select>
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
        return !!params.ecup
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
                    text: 'Еврокубки',
                    disabled: false,
                    to: '/admin/ecups',
                },
                {
                    text: `Изменить еврокубок: ${this.$route.params.ecup.name}`,
                    disabled: true,
                    to: '/admin/ecups',
                }
            ],
            playoffs: [{
                name: "Нет",
                value: null
            },'1/16 финала', '1/8 финала', '1/4 финала', '1/2 финала', 'Финал'],
            controls: {
                name: '',
                playoff: '',
                po_stage: '',
            },
        }
    },
    mounted() {
        this.controls.name = this.$route.params.ecup.name;
        this.controls.slug = this.$route.params.ecup.slug;
        this.controls.playoff = this.$route.params.ecup.playoff;
        this.controls.po_stage = this.$route.params.ecup.po_stage;
    },
    methods: {
        switchPlayoff(){
            this.controls.playoff = this.controls.po_stage ? 1 : 0
        },
        async onSubmit(){
            try {
                await this.$store.dispatch('adminEcup/update', this.controls);

                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: 'Еврокубок успешно изменен',
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
