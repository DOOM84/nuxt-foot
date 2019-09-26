import Vue from 'vue'
import { addBackToTop } from 'vanilla-back-to-top'
addBackToTop({

  scrollDuration : 2000
});
Vue.use(addBackToTop);
addBackToTop({
  scrollDuration : 300
});
