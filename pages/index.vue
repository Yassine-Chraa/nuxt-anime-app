<template>
  <div class="grey lighten-2">
    <div id="top" style="background-color: #000">
      <v-container style="padding: 0; padding-top: 12px">
        <v-row v-if="airingAnimes">
          <VueSlickCarousel
            v-if="airingAnimes.length>0"
            style="margin-top: 0; padding-top: 18px"
            class="pb-6"
            v-bind="settings"
          >
            <div v-for="(serie, j) in topAnimes.slice(0, 20)" :key="j">
              <n-link
                :to="
                  '/animes/' +
                  serie.title.replaceAll(' ', '-').replaceAll(':', '')
                "
              >
                <v-img
                  :src="serie.image_url"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  height="300"
                >
                  <template #placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </n-link>
            </div>
          </VueSlickCarousel>
        </v-row>
      </v-container>
    </div>
    <div id="center" style="background-color: #020d18">
      <category :data="topAnimes" title="TOP ANIMES" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import category from '@/components/category.vue'
export default {
  components:{
    category
  },
  data() {
    return {
      settings: {
        dots: false,
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
            },
          },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      topAnimes: (state) => state.topAnimes,
      airingAnimes: (state) => state.airingAnimes,
    }),
  },
  created() {
    if (this.$store.state.topAnimes.length === 0)
      this.$store.dispatch('getTopAnimes')
    if (this.$store.state.airingAnimes.length === 0)
      this.$store.dispatch('getAiringAnimes')
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
