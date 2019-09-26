<template>
  <v-carousel cycle style="border-top: 1px solid #D7D7D7; border-left: 1px solid #D7D7D7" >
    <v-carousel-item
      v-for="(post,i) in posts"
      :key="i"
      :src="post.img"

    >
      <div class="white--text text-center "
           style="background: rgba(0, 0, 0, .3); position:absolute; bottom: 50px; padding-left: 20px">
        <nuxt-link :to="'/' + (post.ecup ? 'ecups/' : '') +  (post.champ.slug || post.champ || post.ecup)  + '/' + post.slug" style="text-decoration: none;">
          <h1 class="headline white--text">
            {{ post.title }}
          </h1>
        </nuxt-link>
      </div>
    </v-carousel-item>
  </v-carousel>

</template>

<script>
    export default {
        props: ['posts'],
    }
</script>

<style scoped>

</style>
