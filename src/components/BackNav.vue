<template>
  <v-app-bar app color="white" light>
    <v-btn icon link @click="$router.go(-1)"
      ><v-icon>mdi-arrow-left</v-icon></v-btn
    >
    <span>{{ title || "" }}</span>
  </v-app-bar>
</template>
<script>
export default {
  name: "BackNav",
  props: {
    title: String
  }
};
</script>
