<template>
  <v-app-bar app color="primary" dark>
    <v-text-field
      hide-details="auto"
      placeholder="Search"
      autocomplete="off"
      v-model="query"
    ></v-text-field>
    <v-btn icon link @click="search"><v-icon>mdi-magnify</v-icon></v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "HomeNav",
  data() {
    return {
      query: ""
    };
  },
  methods: {
    search() {
      if (this.query != "") {
        this.$router.push({ name: "Search", params: { q: this.query } });
      } else {
        alert("Invalid search query");
      }
    }
  }
};
</script>
