<template>
  <category  :data="animesData" :title="cat.split('-').join(' ')" />
</template>
<script>
export default {
  async asyncData({ params }) {
    const cat = await params.cat
    return { cat }
  },
  data() {
    return {
      settings: {
        dots: true,
        arrows: false,
        focusOnSelect: true,
        infinite: true,
        speed: 1500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 5,
        slidesToScroll: 5,
        touchThreshold: 7,
        pauseOnDotsHover: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
            },
          },
        ],
      },
    }
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
}
</script>

<style lang="scss" scoped>
h3 {
  font-size: 16px;
  padding-right: 8px;
  padding-top: 8px;
}
</style>
