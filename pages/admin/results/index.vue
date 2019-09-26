<template>
  <div>
    <v-col>
      <v-row>
        <crumbs :items="items" />
        <v-spacer></v-spacer>
        <v-btn to="/admin/results/create" color="success">Добавить результат</v-btn>
      </v-row>
    </v-col>
    <no-ssr>
      <v-card>
        <v-card-title>

          <div class="flex-grow-1"></div>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Поиск"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      <v-data-table
        :headers="headers"
        :items="results"
        :items-per-page="10"
        :search="search"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        show-expand
        class="elevation-1"
      >
        <template v-slot:item.data-table-expand="{ expand, isExpanded }">
          <v-icon @click="expRow(isExpanded, expand)" color="info">edit</v-icon>
        </template>
        <template  v-slot:expanded-item="{ item }">
          <td :colspan="headers.length+1">
            <v-form  @submit.prevent="onSubmit(item)">
              <v-text-field
                v-model="item.tour"
                label="Тур"
              ></v-text-field>
              <v-select
                v-model="item.team1"
                :items="teams"
                chips
                label="Команда 1"
                item-text="name"
                item-value="id"
                return-object
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

              <v-slider
                label="Результат (хозяева)"
                v-model="item.res1"
                max="20"
                thumb-label="always"
              ></v-slider>
              <v-slider
                label="Результат (гости)"
                v-model="item.res2"
                max="20"
                thumb-label="always"
              ></v-slider>
              <v-select
                v-model="item.team2"
                :items="teams"
                chips
                label="Команда 2"
                item-text="name"
                item-value="id"
                return-object
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
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="item.term"
                    label="Дата"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="ru-ru"
                  ref="picker"
                  v-model="item.term"
                  min="1950-01-01"
                ></v-date-picker>
              </v-menu>
              <v-time-picker v-model="item.time" format="24hr"></v-time-picker>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="primary">Сохранить</v-btn>
              </v-card-actions>
            </v-form>
          </td>
        </template>
        <template v-slot:item.team1.name="{ item }">
          <div class="text-center">
            <v-img
              :src="item.team1.img"
              height="30px"
              contain
            ></v-img>
            {{ item.team1.name }}
          </div>
        </template>
        <template v-slot:item.team2.name="{ item }">
          <div class="text-center">
            <v-img
              :src="item.team2.img"
              height="30px"
              contain
            ></v-img>
            {{ item.team2.name }}
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon
            small
            color="info"
            @click="deleteItem(item.id)"
          >
            delete
          </v-icon>
        </template>
      </v-data-table>
      </v-card>
    </no-ssr>
  </div>

</template>

<script>
    import Crumbs from '@/components/crumbs'
    export default {
        layout: 'admin',
        components: { Crumbs },
        data () {
            return {
                items: [
                    {
                        text: 'Панель управления',
                        disabled: false,
                        to: "/admin",
                    },
                    {
                        text: 'Результаты',
                        disabled: true,
                        to: '/admin/results',
                    }
                ],
                menu: false,
                teams: '',
                expanded: [],
                singleExpand: true,
                results: [],
                headers: [
                    { text: 'Чемпионат', value: 'champ' },
                    { text: 'Команда 1', value: 'team1.name', class:'text-center'},
                    { text: 'Результат 1', value: 'res1'},
                    { text: 'Результат 2', value: 'res2' },
                    { text: 'Команда 2', value: 'team2.name', class:'text-center'},
                    { text: 'Тур', value: 'tour' },
                    { text: 'Actions', value: 'action', sortable: false },
                ],
                search: '',
                team1: '',
                team2: '',
            }
        },
        async asyncData({store}) {
            try {
                const {results} = await store.dispatch('adminResult/index');
                const {teams} = await store.dispatch('adminResult/edit');
                return {
                    results,
                    teams
                }
            } catch (error) {
                /*if(error.response.status === 401){
                    return $nuxt.$router.replace('/login');
                }*/
            }
        },
        methods: {
            async onSubmit(re){
                let team1 = re.team1;
                let team2 = re.team2;
                const result = re;
                result.date = result.term;
                result.team1 = re.team1.id;
                result.team2 = re.team2.id;
                result.res1 = Number(result.res1);
                result.res2 = Number(result.res2);

                try {
                    await this.$store.dispatch('adminResult/update', {params : result, id : result.id});

                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Результат успешно изменен',
                        color: 'success'
                    });
                } catch (e) {
                    console.log(e);
                }finally {
                    let ind = this.results.findIndex(res => res.team1 === result.team1 && res.team2 === result.team2);
                    this.results[ind].team1 = team1;
                    this.results[ind].team2 = team2;
                }
            },
            async deleteItem(id){
                if (confirm('Are You Sure?')){
                    const {success} = await this.$store.dispatch('adminResult/delete', id);
                    this.results.splice(this.results.findIndex(item => item.id === id), 1);
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: success,
                        color: 'success'
                    });
                }
            },
            expRow(isExpanded, expand){
                isExpanded = !isExpanded; expand(isExpanded)
            }
        },
        watch: {
            errors() {
                if(this.errors.team1){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.team1[0],
                        color: 'error'
                    });
                }
                if(this.errors.team2){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.team2[0],
                        color: 'error'
                    });
                }
                if(this.errors.tour){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.tour[0],
                        color: 'error'
                    });
                }
                if(this.errors.error){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.error[0],
                        color: 'error'
                    });
                }
            }
        },
    }
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
