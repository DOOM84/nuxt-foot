<template>
  <div>
    <v-col>
      <v-row>
        <crumbs :items="items" />
        <v-spacer></v-spacer>
        <v-btn to="/admin/teams/create" color="success">Добавить команду</v-btn>
      </v-row>
    </v-col>
    <client-only>
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
          :items="teams"
          :items-per-page="15"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.img="{ item }">
            <v-img
              :src="item.img"
              aspect-ratio="1"
              width="30"
            ></v-img>
          </template>
          <template v-slot:item.big_img="{ item }">
            <v-img
              :src="item.big_img"
              aspect-ratio="1"
              width="100"
            ></v-img>
          </template>
          <template v-slot:item.status="{ item }">
            {{item.status ? 'Да' : 'Нет'}}
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
              small
              color="info"
              class="mr-2"
              @click="editItem(item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              color="info"
              @click="deleteItem(item.slug)"
            >
              delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </client-only>
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
                        text: 'Команды',
                        disabled: true,
                        to: '/admin/teams',
                    }
                ],
                teams: '',
                search: '',
                headers: [
                    { text: 'Название', value: 'name'},
                    { text: 'Название для парсинга', value: 'parse_name' },
                    { text: 'ID для парсинга', value: 'parse_id' },
                    { text: 'Чемпионат', value: 'champ' },
                    { text: 'Иконка', value: 'img', sortable: false },
                    { text: 'Изображение', value: 'big_img', sortable: false },
                    { text: 'В турнирной таблице', value: 'status' },
                    { text: 'Actions', value: 'action', sortable: false },
                ],
            }
        },
        async asyncData({store}) {
            try {
                const {teams} = await store.dispatch('adminTeam/index');
                return {
                    teams
                }
            } catch (error) {

            }
        },
        methods: {
            editItem(team){
                this.$router.push({name: 'admin-teams-edit', params: { 'team': team} })
            },
            async deleteItem(slug){
                if (confirm('Are You Sure?')){
                    const {success} = await this.$store.dispatch('adminTeam/delete', slug);
                    this.teams.splice(this.teams.findIndex(item => item.slug === slug), 1);
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: success,
                        color: 'success'
                    });
                }
            },
        }
    }
</script>
