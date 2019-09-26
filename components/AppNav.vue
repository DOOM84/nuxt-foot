<template>
<div>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    temporary
    app
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          <v-form @submit.prevent="search">
            <v-text-field
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="search"
              label="Поиск"
              v-model.trim="searchQuery"
            ></v-text-field>
          </v-form>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list
      dense
      nav
    >
      <template class="pr-3 hidden-sm-and-down"  v-if="$auth.user">
        <v-list-item
          @click.prevent="dialog = true"
          link
        >
          <v-list-item-avatar>

            <img  :src="$auth.user.avatar" alt="avatar">

          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title> {{$auth.user.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="logout"
          link
        >
          <v-list-item-icon>
            <v-icon left>exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Выйти </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template v-else>
        <v-list-item
          to="/login"
          link
        >
          <v-list-item-icon>
            <v-icon left>lock</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Вход</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/signup"
          link
        >
          <v-list-item-icon>
            <v-icon left>person_add</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Регистрация</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

    </v-list>

    <v-list
      dense
      nav
    >
      <v-menu bottom offset-y class="pa-0 ma-0" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn
            style="width: 100%"
            color="black"
            text
            depressed
            v-on="on"
          >
            Чемпионаты
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="champ in champs" :key="champ.slug"
                       exact
                       :to="'/'+champ.slug"
          >
            <v-list-item-title>{{ champ.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu  bottom offset-y class="pa-0 ma-0" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn
            style="width: 100%"
            color="black"
            text
            depressed
            v-on="on"
          >
            Турнирные таблицы
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="champ in champs" :key="champ.slug"
                       exact
                       :to="'/stands/'+champ.slug"
          >
            <v-list-item-title>{{ champ.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu  bottom offset-y class="pa-0 ma-0" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn
            style="width: 100%"
            color="black"
            text
            depressed
            v-on="on"
          >
            Календарь
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="champ in champs" :key="champ.slug"
                       exact
                       :to="'/calendar/'+champ.slug"
          >
            <v-list-item-title>{{ champ.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu v-for="ecup in ecups" :key="ecup.slug"  bottom offset-y class="pa-0 ma-0" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn
            style="width: 100%"
            color="black"
            text
            depressed
            v-on="on"
          >
            {{ecup.name}}
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            exact
            :to="'/ecups/' + ecup.slug"
          >
            <v-list-item-title>Новости</v-list-item-title>
          </v-list-item>
          <v-list-item
            exact
            :to="'/ecups/' + ecup.slug + '/stands'"
          >
            <v-list-item-title>Турнирные таблицы</v-list-item-title>
          </v-list-item>
          <v-list-item
            exact
            :to="'/ecups/' + ecup.slug + '/calendar'"
          >
            <v-list-item-title>Календарь</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar
    :height="$vuetify.breakpoint.xs ? 64 : '64'"
    app
    color="black darken-3"
    dark
  >
    <v-app-bar-nav-icon class="pl-5 hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <h2 :class="{'subtitle-1': $vuetify.breakpoint.xs}"><nuxt-link style="text-decoration: none" class="white--text" to="/"><strong>НОВОСТИ ЕВРОФУТБОЛА</strong></nuxt-link></h2>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-form class="hidden-sm-and-down" @submit.prevent="search">
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="search"
      label="Поиск"
      v-model.trim="searchQuery"
    ></v-text-field>
    </v-form>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <template class="pr-3 hidden-sm-and-down"  v-if="$auth.user">
        <v-btn
          to=""
          class="hidden-sm-and-down"
          @click.prevent="dialog = true"
        >
        <span class="pr-2">{{$auth.user.name}}</span>
          <v-avatar style="cursor: pointer">
            <img  :src="$auth.user.avatar" alt="avatar">
          </v-avatar>
        </v-btn>
        <v-btn
          to=""
          @click="logout"
        >
          Выйти
        </v-btn>
      </template>
      <template class="pr-3 hidden-sm-and-down"  v-else>
      <v-btn to="/login" text><v-icon left>lock</v-icon>
        Вход
      </v-btn>
      <v-btn to="/signup" text><v-icon left>person_add</v-icon>
        Регистрация
      </v-btn>
      </template>
    </v-toolbar-items>
      <v-toolbar-items
        style="height:48px; width: 100%"  slot="extension"
        class="blue-grey lighten-5 text-center pa-0 ma-0 hidden-sm-and-down">
        <v-spacer></v-spacer>
        <v-menu open-on-hover bottom offset-y class="pa-0 ma-0" transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn
              color="black"
              text
              depressed
              v-on="on"
            >
              Чемпионаты
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="champ in champs" :key="champ.slug"
                         exact
                         :to="'/'+champ.slug"
            >
              <v-list-item-title>{{ champ.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu open-on-hover bottom offset-y class="pa-0 ma-0" transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn
              color="black"
              text
              depressed
              v-on="on"
            >
              Турнирные таблицы
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="champ in champs" :key="champ.slug"
                         exact
                         :to="'/stands/'+champ.slug"
            >
              <v-list-item-title>{{ champ.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu open-on-hover bottom offset-y class="pa-0 ma-0" transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn
              color="black"
              text
              depressed
              v-on="on"
            >
              Календарь
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="champ in champs" :key="champ.slug"
              exact
              :to="'/calendar/'+champ.slug"
            >
              <v-list-item-title>{{ champ.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu v-for="ecup in ecups" :key="ecup.slug" open-on-hover bottom offset-y class="pa-0 ma-0" transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn
              color="black"
              text
              depressed
              v-on="on"
            >
              {{ecup.name}}
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              exact
              :to="'/ecups/' + ecup.slug"
            >
              <v-list-item-title>Новости</v-list-item-title>
            </v-list-item>
            <v-list-item
              exact
              :to="'/ecups/' + ecup.slug + '/stands'"
            >
              <v-list-item-title>Турнирные таблицы</v-list-item-title>
            </v-list-item>
            <v-list-item
              exact
              :to="'/ecups/' + ecup.slug + '/calendar'"
            >
              <v-list-item-title>Календарь</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
      </v-toolbar-items>
      <v-snackbar
        top
        :color="color"
        label="error"
        value="error"
        v-model="snackbar"
      >
        {{this.$store.getters['auth/snackbarText']}}
        <v-btn
          dark
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title >
          <v-spacer></v-spacer>
          <div>
            Сменить аватар
            <v-avatar>
              <img  :src="$auth.user.avatar" alt="avatar">
            </v-avatar>
          </div>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            v-model="file"
            placeholder="Выберите аватар"
            label="Изображение для аватара"
            prepend-icon="mdi-camera"
            @change="handleFileUpload"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" v-if="showSubmit" @click="submitFile">Сохранить</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>


  </v-app-bar>

</div>
</template>

<script>
    export default {
        data(){
            return{
                dialog: false,
                file:null,
                imageUrl:null,
                drawer: false,
                searchQuery:'',
                valid: false,
                showSubmit: false,
                searchTest: /[^0-9A-zА-яЁё ]/,
                items: [
                    { title: 'Click Me' },
                    { title: 'Click Me' },
                    { title: 'Click Me' },
                    { title: 'Click Me 2' },
                ],
                rules: [
                    value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
                ],
            }
            },
        computed: {
            color(){
                return this.$store.getters['auth/snackbarColor']
            },
            champs() {
                return this.$store.getters['home/menuChamps']
            },
            ecups() {
                return this.$store.getters['home/menuEcups']
            },
            snackbar: {
                // геттер:
                get() {
                    return this.$store.getters['auth/snackbar']
                },
                // сеттер:
                set(newValue) {
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: false,
                        text: ''
                    });
                }
            },
        },
        methods: {
            search(){
                if (this.searchQuery && !this.searchTest.test(this.searchQuery) && this.searchQuery.length > 2 && this.searchQuery.length < 100){
                    if(this.searchQuery === this.$store.getters['search/search']){return false}
                this.$store.commit('search/SET_SEARCH', this.searchQuery);
                    this.searchQuery= '';
                if(this.$route.name === 'search'){
                    this.$store.commit('search/SET_START', true);
                }else{
                    this.$router.push({name: 'search'})
                }
                }else{
                    this.searchQuery= '';
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Недопустимые символы или их количество для поиска (минимум 3)',
                        color: 'error'
                    });
                    return false;
                }
            },
            logout(){
                this.$auth.logout()
            },
            handleFileUpload() {
                this.showSubmit = true
            },
            async submitFile(){

                let formData = new FormData();

                formData.append('img', this.file);

                try {
                    const data = await this.$store.dispatch('auth/addAvatar', formData);
                    await this.$auth.fetchUser();
                    this.file = null;
                    this.showSubmit = false;
                    this.dialog = false;
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Ваш аватар успешно изменен',
                        color: 'success'
                    });
                } catch (error) {
                    this.file = null;
                    this.dialog = false;
                    this.showSubmit = false;
                }
            },
        },
        watch: {
            errors() {
                if(this.errors.search){
                    console.log(this.errors.search);

                }
                if(this.errors.img){
                    this.$store.commit('auth/SET_SNACKBAR', {
                        show: true,
                        text: 'Неверный тип файла или его размер более 1000 кб',
                        color: 'error'
                    });
                }
            }
        },
    }
</script>

<style >

</style>
