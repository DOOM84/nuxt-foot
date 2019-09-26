<template>
  <v-simple-table>
    <tbody>
    <template v-for="(dates, ind) in results">
      <tr>
        <th class="pa-0 ma-0 text-center" style="background-color: #F5F5F5" colspan="5">
          {{tour}}-й тур. {{ ind }}
        </th>
      </tr>
      <tr v-for="match in dates" :key="match.id">
        <td style="width: 35%" class="text-center pa-0 ma-0">
          <img class="text-center"
               :src="match.team11.img" alt="">
          <br>
          <nuxt-link class="black--text tabLink"
                     :to="'/team/' + match.team11.slug"
          >
            {{ match.team11.name }}
          </nuxt-link>
        </td>

        <td :class="{ 'isLive': match.is_live, 'text-center pa-0 ma-0' : true }">
          {{ match.res1 === '-' ? match.time.substring(0, 2) : match.res1 }}
        </td>
        <td :class="{ 'isLive': match.is_live,  'text-center pa-0 ma-0' : true}">
          :
        </td>
        <td :class="{ 'isLive': match.is_live, 'text-center pa-0 ma-0' : true }">
          {{ match.res2 === '-' ? match.time.substring(match.time.length - 2) : match.res2 }}
        </td>
        <td   style="width: 35%" class="text-center  pa-0 ma-0">
          <img class="text-center"
               :src="match.team22.img" alt="">
          <br>
          <nuxt-link class="black--text tabLink" :to="'/team/' + match.team22.slug">
            {{ match.team22.name }}
          </nuxt-link>
        </td>
      </tr>

    </template>



    </tbody>
  </v-simple-table>
</template>

<script>
    export default {
        props: ['tour','results']
    }
</script>

<style lang="scss" scoped>
  .isLive {
    color: red;
  }
</style>
