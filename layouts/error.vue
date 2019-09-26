<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="12"
        md="12"
      >
        <div class="error-content-holder theme-padding">
          <div class="error-content">
            <h1>4<v-icon style="color: #333; font-size: calc(1em + 1vw)">sports_soccer</v-icon>4<span class="font-open-sans">Ошибка</span></h1>
            <p>Сожалеем, но такой страницы не существует...</p>
            <v-btn to="/" color="error" dark large>Вернуться на главную</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    }
  },
  data () {
    return {
      pageNotFound: 'Новости еврофутбола. Сожалеем, но такой страницы не существует...',
      otherError: 'Произошла ошибка'
    }
  }
}
</script>

<style lang="scss" scoped>
/*h1 {
  font-size: 20px;
}*/
.error-content-holder{ text-align: center;}
.error-content{ display: inline-block;}
.error-content h1{ color: #333; font-size: calc(1em + 5vw)}
.error-content h1 span{ color: #ccc; text-transform: uppercase; font-weight: 100;}
.error-content h1 i{ font-size: calc(1em + 5vw)}
.error-content p{ text-transform: uppercase; font-size: 20px; color: #555;}
.font-open-sans{ font-family: 'Open Sans', sans-serif;}
.theme-padding{ padding: 80px 0;}
</style>
