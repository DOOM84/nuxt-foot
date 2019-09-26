<template>
<div>
  <crumbs :items="items" />
  <v-col class="text-center">
      <h2>Добро пожаловать в административную панель сайта Новости еврофутбола</h2>
      <p>Выберите необходимую категорию для управления из меню слева.</p>
  </v-col>
</div>

</template>

<script>
    import Crumbs from '@/components/crumbs'
export default {
    layout: 'admin',
    components: {Crumbs},
    data(){
        return {
            items: [
                {
                    text: 'Панель управления',
                    disabled: true,
                    to: '/admin'
                },
            ]
        }
    }
}
</script>
