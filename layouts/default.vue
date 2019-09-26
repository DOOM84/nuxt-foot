<template>
  <v-app>
    <app-nav />
    <v-content :style="{'padding-top': $vuetify.breakpoint.smAndDown ? '80px' : '100px'}">
      <v-container
        :style="wall"
        style="min-height: 100%"
        fluid
      >
        <v-row>
          <nuxt class="pl-0 pr-0 pt-0 mt-5"  />
        </v-row>
      </v-container>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
  import AppNav from "@/components/AppNav";
  import AppFooter from "@/components/AppFooter";
    export default {
        components: {
            AppNav,AppFooter
        },
        computed: {
            wall() {
                return this.$store.getters['home/wall']
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.params.slug === 'lch' || to.params.slug === 'le'){
                    this.$store.commit('home/SET_WALL', to.params.slug);
                }else{
                    this.$store.commit('home/CLEAR_WALL');
                }

            }
        }
    }
</script>




