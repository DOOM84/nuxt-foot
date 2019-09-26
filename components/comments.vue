<template>
  <div>
  <div :id="'comment' + comment.id" v-for="comment in comments[id]" :key="comment.id" class="media pr-3 pt-3">
    <v-avatar style="cursor: pointer">
      <img  :src="comment.owner.avatar ? comment.owner.avatar.img : '/img/avatars/no-avatar.png'" alt="avatar">
    </v-avatar>
    <div class="media-body ">
      <h5 class="mt-0 mb-3 pl-2">{{comment.owner.name}} <span class="pl-2 grey--text"> {{comment.created_at}}</span>
        <v-btn text small v-if="$auth.loggedIn" @click="answer(comment)" class="pl-2 overline"
                v-scroll-to="{ el: '#commentForm', offset: -200 }">
          <strong>Ответить</strong>
        </v-btn>
      </h5>
      <p class="pl-2">{{comment.body}}</p>
      <comments  v-if="comments[comment.id]"  :comments="comments" :id="comment.id"/>

    </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "comments",
        props: ['comments', 'id'],
        methods: {
            answer(comment){
                this.$store.commit('auth/SET_ANSWER',
                    {author: comment.owner.name, date: comment.created_at, id: comment.id})
            }
        }
    }
</script>

<style lang="scss" scoped>
  .media{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;}
  .media-body{-ms-flex:1;flex:1; }
</style>
