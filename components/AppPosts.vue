<template>
  <div>
  <v-card v-for="post in posts" :key="post.id"
          class="pa-2"
          outlined
          tile
  >
    <div style="display:inline-block;" class="mt-1 px-1">
      <nuxt-link :to="'/' + (post.ecup ? 'ecups/' : '') +  (post.champ.slug || post.champ || post.ecup)  + '/' + post.slug"
                 style="text-decoration: none;" class="black--text">
        <v-img style="float: left"  class="mr-2"
               :src="post.img"
               width="150px"
        >
        </v-img>
        <span class="subtitle-1 mb-0">{{post.title}}</span>
      </nuxt-link>

    </div>

    <div class="text-right pr-2 grey--text caption">{{post.date || post.created_at}}</div>
  </v-card>
  </div>
</template>

<script>
    export default {
        props: ['posts']
    }
</script>

<style scoped>

</style>
