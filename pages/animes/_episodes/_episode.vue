<template>
  <v-container>
    <v-row v-if="episode" class="pt-8">
      <v-col v-if="episode">
        <div class="heading d-flex" style="align-items: center">
          <h1>Episode {{episode.episode_id}}</h1>
          <div class="title" style="position: relative; margin-left: auto">
            <span>{{ episode.title }}</span>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="video mt-4">
          <iframe
          width="100%"
          :height="height"
          src="https://www.youtube.com/embed/FoVvpkMlTqM"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ params }) {
    const id = await params.episode
    const anime = await params.episodes
    return { id, anime }
  },
  computed: {
    episode() {
      return this.$store.state.animeEpisodes[this.id - 1]
    },
    height() {
      let height;
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
          height = 350
          break
        case 'md':
          height = 450
          break
        case 'lg':
          height = 500
          break
        case 'xl':
          height = 600
          break
        default:
          height = 300
      }
      return height
    },
  },

  created() {
    if (this.$store.state.anime.length === 0)
      this.$store.dispatch('getAnime', this.anime)
  },
}
</script>

<style lang="scss" scoped>
h1,span{
  font-size: 1.5em!important;
}
.details {
  color: #abb7c4;
}
</style>
