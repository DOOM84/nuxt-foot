<template>
  <v-row class="pl-2 pr-2">
    <v-col v-for="post in posts" :key="post.id" cols="12" sm="6" md="4">
      <v-card>
        <nuxt-link :to="'/' + (post.ecup ? 'ecups/' : '') + (post.champ.slug || post.champ || post.ecup)  + '/' + post.slug" style="text-decoration: none;"
                   class="black--text">
          <v-img
            :src="post.img"
          >
          </v-img>
          <div class="text-right pr-2 caption">
            <span class="grey--text">{{post.date}} </span>
            <span class="red--text">{{post.champ_name || post.ecup_name}} </span>
          </div>
            <div class="pa-3" >
              <p class="title mb-0">{{post.title}}</p>
            </div>
        </nuxt-link>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
    export default {
        props: ['posts']
    }
</script>

<style scoped>

</style>
