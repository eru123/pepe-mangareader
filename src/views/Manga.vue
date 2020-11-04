<template>
  <v-app>
    <Nav :title="manga.title" />
    <v-main app>
      <Loader :loading="loading" message="Getting Manga information" />
      <Error :error="error" message="Can't find Manga. Retry" />
      <v-container v-if="!loading && !error">
        <p>Genre: {{ manga.genre }}</p>
        <p class="my-3" color="gray">Description: {{ manga.description }}</p>
        <v-subheader>Chapters ({{ manga.chapters.length || 0 }})</v-subheader>
        <List :list="manga.chapters" />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import Nav from "@/components/BackNav.vue";
import List from "@/components/List.vue";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import reader from "@/reader";

export default {
  name: "Manga",
  data() {
    return {
      loading: false,
      error: false,
      manga: {
        title: "",
        chapters: [],
        description: "",
        genre: ""
      }
    };
  },
  created() {
    this.loading = true;
    var code = this.$router.currentRoute.params.manga;
    reader
      .manga(code)
      .then(e => {
        if (
          typeof e.title == "undefined" ||
          typeof e.description == "undefined"
        ) {
          throw Error("Cut!!!!");
        }
        this.manga = e || this.manga;
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
        this.manga.chapters.reverse();
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
