<template>
  <v-app>
    <Nav />
    <v-main app>
      <Loader :loading="loading" message="Updating. Please wait" />
      <Error :error="error" message="Failed to fetch data. Retry" />
      <v-container v-if="!loading && !error">
        <div class="mb-4 sticky-top">
          <v-btn
            color="teal"
            class="mr-2"
            dark
            elevation="0"
            @click="
              tab = 'updates';
              list = updates;
            "
            rounded
            v-if="tab != 'updates'"
            >Chapter Updates</v-btn
          >
          <v-btn
            color="red"
            class="mr-2"
            dark
            elevation="0"
            @click="
              tab = 'latest';
              list = latest;
            "
            rounded
            v-if="tab != 'latest'"
            >New</v-btn
          >
          <v-btn
            color="info"
            class="mr-2"
            dark
            elevation="0"
            @click="
              tab = 'popular';
              list = popular;
            "
            rounded
            v-if="tab != 'popular'"
            >Popular</v-btn
          >
        </div>
        <v-subheader style="text-transform: capitalize;">{{ tab }}</v-subheader>
        <List :list="list" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Nav from "@/components/HomeNav.vue";
import List from "@/components/List.vue";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import reader from "@/reader";
export default {
  name: "Home",
  data() {
    return {
      loading: false,
      error: false,
      tab: "updates",
      list: [],
      latest: [],
      updates: [],
      popular: []
    };
  },
  created() {
    this.loading = true;
    reader
      .home()
      .then(e => {
        this.latest = e.latest || [];
        this.updates = e.updates || [];
        this.popular = e.popular || [];
        this.tab = "updates";
        this.list = this.updates;
        this.error = false;
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  components: {
    Nav,
    List,
    Loader,
    Error
  }
};
</script>
