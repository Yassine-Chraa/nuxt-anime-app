<template>
  <category :data="animesData" :title="cat.split('-').join(' ')" />
</template>
<script>
export default {
  async asyncData({ params }) {
    const cat = await params.cat
    return { cat }
  },
  computed: {
    animesData() {
      let data
      if (this.cat === 'top-animes') data = this.$store.state.topAnimes
      if (this.cat === 'upcoming-animes')
        data = this.$store.state.upcomingAnimes
      if (this.cat === 'movies') data = this.$store.state.movies
      return data
    },
  },
  mounted() {
  },
  created() {
    if (this.cat === 'top-animes' && this.$store.state.topAnimes.length === 0)
      this.$store.dispatch('getTopAnimes')
    if (
      this.cat === 'upcoming-animes' &&
      this.$store.state.upcomingAnimes.length === 0
    )
      this.$store.dispatch('getUpcomingAnimes')
    if (this.cat === 'movies' && this.$store.state.movies.length === 0)
      this.$store.dispatch('getMovies')
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
h3 {
  font-size: 16px;
  padding-right: 8px;
  padding-top: 8px;
}
</style>
