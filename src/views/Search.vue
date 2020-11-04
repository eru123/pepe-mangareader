<template>
  <v-app>
    <Nav title="Search" />
    <v-main>
      <Loader :loading="loading" :message="`Searching for '${query}'`" />
      <v-container fluid v-if="!loading">
        <div class="mb-4">
          <form @submit.prevent="search">
            <v-text-field
              label="Search"
              v-model="query"
              hide-details="auto"
              append-icon="mdi-magnify"
            >
            </v-text-field>
          </form>
        </div>
        <div>
          <v-list v-if="result.length > 0">
            <v-subheader>
              {{ result.length || 0 }} results for '{{ query }}'
            </v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(r, k) in result"
                :key="k"
                link
                @click="$router.push('/manga/' + r.link)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="r.title"> </v-list-item-title>
                  <v-list-item-subtitle v-html="r.genre">
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-html="r.description">
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-alert dense type="error" v-else>
            <strong>NO RESULTS</strong> for '{{ query }}'
          </v-alert>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import Nav from "@/components/BackNav.vue";
import Loader from "@/components/Loader.vue";
import reader from "@/reader";
export default {
  name: "Search",
  data() {
    return {
      query: "",
      result: [],
      loading: false
    };
  },
  created() {
    this.query = this.$router.currentRoute.params.q;
    this.search();
  },
  methods: {
    search() {
      this.loading = true;
      reader
        .search(this.query)
        .then(e => {
          this.result = e || [];
        })
        .catch(() => {
          this.result = [];
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  components: {
    Nav,
    Loader
  }
};
</script>
