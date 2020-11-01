<template>
  <v-container v-if="error" class="fill-height">
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col class="subtitle-1 text-center" cols="12">
        {{ message }}
      </v-col>
      <v-col cols="6" align="center">
        <v-btn icon link @click="$router.go(0)">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Loader",
  props: {
    error: Boolean,
    message: String
  }
};
</script>
