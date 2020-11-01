<template>
  <v-card elevation="0">
    <v-list v-if="list.length > 0">
      <v-list-item
        v-for="(r, i) in list"
        :key="i"
        link
        @click="$router.push('/manga/' + r.code)"
      >
        <v-list-item-avatar>
          <v-avatar color="primary" size="48">
            <span class="white--text headline">{{ i + 1 }}</span>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ r.title || "" }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list v-else>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>No items to show</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: "List",
  props: {
    list: Array
  }
};
</script>
