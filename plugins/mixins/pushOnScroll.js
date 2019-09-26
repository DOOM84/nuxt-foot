export default {
  data(){
    return {
      offset: 0,
      toLoad: 5,
      initPosts: 9,
    }
  },
    methods: {
      scroll() {
        window.onscroll = () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 400;
          if (bottomOfWindow) {
            this.addPosts();
          }
        };
      },
      addPosts(){
        if (this.offset <= this.posts.length) {
          let filtered = this.$store.getters['home/posts'].filter((post, idx) => idx > this.initPosts + this.offset && idx <= this.initPosts + this.toLoad + this.offset);
          this.posts.push(...filtered);
          this.offset += this.toLoad;
        }
      }
    },
  mounted() {
    this.scroll();
  }
};
