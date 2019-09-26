<template>
  <v-breadcrumbs :items="items">
    <template v-slot:item="props">
      <nuxt-link :to="props.item.to" style="text-decoration: none; font-weight: normal;" :class="[props.item.disabled && 'dis-bread']">
        <v-breadcrumbs-item >
          {{ props.item.text}}
        </v-breadcrumbs-item>
      </nuxt-link>
    </template>
  </v-breadcrumbs>
</template>

<script>
    export default {
        props: ['items'],
    }
</script>

<style scoped>

</style>
