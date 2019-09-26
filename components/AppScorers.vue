<template>
  <v-simple-table>
    <thead>
    <tr style="background-color: #F5F5F5">
      <th class="text-left pl-5" colspan="2">Игрок</th>
      <th class="text-left pa-0">Голы</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="player in players" :key="player.id">
      <td class="text-center pa-0">
        <img class="text-center"
             :src="player.team.img" alt="">

      </td>
      <td class="text-left pa-0">
        <nuxt-link class="black--text tabLink" :to="'/player/' + player.slug">
          {{ player.name }}
        </nuxt-link>
      </td>
      <td class="text-left pa-0">
        {{player.goals}}
      </td>
    </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
    export default {
        props: ['players']
    }
</script>

<style scoped>

</style>
