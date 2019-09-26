<template>
  <div>
    <span >{{ecup.name}}</span>
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
        v-for="(teams, group ) in sortArr(ecup.teams)"
        :key="group"
        :href="`#tab-${group}`"
      >
        Группа {{ group }}
      </v-tab>
      <v-tab-item
        v-for="(teams, group ) in sortArr(ecup.teams)"
        :key="group"
        :value="'tab-' + group"
      >
        <v-simple-table>
          <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left"></th>
            <th class="text-left">Команда</th>
            <th class="text-left">И</th>
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
              <nuxt-link v-if="team.champ_id" class="black--text tabLink" :to="'/team/' + team.team.slug">
                {{ team.name }}
              </nuxt-link>

              <span v-else>{{ team.name }}</span>

            </td>
            <td class="text-left">
              <span>{{team.games}}</span>
            </td>
            <td class="text-left">
              <span>{{team.points}}</span>
            </td>
          </tr>
          </tbody>
        </v-simple-table>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
    export default {
        props: ['ecup', 'nextIcon', 'prevIcon', 'icons'],

    }
</script>

<style lang="scss" scoped>

</style>
