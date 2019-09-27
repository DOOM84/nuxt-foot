<template>
  <div>
    <v-col>
      <v-row>
        <crumbs :items="items" />
        <v-spacer></v-spacer>
        <v-btn to="/admin/ecup_teams/create" color="success">Добавить команду (еврокубки)</v-btn>
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
            <v-img v-if="item.img"
              :src="item.img"
              aspect-ratio="1"
              width="30"
            ></v-img>
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
              @click="deleteItem(item.id)"
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
                        text: 'Команды (еврокубки)',
                        disabled: true,
                        to: '/admin/ecup_teams',
                    }
                ],
                teams: '',
                search: '',
                headers: [
                    { text: 'Название', value: 'name'},
                    { text: 'Название для парсинга', value: 'parse_name' },
                    { text: 'ID для парсинга', value: 'uefa_id' },
                    { text: 'Иконка', value: 'img', sortable: false },
                    { text: 'Еврокубок', value: 'ecup' },
                    { text: 'Группа', value: 'group' },
                    //{ text: 'В турнирной таблице', value: 'status' },
                    { text: 'Actions', value: 'action', sortable: false },
                ],
            }
        },
        async asyncData({store}) {
            try {
                const {teams} = await store.dispatch('adminEcupTeam/index');
                return {
                    teams
                }
            } catch (error) {

            }
        },
        methods: {
            editItem(team){
                this.$router.push({name: 'admin-ecup_teams-edit', params: { 'team': team} })
            },
            async deleteItem(id){
                if (confirm('Are You Sure?')){
                    const {success} = await this.$store.dispatch('adminEcupTeam/delete', id);
                    this.teams.splice(this.teams.findIndex(item => item.id === id), 1);
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
