<template>
  <v-tabs
    background-color="black accent-4"
    class="elevation-2"
    dark
    :centered="centered"
    :grow="grow"
    :vertical="vertical"
    :right="right"
    :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
    :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
    :icons-and-text="icons"
    show-arrows
  >
    <v-tabs-slider></v-tabs-slider>

    <v-tab
      v-for="(dates, playoff) in sortArr(ecup.playOffResults)"
      :key="playoff"
      :href="`#tab-${playoff}`"
    >
      {{ playoff }}
    </v-tab>

    <v-tab-item
      v-for="(dates, playoff) in sortArr(ecup.playOffResults)"
      :key="playoff"
      :value="'tab-' + playoff"
    >
      <v-simple-table>
          <template v-for="(times, date) in dates">
            <tr>
              <th class="pa-0 ma-0 text-center" style="background-color: #F5F5F5" colspan="5">
                {{date}}
              </th>
            </tr>
            <template v-for="(matches, time) in times">
              <tr>
                <th class="pa-0 ma-0 text-center" style="background-color: #F5F5F5" colspan="5">
                  {{time}}
                </th>
              </tr>
              <template v-for="match in matches">
                <tr>
                  <td style="width: 35%" class="text-center pa-0 ma-0">
                    <img class="text-center"
                         :src="match.team11.img" alt="">
                    <br>

                    <nuxt-link v-if="match.team11.champ_id" class="black--text tabLink" :to="'/team/' + match.team11.team.slug">
                      {{ match.team11.name }}
                    </nuxt-link>

                    <span v-else>{{ match.team11.name }}</span>
                  </td>

                  <td :class="{ 'isLive': match.is_live, 'text-center pa-0 ma-0' : true }">
                    {{match.res1}}
                  </td>
                  <td :class="{ 'isLive': match.is_live,  'text-center pa-0 ma-0' : true}">
                    :
                  </td>
                  <td :class="{ 'isLive': match.is_live, 'text-center pa-0 ma-0' : true }">
                    {{match.res2}}
                  </td>
                  <td style="width: 35%" class="text-center  pa-0 ma-0">
                    <img class="text-center"
                         :src="match.team22.img" alt="">
                    <br>
                    <nuxt-link v-if="match.team22.champ_id" class="black--text tabLink" :to="'/team/' + match.team22.team.slug">
                      {{ match.team22.name }}
                    </nuxt-link>
                    <span v-else>{{ match.team22.name }}</span>
                  </td>
                </tr>

              </template>
            </template>

          </template>
      </v-simple-table>
    </v-tab-item>
  </v-tabs>
</template>

<script>
    export default {
        props: ['ecup', 'nextIcon', 'prevIcon', 'icons', 'right', 'grow', 'centered', 'vertical'],
    }
</script>

<style lang="scss" scoped>
  .isLive {
    color: red;
  }
</style>
