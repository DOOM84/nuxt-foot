<template>
    <div class="ma-5 pt-5">
            <form
                  ref="form"
                  @submit.prevent="onSubmit"
            >
              <span v-if="answer"><span style="color: darkgray" class="body-2">
                Ответ пользователю:</span> {{answer.author}} <span class="grey--text body-2">от:</span> <span class="body-2">{{answer.date}}</span>
              <v-btn class="pl-1 overline" color="error"  text small @click.prevent="$store.commit('auth/SET_ANSWER', null)">
          <strong>Удалить ответ</strong>
        </v-btn>
              </span>
              <v-textarea
                v-model.trim="form.body"
                outlined
                required
                name="Body"
                label="Ваш комментарий"
              ></v-textarea>
                <v-spacer></v-spacer><v-btn type="submit" color="info">Отправить</v-btn>
            </form>
        </div>
</template>

<script>
    export default {
        props: ['postId'],
        data(){
            return {
                scroll: null,
                form: {
                    body: ''
                },
            }
        },
        methods: {
            onSubmit(){
                if(this.checkForm()){
                    this.sendComment()
                }

            },
            checkForm(){
                if (!this.form.body) {
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Напишите ваше сообщение',
                        color: 'error'
                    });
                    return  false
                }
                return true;
            },
            async sendComment(){
                try {
                    const {comment} = await this.$store.dispatch('auth/comment',
                        {
                            'post_id':this.postId,
                            'parent_id': this.answer ? this.answer.id : null,
                            'body': this.form.body
                        });
                    this.$store.commit('auth/SET_ANSWER', null);
                    this.$store.commit('auth/SET_ADDED_ANSWER', comment);
                    this.form.body = '';
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Вы успешно добавили свой комментарий',
                        color: 'success'
                    });
                }catch (error) {

                }
            }
        },
        computed: {
                answer(){
                  return this.$store.getters['auth/answer']
            }
        }
    }
</script>

<style scoped>

</style>
