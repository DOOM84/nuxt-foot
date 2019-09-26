<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="12"
        md="8"
      >
        <v-card
          outlined
          tile
          class="elevation-2"
        >
          <v-img
            class="grey lighten-2"
            :src="post.img"
            aspect-ratio="1.8"
          ></v-img>
          <v-row class="caption pa-0 ma-0">
            <v-col>
              Источник: <span class="red--text">{{post.source}}</span>
            </v-col>
          <v-spacer></v-spacer>
            <v-col class="text-right">
              <span>Автор: <span class="red--text ">Admin</span> {{post.created_at}}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-right pt-0 pb-0">
          <v-rating
            class="pt-0"
            v-model="post.rate"
            background-color="orange lighten-3"
            color="orange"
            small
            half-increments
            @input="rateMe"
          ></v-rating>
            </v-col>
          </v-row>
          <v-card-title class="pt-0">
            <div>
              <h3 class=" headline mb-0">{{post.title}}</h3>
            </div>
          </v-card-title>
          <v-card-text>  {{ post.subtitle }}</v-card-text>
          <v-card-text class="black--text " v-html="post.body">
          </v-card-text>

          <div class="pl-2 pr-2 mb-5">Теги:
            <nuxt-link v-for="player in post.players"
                         :to="'/player/'+player.slug"
                         :key="player.id"
                         class="tabLink pa-0 ma-0"
                         style="text-decoration: none"
            >
              <v-chip @click="" class="mr-1 mt-1">{{player.name}}</v-chip>
            </nuxt-link>

            <nuxt-link v-for="team in post.teams"
                         :to="'/team/'+team.slug"
                         :key="team.id"
                         class="tabLink"
                         style="text-decoration: none"
            >
              <v-chip @click="" class="mr-1 mt-1">{{team.name}}</v-chip>
            </nuxt-link>

            <nuxt-link   v-for="tag in post.tags"
                         :to="'/tag/'+tag.slug"
                         :key="tag.id"
                         class="tabLink"
                         style="text-decoration: none"
            >
              <v-chip @click="" class="mr-1 mt-1">{{tag.name}}</v-chip>
            </nuxt-link>
          </div>
          <h4 class="pl-3 pt-5 pb-5 mb-1">Комментарии</h4>
          <comments class="pl-3 mb-5"  v-if="comments"  :comments="comments" :id="'root'"/>
          <comment-form v-if="$auth.loggedIn" :postId="post.id" id="commentForm" />
          <p class="pl-3" v-else>Войдите для возможности комментировать.</p>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="12"
      >
        <v-card
          outlined
          tile
          class="elevation-2"
        >
          <app-stands :teams="champ.teams" />
        </v-card>
        <h3 class="pt-3 pl-2">{{champ.name}}. Новости</h3>
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
    import AppStands from "@/components/AppStands";
    import AppPosts from "@/components/AppPosts";
    import Comments from "@/components/comments";
    import CommentForm from "@/components/commentForm";
    import pusher from "@/plugins/pusher";
    export default {
        validate ({ params, store }) {
            return store.getters['home/menuChamps'].some((champ) => champ.slug === params.champ)
        },
        head () {
            return {
                title: `Новости еврофутбола. ${this.post.title}`,
                meta: [
                    { hid: 'description', name: 'description', content: `Просмотр новости: ${this.post.title}` }
                ]
            }
        },
        data(){
            return {
                post: '',
                posts: '',
                champ:'',
                comments:'',
                postChannel: null
            }
        },
        components: {
            AppStands, AppPosts, Comments, CommentForm
        },
        async asyncData({store, params}) {
            try {
                const {champs} = await store.dispatch('home/fetchChamps');
                const {post, comments} = await store.dispatch('posts/fetchPost', params.post);
                const {posts} = await store.dispatch('home/fetchPosts', params.champ);
                //console.log(comments);

                return {
                    post,
                    posts: posts.filter((post, idx) => idx <= 9),
                    comments,
                    champ: champs.find(champ => champ.slug === params.champ)
                }
            } catch (error) {
                /*if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }*/
            }
        },
        methods: {
            answer(comment){
                this.$store.commit('auth/SET_ANSWER',
                    {author: comment.owner.name, date: comment.created_at, id: comment.id});
            },
           async rateMe(event){
                try {
                    const {rate} = await this.$store.dispatch('auth/rate', {'slug' : this.post.slug, 'rate' : event});
                    if (rate){ this.$set(this.post, 'rate', rate);}
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Вы успешно оценили этот пост',
                        color: 'success'
                    });
                }catch (error) {
                    if(error.response.status === 403){
                        this.$set(this.post, 'rate', error.response.data.errors.rate);
                        this.$store.commit('auth/SET_SNACKBAR', {
                            show: true,
                            text: 'Вы уже оценили этот пост.',
                            color: 'error'
                        });
                    }
                }
            }
        },
        computed: {
            addedAnswer(){
                return this.$store.getters['auth/addedAnswer']
            },
        },
        watch: {
            addedAnswer(added) {
                if(!added.parent_id){
                    !this.comments.root ? this.$set(this.comments, 'root', [added]) : this.comments.root.push(added);
                }else{
                    if (this.comments.hasOwnProperty(added.parent_id)) {
                        this.comments[added.parent_id].push(added);
                    } else {
                        this.$set(this.comments, added.parent_id, [added]);
                    }
                    this.$scrollTo('#comment'+added.parent_id, 200, {offset: -200,});
                }
            }
        },
        mounted(){
            this.postChannel = pusher.subscribe('postChannel');
            this.postChannel.bind ('App\\Events\\PostEvent', function({post}){
                if(post.champ === this.$route.params.champ){
                    this.posts.unshift(post);
                    if(this.posts.length > 10){this.posts.splice(-1,1)}
                }
            }.bind(this));

        },
        beforeDestroy() {
            this.postChannel.unbind();
            this.$store.commit('auth/SET_ANSWER', null);
            this.$store.commit('auth/SET_ADDED_ANSWER', null);
        }

    }
</script>

<style lang="scss" scoped>

</style>
