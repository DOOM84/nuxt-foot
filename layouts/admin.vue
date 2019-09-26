<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item exact to="/admin">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/posts">
          <v-list-item-action>
            <v-icon>create</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Новости</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/champs">
          <v-list-item-action>
            <v-icon>language</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Чемпионаты</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/ecups">
          <v-list-item-action>
            <v-icon>language</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Еврокубки</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/teams">
          <v-list-item-action>
            <v-icon>flag</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Команды</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/ecup_teams">
          <v-list-item-action>
            <v-icon>flag</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Команды (еврокубки)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/players">
          <v-list-item-action>
            <v-icon>people</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Игроки</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/results">
          <v-list-item-action>
            <v-icon>equalizer</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Результаты</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/ecup_results">
          <v-list-item-action>
            <v-icon>equalizer</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Результаты (еврокубки)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/tags">
          <v-list-item-action>
            <v-icon>link</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Теги</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/users">
          <v-list-item-action>
            <v-icon>supervised_user_circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Пользователи</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/api/stands">
          <v-list-item-action>
            <v-icon>insert_chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Api (турнирные таблицы)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/api/scorers">
          <v-list-item-action>
            <v-icon>insert_chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Api (бомбардиры)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/api/results">
          <v-list-item-action>
            <v-icon>insert_chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Api (результаты)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/api/lch_stands">
          <v-list-item-action>
            <v-icon>insert_chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Api (ЛЧ турнирные таблицы)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/api/le_stands">
          <v-list-item-action>
            <v-icon>insert_chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Api (ЛЕ турнирные таблицы)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/api/lch_results">
          <v-list-item-action>
            <v-icon>insert_chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Api (результаты ЛЧ)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/api/le_results">
          <v-list-item-action>
            <v-icon>insert_chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Api (результаты ЛE)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact to="/admin/api/players">
          <v-list-item-action>
            <v-icon>people</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Api (составы)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
      <v-toolbar-title >
        <nuxt-link to="/" class="white--text" style="text-decoration: none">Новости еврофутбола</nuxt-link>
       - Административная панель
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="$auth.user">
        <v-avatar>
          <img  :src="$auth.user.avatar" alt="avatar">
        </v-avatar>
        <v-toolbar-title class="pl-3 pr-5">DOOM</v-toolbar-title>
        <v-btn
          class="caption"
          text
          small
          @click="$auth.logout()"
        >
          <v-icon left>power_settings_new</v-icon> Выйти
        </v-btn>
      </template>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
      >
        <v-row>
          <v-col >
            <nuxt  />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
    export default {
        data() {
            return {drawer: null}
        },
        computed: {
            color(){
                return this.$store.getters['auth/snackbarColor']
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
    }
</script>
