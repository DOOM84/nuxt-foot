<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <crumbs :items="items" />
      <v-col
        cols="12"
        sm="12"
        md="12"
      >
        <v-card class="pa-5">
        <v-form @submit.prevent="onSubmit">
          <v-text-field
            v-model="controls.title"
            label="Название"
          ></v-text-field>
          <v-text-field
            v-model="controls.subtitle"
            label="Описание"
          ></v-text-field>
          <tinymce-editor v-model="controls.body" api-key='blw4o7h6afhvf1gsplyzxgeikzi5gqjs3yq8uyy1c163rzsi' :init="init"></tinymce-editor>
          <v-select
            v-model="controls.champ_id"
            @change="controls.ecup_id = null"
            :items="champs"
            item-text="name"
            item-value="id"
            label="Чемпионат"
            chips
            deletable-chips
          ></v-select>
          <v-select
            v-model="controls.ecup_id"
            @change="controls.champ_id = null"
            :items="ecups"
            item-text="name"
            item-value="id"
            label="Еврокубок"
            chips
            deletable-chips
          ></v-select>
          <v-file-input
            :rules="rules"
            v-model="file"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Выберите изображение"
            label="Изображение для новости"
            prepend-icon="mdi-camera"
          ></v-file-input>
          <v-autocomplete
            v-model="controls.tags"
            :items="tags"
            chips
            label="Теги"
            item-text="name"
            item-value="id"
            multiple
            filled
            deletable-chips
          >
          </v-autocomplete>
          <v-autocomplete
            v-model="controls.players"
            :items="players"
            chips
            label="Игроки"
            item-text="name"
            item-value="id"
            multiple
            filled
            deletable-chips
          >
          </v-autocomplete>
          <v-autocomplete
            v-model="controls.teams"
            :items="teams"
            chips
            label="Команды"
            item-text="name"
            item-value="id"
            multiple
            filled
            deletable-chips
          >
          </v-autocomplete>
          <v-switch
            v-model="controls.is_headline"
            label="Главная новость (в карусели)"
          ></v-switch>
          <v-switch
            v-model="controls.status"
            label="Опубликовано"
          ></v-switch>
          <v-text-field
            v-model="controls.source"
            label="Источник"
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary">Сохранить</v-btn>
          </v-card-actions>
        </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue';
    import Crumbs from '@/components/crumbs'
    export default {
        layout: 'admin',
        components: {
            'tinymce-editor': Editor, Crumbs
        },
        data(){
            return {
                items: [
                    {
                        text: 'Панель управления',
                        disabled: false,
                        to: "/admin",
                    },
                    {
                        text: 'Новости',
                        disabled: false,
                        to: '/admin/posts',
                    },
                    {
                        text: 'Добавить новость',
                        disabled: true,
                        to: '/admin/posts',
                    }
                ],
                rules: [
                    value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
                ],
                init:{
                    selector: 'textarea',
                    height: 500,
                    plugins: 'print preview powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists  wordcount tinymcespellchecker a11ychecker imagetools mediaembed  linkchecker  textpattern help',
                    toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
                    images_upload_handler: function (blobInfo, success, failure) {
                        const data = new FormData();
                        data.append( 'file', blobInfo.blob());
                        $nuxt.$axios( {
                            url: 'admin/imgPost',
                            method: 'post',
                            data,
                            headers: {
                                'Content-Type': 'multipart/form-data;'
                            },
                            withCredentials: false
                        } ).then( response => {
                            if ( response.data.result === 'success' ) {
                                success('/img/posts/'+response.data.url);
                            } else {
                                console.log(response.data.message);
                            }
                        } ).catch( response => {
                            console.log( 'Upload failed' );
                        } );
                    }
                },
                file: null,
                controls: {
                    title: '',
                    subtitle: '',
                    body: '',
                    source: '',
                    champ_id: null,
                    ecup_id: null,
                    is_headline: false,
                    status: false,
                    tags: [],
                    players: [],
                    teams: [],
                },
                champs: '',
                tags: '',
                players: '',
                teams: '',
                ecups: ''
            }
        },
        async asyncData({store}) {
            try {
                const {champs, ecups, tags, players, teams} = await store.dispatch('adminPost/add');
                return {
                    champs,
                    tags,
                    players,
                    teams,
                    ecups
                }
            } catch (error) {
                if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }
            }
        },
        methods: {
           async onSubmit(){

               const formData = new FormData();
               for (let elem in this.controls) {
                   formData.append(elem, JSON.stringify(this.controls[elem]))
               }
               formData.append('image', this.file);
               try {
                   await this.$store.dispatch('adminPost/create', formData);

                   this.$store.commit('auth/SET_SNACKBAR', {
                       show: true,
                       text: 'Пост успешно добавлен',
                       color: 'success'
                   });
                   this.$router.push('/admin/posts')
               } catch (e) {
                   console.log(e);
               }
            }
        },
        watch: {
            errors() {
                if(this.errors.title){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.title[0],
                        color: 'error'
                    });
                }
                if(this.errors.body){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.body[0],
                        color: 'error'
                    });
                }
                if(this.errors.subtitle){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.subtitle[0],
                        color: 'error'
                    });
                }
                if(this.errors.champ_id){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.champ_id[0],
                        color: 'error'
                    });
                }
                if(this.errors.ecup_id){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.ecup_id[0],
                        color: 'error'
                    });
                }
                if(this.errors.image){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: this.errors.image[0],
                        color: 'error'
                    });
                }
            }
        },

    }

</script>

<style scoped>

</style>
