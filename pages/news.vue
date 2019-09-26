<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="12"
        md="12"
      >
        <span class="title pl-2">Все новости</span>
          <card-posts :posts="posts"/>
        <v-pagination
          v-if="postPages > 1"
          v-model="staticPostPage"
          :length="postPages"
          @input="nextPostPage"
        ></v-pagination>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
    import CardPosts from "@/components/CardPosts";
    export default {
        head () {
            return {
                title: `Новости еврофутбола. Все новости`,
                meta: [
                    { hid: 'description', name: 'description', content: 'Все новости' }
                ]
            }
        },
        data(){
            return {
                page: 1,
                staticPostPage: 1,
                postPages:'',
                posts: '',
            }
        },
        components: {
            CardPosts
        },
        async asyncData({store}) {
            try {
                const {posts, postPages} = await store.dispatch('posts/fetchAllPagedPosts', 1);
                return {
                    posts,
                    postPages,
                }
            } catch (error) {
                /*if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }*/
            }
        },
        methods: {
            async nextPostPage(event) {
                if (event !== this.page) {
                    this.page = event;
                    const {posts} = await this.$store.dispatch('posts/fetchAllPagedPosts', this.page);
                    this.posts = posts;
                } else {
                    return false
                }
            },
        }
    }
</script>

<style scoped>

</style>
