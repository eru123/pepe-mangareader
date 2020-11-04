<template>
  <div class="text-center">
    <v-btn class="ma-4" color="primary" :disabled="current <= 1" @click="prev"
      >Chapter {{ (current || 2) - 1 }}</v-btn
    >
    <v-btn class="ma-4" color="primary" @click="next"
      >Chap {{ Number(current) + 1 }}</v-btn
    >
  </div>
</template>
<script>
export default {
  name: "ReadPagin",
  methods: {
    prev() {
      this.$router.push({
        name: "Read",
        params: { manga: this.manga, chapter: Number(this.current || 2) - 1 },
        query: { lc: this.last }
      });
    },
    next() {
      this.$router.push({
        name: "Read",
        params: { manga: this.manga, chapter: Number(this.current || 0) + 1 },
        query: { lc: this.last }
      });
    }
  },
  props: {
    manga: String,
    current: String,
    last: Number
  }
};
</script>
