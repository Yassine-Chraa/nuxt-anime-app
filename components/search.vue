<template>
  <div
    v-show="showSearch"
    class="search-page"
    style="position: relative;display: none;"
  >
    <input
      v-model="val"
      type="search"
      name=""
      placeholder="Search..."
      class="px-3"
      @keyup.prevent="getAnimes"
      @focus="display = true"
      @blur="blurAction($event)"
    />
    <v-card v-if="display" class="mx-auto">
      <v-list v-if="showList">
        <v-list-item-group v-for="(item, i) in items.slice(0, 6)" :key="i">
          <v-list-item id="animeLink">
            <n-link
              :to="
                '/animes/' + item.title.replaceAll(' ', '-').replaceAll(':', '')
              "
              style="color: inherit"
              class="d-flex ma-0"
            >
              <v-list-item-avatar size="30">
                <v-img
                  :src="item.image_url"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template #placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                    </v-row>
                  </template>
                </v-img>
              </v-list-item-avatar>
              <v-list-item-content id="animeLink" @click="close()">
                <v-list-item-title
                  v-text="item.title"
                ></v-list-item-title>
              </v-list-item-content>
            </n-link>
          </v-list-item>
          <div class="divider"></div>
        </v-list-item-group>
      </v-list>
      <v-card-text v-else>Search for your favorite anime</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    showSearch: { type: Boolean, default: () => false },
  },
  data() {
    return {
      isLoading: false,
      items: [],
      val: '',
      display: false,
      showList: false,
    }
  },
  methods: {
    getAnimes() {
      if (this.val.length > 1) {
        this.isLoading = true
        this.$axios
          .$request({
            method: 'GET',
            url: `https://jikan1.p.rapidapi.com/search/anime?q=${this.val}/`,
            headers: {
              'x-rapidapi-host': 'jikan1.p.rapidapi.com',
              'x-rapidapi-key': process.env.API_TOKEN,
            },
          })
          .then((res) => {
            this.items = res.results
            this.showList = true
            this.isLoading = false
          })
          .catch(() => {
            this.items = []
            this.showList = false
          })
      } else {
        this.showList = false
      }
    },
    close() {
      this.display = false
      this.val = ''
      this.items = []
    },
    blurAction(e) {
      if (e.relatedTarget !== null) {
        if (e.relatedTarget.parentElement.id !== 'animeLink') {
          this.close()
        }
      } else {
        this.close()
      }
    },
  },
}
</script>
