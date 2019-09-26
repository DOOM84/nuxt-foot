<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="12"
        md="8"
      >
        <span class="title pl-2">Новости по тегу: {{tag}}</span>
          <card-posts :posts="tagPosts"/>

        <v-pagination
          v-if="postPages > 1"
          v-model="staticPostPage"
          :length="postPages"
          @input="nextPostPage"
        ></v-pagination>
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="12"
      >
        <span class="title pl-2">Новости </span>
        <app-posts  class="mt-2 elevation-2" :posts="posts" />
        <div class="text-right">
          <nuxt-link class="black--text tabLink text-right"
                     :to="'/news'"
          >
            Все новости
          </nuxt-link>
        </div>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import AppPosts from "@/components/AppPosts";
  import CardPosts from "@/components/CardPosts";
    export default {
        validate ({ params }) {
            return !!params.slug
        },
        head () {
            return {
                title: `Новости еврофутбола. Тег: ${this.tag}`,
                meta: [
                    { hid: 'description', name: 'description', content: `Просмотр новостией по тегу: ${this.tag}` }
                ]
            }
        },
        components: {
            AppPosts, CardPosts
        },
        data(){
            return {
                page: 1,
                staticPostPage: 1,
                posts: '',
                tagPosts:'',
                postPages: '',
                tag: ''
            }
        },
        async asyncData({store, params}) {
            try {
                const {tagPosts, postPages, tag} = await store.dispatch('posts/fetchTagPagedPosts', {'slug' : params.slug, 'page' : 1});
                const {posts} = await store.dispatch('home/fetchPosts');
                return {
                    posts: posts.filter((post, id) => id <= 9),
                    tagPosts,
                    postPages,
                    tag
                }
            } catch (error) {
               /* if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }*/
            }
        },
        methods: {
           async nextPostPage(event) {
                if (event !== this.page) {
                    this.page = event;
                    const {tagPosts} = await this.$store.dispatch('posts/fetchTagPagedPosts', {'slug' : this.$route.params.slug, 'page' : this.page});
                    this.tagPosts = tagPosts;
                } else {
                    return false
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
