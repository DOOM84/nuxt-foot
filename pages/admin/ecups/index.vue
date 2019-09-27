<template>
<div>
  <v-col>
    <v-row>
      <crumbs :items="items" />
      <v-spacer></v-spacer>
      <v-btn to="/admin/ecups/create" color="success">Добавить eврокубок</v-btn>
    </v-row>
  </v-col>
  <client-only>
  <v-data-table
    :headers="headers"
    :items="ecups"
    :items-per-page="10"
    class="elevation-1"
  >
    <template v-slot:item.id="{ item }">
        {{ecups.indexOf(item)+1}}
    </template>
    <template v-slot:item.playoff="{ item }">
      {{item.playoff ? 'Плей-офф, '+item.po_stage : 'Групповой турнир'}}
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
  <v-card v-for="ecup in ecups" :key="ecup.slug" outlined tile>
    <v-card-title>{{ecup.name}}</v-card-title>

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
        v-for="(teams, index ) in sortArr(ecup.teams)"
        :key="index"
        :href="`#tab-${index}`"
      >
        {{ index }}
      </v-tab>
      <v-tab-item
        v-for="(teams, index ) in sortArr(ecup.teams)"
        :key="index"
        :value="'tab-' + index"
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
          <tr v-for="(team, index) in teams" :key="team.id">
            <td class="text-xs-center">
              {{index+1}}
            </td>
            <td class="text-xs-center pl-1 pr-1">
              <img class="text-xs-center"
                   :src="team.img" alt="">
            </td>
            <td class="text-xs-left pa-0 ma-0">
              <nuxt-link v-if="team.champ_id" target="_blank" class="black--text tabLink" :to="'/team/' + team.team.slug">
                {{ team.name }}
              </nuxt-link>

                <span v-else>{{ team.name }}</span>

            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'games'+team.id)">
              <v-text-field :ref="'games'+team.id"  @keydown.esc="saveEdit(team)" @keydown.enter="saveEdit(team)" v-if="team.edit && team.edit === true"
                            v-model="team.games"
                            label="Игры"
              ></v-text-field>
              <span v-else>{{team.games}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'win'+team.id)">
              <v-text-field :ref="'win'+team.id"  @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
                            v-model="team.win"
                            label="Победы"
              ></v-text-field>
              <span v-else>{{team.win}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'draw'+team.id)">
              <v-text-field :ref="'draw'+team.id" @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
                            v-model="team.draw"
                            label="Ничьи"
              ></v-text-field>
              <span v-else>{{team.draw}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'lost'+team.id)">
              <v-text-field :ref="'lost'+team.id" @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
                            v-model="team.lost"
                            label="Поражения"
              ></v-text-field>
              <span v-else>{{team.lost}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'goals'+team.id)">
              <v-text-field :ref="'goals'+team.id" @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
                            v-model="team.goals"
                            label="Голы"
              ></v-text-field>
              <span v-else>{{team.goals}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'missed'+team.id)">
              <v-text-field :ref="'missed'+team.id" @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
                            v-model="team.missed"
                            label="Пропущено"
              ></v-text-field>
              <span v-else>{{team.missed}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'diff'+team.id)">
              <v-text-field :ref="'diff'+team.id" @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
                            v-model="team.diff"
                            label="Разница"
              ></v-text-field>
              <span v-else>{{team.diff}}</span>
            </td>
            <td class="text-left" @click="toggleEdit($event, team, 'points'+team.id)">
              <v-text-field :ref="'points'+team.id" @keydown.esc="saveEdit(team)"  @keydown.enter="saveEdit(team)"  v-if="team.edit && team.edit === true"
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
                    text: 'Еврокубки',
                    disabled: true,
                    to: '/admin/ecups',
                }
            ],
            ecups: '',
            prevIcon: false,
            nextIcon: false,
            icons: false,
            headers: [
                { text: '#', value: 'id' },
                {
                    text: 'Название',
                    //align: 'left',
                    //sortable: false,
                    value: 'name',
                },

                { text: 'Псеводним', value: 'slug' },
                { text: 'Текущая стадия', value: 'playoff' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
        }
    },
    async asyncData({store}) {
        try {
            const {ecups} = await store.dispatch('adminEcup/index');
            return {
                ecups
            }
        } catch (error) {
            if(error.response.status === 401){
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
                await this.$store.dispatch('adminEcup/stands', team);
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
        editItem(ecup){this.$router.push({name: 'admin-ecups-edit', params: { 'ecup' : ecup}})},

        async deleteItem(slug){
            if (confirm('Are You Sure?')){
                const {success} = await this.$store.dispatch('adminEcup/delete', slug);
                this.ecups.splice(this.ecups.findIndex(item => item.slug === slug), 1);
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
