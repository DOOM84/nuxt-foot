<template>
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
        <nuxt-link class="black--text tabLink" :to="'/team/' + team.slug">
          {{ team.name }}
        </nuxt-link>
      </td>
      <td class="text-left">
        {{team.games}}
      </td>
      <td class="text-left">
        {{team.points}}
      </td>
    </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
    export default {
        props: ['teams']
    }
</script>

<style scoped>

</style>
