<template>
  <v-app id="app" style="background-color: #020d18; color: #fff">
    <div v-show="isLoading" class="loading">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <v-app-bar app style="color: #fff" color="#020d18">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="showSearch = false"
        ><n-link style="color: inherit" to="/"
          >AnimeWorld</n-link
        ></v-toolbar-title
      >
      <div class="search" style="position: relative">
        <input
          v-model="val"
          type="search"
          name=""
          placeholder="Search..."
          class="px-3 rounded-lg"
          @keyup.prevent="getAnimes"
          @focus="display = true"
          @blur="blurAction($event)"
        />
        <v-icon
          id="searchIcon"
          class="search-icon"
          style="display: none"
          @click="showSearch = !showSearch"
        >
          mdi-magnify
        </v-icon>
        <v-card v-if="display" class="mx-auto rounded-lg">
          <v-list v-if="showList">
            <v-list-item-group v-for="(item, i) in items.slice(0, 6)" :key="i">
              <v-list-item id="animeLink">
                <n-link
                  :to="
                    '/animes/' +
                    item.title.replaceAll(' ', '-').replaceAll(':', '')
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
                      v-text="item.title.substr(0, 24)"
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
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" dark fixed temporary color="#020d18">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="require('@/assets/profile.png')"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Yassine Chraa</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link @click="showSearch = false">
          <v-list-item-content>
            <n-link
              to="/"
              style="font-size: 1.2em; text-decoration: none; color: #fff"
              >Home</n-link
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(cat, indice) in categories"
          :key="indice"
          link
          @click="showSearch = false"
        >
          <v-list-item-content>
            <n-link
              :to="'/categories/' + cat.path"
              style="font-size: 1.2em; text-decoration: none; color: #fff"
              >{{ cat.name }}</n-link
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <nuxt v-show="!showSearch" />
      <search :showSearch="showSearch" />
    </v-main>
    <v-divider class="mt-16"></v-divider>
    <v-footer dark color="#020d18"
      ><v-container style="padding: 0 !important"
        ><p
          class="ml-5"
          style="
            margin-bottom: 0;
            padding-bottom: 8px;
            padding-top: 8px;
            font-size: 500;
            color: #abb7c4;
            font-size: 15px;
          "
        >
          © 2020. All Rights Reserved
        </p></v-container
      ></v-footer
    >
  </v-app>
</template>
<script>
import search from '@/components/search.vue'
export default {
  components: {
    search,
  },
  data: () => ({
    drawer: null,
    categories: [
      {
        name: 'Top Animes',
        path: 'top-animes',
      },
      {
        name: 'Upcoming Animes',
        path: 'upcoming-animes',
      },
      {
        name: 'Movies',
        path: 'movies',
      },
    ],
    isLoading: false,
    items: [],
    val: '',
    display: false,
    showList: false,
    showSearch: false,
  }),
  watch:{
    $route(){
      this.isLoading = true;
      setTimeout(this.closeLoading,1000)
    }
  },
  mounted() {
    addEventListener('load', this.closeLoading)
    setTimeout(this.closeLoading,3000)
    addEventListener('resize', this.updateShowSearch)
  },
  created() {
    this.isLoading = true
  },
  destroyed() {
    removeEventListener('resize', this.updateShowSearch)
    removeEventListener('load', this.closeLoading)
  },
  methods: {
    getAnimes() {
      if (this.val.length > 1) {
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
    updateShowSearch() {
      if (innerWidth > 500) {
        this.showSearch = false
      }
    },
    closeLoading() {
      this.isLoading = false
    },
  },
}
</script>
