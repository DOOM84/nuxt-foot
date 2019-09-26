<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        md="4"
        sm="12"
      >
        <v-card>
        <div class="headline text-center pb-2"><strong>{{player.name}}</strong></div>
        <div class="text-center">
          <img
            :src="player.img"
            class="pa-0"
            style="max-width: 100%"
          >
        </div>
        <ul class="text-center pa-0 pt-2" style="list-style-type: none">
          <li>Дата рождения:
            <p><strong>{{player.dob}}</strong></p></li>
          <li>Гражданство:<p><strong>{{player.country}}</strong></p></li>
          <li>Клуб:<p>
            <router-link v-if="player.team_slug" class="tabLink" :to="'/team/' + player.team_slug">
              <strong>{{player.team}}</strong>
            </router-link>
            <span v-else>
              <strong>{{player.team}}</strong>
            </span>
          </p>
          </li>
          <li>Амплуа:<p><strong>{{player.position}}</strong></p></li>
          <li>Рост/Вес:<p><strong>{{player.height || '-'}}/{{player.weight || '-'}}</strong> </p></li>
        </ul>
        </v-card>
        <v-card
          v-if="champ"
          outlined
          tile
          class="elevation-2"
        >
          <app-stands :teams="champ.teams" />
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="8"
      >
        <span class="title pl-2">Новости игрока</span>
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
    import AppPosts from "@/components/AppPosts";
    import AppStands from "@/components/AppStands";
    import CardPosts from "@/components/CardPosts";
    export default {
        validate ({ params }) {
            return !!params.slug
        },
        head () {
            return {
                title: `Новости еврофутбола. Футболист: ${this.player.name}`,
                meta: [
                    { hid: 'description', name: 'description', content: `Просмотр игрока: ${this.player.name}` }
                ]
            }
        },
        components: {AppPosts, AppStands, CardPosts},
        data: function () {
            return {
                page: 1,
                staticPostPage: 1,
                postPages:'',
                posts: '',
                player: '',
                champ: '',
            }
        },
        async asyncData({store, params}) {
            try {
                const {player} = await store.dispatch('players/fetchPlayerSlug', params.slug);
                const {champs} = await store.dispatch('home/fetchChamps');
                const {posts, postPages} = await store.dispatch('posts/fetchPlayerPagedPosts', {'slug' : params.slug, 'page' : 1});
                return {
                    player,
                    champ: champs.find(champ => champ.slug === player.champ_slug),
                    posts,
                    postPages
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
                    const {posts} = await this.$store.dispatch('posts/fetchPlayerPagedPosts', {'slug' : this.$route.params.slug, 'page' : this.page});
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
