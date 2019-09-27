<template>
  <div>
    <v-col>
      <v-row>
        <crumbs :items="items" />
        <v-spacer></v-spacer>
        <v-btn to="/admin/champs/create" color="success">Добавить чемпионат</v-btn>
      </v-row>
    </v-col>
    <client-only>
      <v-data-table
        :headers="headers"
        :items="champs"
        :items-per-page="10"
        class="elevation-1"
      >
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
    </client-only>

  <v-card outlined tile>

    <v-tabs
      background-color="black accent-4"
      class="elevation-2"
      dark
      :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
      :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
      :icons-and-text="icons"
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab
        v-for="champ in champs"
        :key="champ.id"
        :href="`#tab-${champ.id}`"
      >
        {{ champ.name }}
      </v-tab>
      <v-tab-item
        v-for="champ in champs"
        :key="champ.id"
        :value="'tab-' + champ.id"
      >
        <v-simple-table>
          <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left"></th>
            <th class="text-left">Команда</th>
            <th class="text-left">И</th>
            <th class="text-left">В</th>
            <th class="text-left">Н</th>
            <th class="text-left">П</th>
            <th class="text-left">З</th>
            <th class="text-left">Пр</th>
            <th class="text-left">Р</th>
            <th class="text-left">О</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(team, index) in champ.teams" :key="team.id">
            <td class="text-xs-center">
              {{index+1}}
            </td>
            <td class="text-xs-center pl-1 pr-1">
              <img class="text-xs-center"
                   :src="team.img" alt="">
            </td>
            <td class="text-xs-left pa-0 ma-0">
              <nuxt-link target="_blank" class="black--text tabLink" :to="'/team/' + team.slug">
                {{ team.name }}
              </nuxt-link>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'games'+team.slug)">
              <v-text-field :ref="'games'+team.slug"  @keydown.esc="saveEdit(team)" @keydown.enter="saveEdit(team)" v-if="team.edit && team.edit === true"
                v-model="team.games"
                label="Игры"
              ></v-text-field>
              <span v-else>{{team.games}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'win'+team.slug)">
              <v-text-field :ref="'win'+team.slug"  @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
                            v-model="team.win"
                            label="Победы"
              ></v-text-field>
              <span v-else>{{team.win}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'draw'+team.slug)">
              <v-text-field :ref="'draw'+team.slug" @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
                            v-model="team.draw"
                            label="Ничьи"
              ></v-text-field>
              <span v-else>{{team.draw}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'lost'+team.slug)">
              <v-text-field :ref="'lost'+team.slug" @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
                            v-model="team.lost"
                            label="Поражения"
              ></v-text-field>
              <span v-else>{{team.lost}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'goals'+team.slug)">
              <v-text-field :ref="'goals'+team.slug" @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
                            v-model="team.goals"
                            label="Голы"
              ></v-text-field>
              <span v-else>{{team.goals}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'missed'+team.slug)">
              <v-text-field :ref="'missed'+team.slug" @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
                            v-model="team.missed"
                            label="Пропущено"
              ></v-text-field>
              <span v-else>{{team.missed}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'diff'+team.slug)">
              <v-text-field :ref="'diff'+team.slug" @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
                            v-model="team.diff"
                            label="Разница"
              ></v-text-field>
              <span v-else>{{team.diff}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'points'+team.slug)">
              <v-text-field :ref="'points'+team.slug" @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
                            v-model="team.points"
                            label="Очки"
              ></v-text-field>
              <span v-else>{{team.points}}</span>
            </td>
          </tr>
          </tbody>
        </v-simple-table>
      </v-tab-item>
    </v-tabs>

  </v-card>
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
                    text: 'Чемпионаты',
                    disabled: true,
                    to: '/admin/champs',
                }
            ],
            champs: '',
            prevIcon: false,
            nextIcon: false,
            icons: false,

            headers: [
                {
                    text: 'Название',
                    //align: 'left',
                    //sortable: false,
                    value: 'name',
                },

                { text: 'Текущий тур', value: 'tour' },
                { text: 'Всего туров', value: 'all_tours' },
                { text: 'Опубликовано', value: 'status' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
        }
    },

    async asyncData({store}) {
        try {
            const {champs} = await store.dispatch('adminChamp/index');
            return {
                champs
            }
        } catch (error) {
            if (error.response.status === 401) {
                return $nuxt.$router.replace('/login');
            }
        }
    },
    methods: {
        toggleEdit(event, team, ref){
            this.$set(team, 'edit', true);
            if(team.edit){
               this.$nextTick(() => this.$refs[ref][0].focus())
            }
        },

        async saveEdit(team){

            try {
                await this.$store.dispatch('adminChamp/stands', team);
                this.$set(team, 'edit', false);
                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: 'Таблица успешно изменена',
                    color: 'success'
                });
            } catch (e) {
                console.log(e);
            }
        },



        editItem(champ){this.$router.push({name: 'admin-champs-edit', params: { 'champ' : champ}})},

        async deleteItem(slug){
            if (confirm('Are You Sure?')){
                const {success} = await this.$store.dispatch('adminChamp/delete', slug);
                this.champs.splice(this.champs.findIndex(item => item.slug === slug), 1);
                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: success,
                    color: 'success'
                });
            }
        }
    }
}
</script>
