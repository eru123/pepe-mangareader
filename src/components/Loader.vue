<template>
  <v-container v-if="loading" class="fill-height">
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col class="subtitle-1 text-center" cols="12">
        {{ message }}
      </v-col>
      <v-col cols="6">
        <v-progress-linear
          color="primary"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Loader",
  props: {
    loading: Boolean,
    message: String
  }
};
</script>
