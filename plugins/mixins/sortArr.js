import Vue from 'vue'

Vue.mixin({
    methods: {
      sortArr(arr){
        return Object.keys(arr).sort().reduce((r, k) => (r[k] = arr[k], r), {});
      },
    }
});
