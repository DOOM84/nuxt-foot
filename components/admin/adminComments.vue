<template>
  <div>
    <div :id="'comment' + comment.id" v-for="comment in comments[id]" :key="comment.id" class="media pr-3 pt-3">
    <v-avatar style="cursor: pointer">
      <img  :src="comment.owner.avatar ? comment.owner.avatar.img : '/img/avatars/no-avatar.png'" alt="avatar">
    </v-avatar>
    <div class="media-body">
      <h5 class="mt-0 mb-3 pl-2">{{comment.owner.name}} <span class="pl-2 grey--text"> {{comment.created_at}}</span>
        <v-btn small class="pl-2 overline" @click="remove(comment.id)" text icon color="info">
          <v-icon>delete</v-icon>
        </v-btn>
      </h5>
      <p class="pl-2">{{comment.body}}</p>
      <admin-comments  v-if="comments[comment.id]"  :comments="comments" :id="comment.id"/>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "adminComments",
        props: ['comments', 'id'],
        methods: {
            async remove(comment){
                if (confirm('Are You Sure?')){
                    const {comments} = await this.$store.dispatch('adminPost/delCom',
                     {comment: comment, post: this.$route.params.post.slug});
                    this.$store.commit('adminPost/SET_COMMENTS', comments);
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Комментарий успешно удален',
                        color: 'success'
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  .media{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;}
  .media-body{-ms-flex:1;flex:1; }
</style>
