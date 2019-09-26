<template>
  <div>
    <v-col>
      <v-row>
        <crumbs :items="items" />
        <v-spacer></v-spacer>
        <v-btn to="/admin/players/create" color="success">Добавить игрока</v-btn>
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
          :items="players"
          :items-per-page="15"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.img="{ item }">
            <v-img
              :src="item.img"
              aspect-ratio="0.7"
              class="grey lighten-2"
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
                        text: 'Игроки',
                        disabled: true,
                        to: '/admin/players',
                    }
                ],
                players: '',
                search: '',
                headers: [
                    { text: 'Имя', value: 'name'},
                    { text: 'Имя для парсинга', value: 'parse_name' },
                    { text: 'Чемпионат', value: 'champ' },
                    { text: 'Команда', value: 'team' },
                    { text: 'Изображение', value: 'img', sortable: false },
                    { text: 'Опубликовано', value: 'status' },
                    { text: 'Actions', value: 'action', sortable: false },
                ],
            }
        },
        async asyncData({store}) {
            try {
                const {players} = await store.dispatch('adminPlayer/index');
                return {
                    players
                }
            } catch (error) {

            }
        },
        methods: {
            editItem(player){
                this.$router.push({name: 'admin-players-edit', params: { 'player': player} })
            },
            async deleteItem(slug){
                if (confirm('Are You Sure?')){
                    const {success} = await this.$store.dispatch('adminPlayer/delete', slug);
                    this.players.splice(this.players.findIndex(item => item.slug === slug), 1);
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
