<template>
  <v-app>
    <Nav />
    <v-main app>
      <Loader :loading="loading" message="Getting image list" />
      <Error :error="error" message="Failed to fetch image list. Retry" />
      <div v-if="!loading && !error">
        <v-img
          v-for="(i, k) in list"
          :key="k"
          :src="i.u"
          lazy-src=""
          color="secondary"
          min-height="75px"
          style="border-bottom: 1px solid #333"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import Nav from "@/components/BackNav.vue";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import reader from "@/reader";
export default {
  name: "Read",
  data() {
    return {
      loading: true,
      error: false,
      list: []
    };
  },
  created() {
    this.loading = true;
    var route = this.$router.currentRoute.params;
    var code = `${route.manga}/${route.chapter}`;
    reader
      .chapter(code)
      .then(e => {
        this.list = e || [];
        if (typeof this.list.length == "undefined" || this.list.length <= 0) {
          throw Error("Cut!");
        }
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
    Error,
    Loader
  }
};
</script>
