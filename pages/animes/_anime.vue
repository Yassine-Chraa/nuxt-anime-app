<template>
  <v-container v-if="animeDetails">
    <v-tabs v-if="animeDetails.type !== 'movie'" align-with-title>
      <v-tab><a @click="display = false">Details</a></v-tab>
      <v-tab><a @click="display = true">Episodes</a></v-tab>
    </v-tabs>
    <v-row v-show="!display" v-if="animeDetails" class="pt-8">
      <v-col class="poster" cols="6" sm="5" md="4" lg="3">
        <v-img
          :src="animeDetails.image_url"
          aspect-ratio="1"
          class="grey lighten-2"
          height="100%"
        >
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col class="content"  cols="6" sm="7" md="8" lg="9">
        <div class="heading d-flex" style="align-items: center">
          <h1>{{ animeDetails.title }}</h1>
          <div
            v-if="$vuetify.breakpoint.name !== 'xs'"
            class="rating"
            style="position: relative; margin-left: auto"
          >
            <v-icon
              style="
                font-size: 20px;
                line-hieght: 1.2;
                margin-left: -5px;
                color: gold !important;
                position: absolute;
                left: -24px;
                top: 1px;
              "
              >mdi-star</v-icon
            ><span>{{ animeDetails.score }}/10</span>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="details">
          <p>{{ animeDetails.synopsis }}</p>
          <v-simple-table
            dark
            style="color: inherit; background-color: transparent"

          >
            <tbody>
              <tr>
                <td>Type</td>
                <td>{{ animeDetails.type }}</td>
              </tr>

              <tr v-if="animeDetails.rated">
                <td>Rated</td>
                <td>{{ animeDetails.rated }}</td>
              </tr>
              <tr v-if="animeDetails.start_date">
                <td>First Show</td>
                <td>
                  {{
                    animeDetails.start_date.substr(0, 10).replaceAll('-', '/')
                  }}
                </td>
              </tr>
              <tr>
                <td>Members</td>
                <td>
                  {{ animeDetails.members }}
                </td>
              </tr>
              <tr>
                <td>MyAnimeList</td>
                <td>
                  <a style="font-weight: 500; text-decoration: none" :href="animeDetails.url">{{
                    animeDetails.url
                  }}</a>
                </td>
              </tr>
              <tr v-if="$vuetify.breakpoint.name === 'xs'">
                <td>Rating</td>
                <td>{{ animeDetails.score }}/10
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
    <v-row v-show="display" v-if="animeEpisodes" style="color: #abb7c4">
      <v-col v-for="(episode, ind) in animeEpisodes" :key="ind" md="6" cols="12">
        <div class="episode d-flex justify-space-between">
          <n-link :to="`${anime}/${episode.episode_id}`"
            >Episode: {{ episode.episode_id }}</n-link
          >
          <div class="options">
            <a href="#"
              ><v-icon style="color: #abb7c4 !important"
                >mdi-android-messages</v-icon
              ></a
            >
          </div>
        </div>
        <v-divider style="border-top-width: 2px"></v-divider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async asyncData({ params }) {
    const anime = await params.anime // When calling /abc the slug will be "abc"
    return { anime }
  },
  data() {
    return {
      display: false,
    }
  },
  computed: {
    ...mapState({
      animeDetails: (state) => state.anime[0],
      animeEpisodes: (state) => state.animeEpisodes,
    }),
    height() {
      let height
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          height = 300
          break
        default:
          height = '100%'
      }
      return height
    },
  },
  created() {
    this.$store.dispatch('clearAnimeDetails')
    this.$store.dispatch('getAnime', this.anime)
  },
}
</script>
<style lang="scss" scoped>
h1 {
  font-size: 1.2em;
}
.details {
  color: #abb7c4;
  p:nth-child(1) {
    padding-top: 16px;
  }
  tbody {
    tr {
      background-color: unset !important;
      td:nth-child(1) {
        font-weight: 700;
      }
      td {
        padding-left: 0 !important;
      }
    }
  }
}
.episode {
  > a {
    color: #abb7c4;
  }
}
@media only screen and (max-width: 450px){
  .poster{
    flex:0 0 100%;
    max-width: 100%;
  }
  .content{
    flex:0 0 100%;
    max-width: 100%;
  }
}
</style>
