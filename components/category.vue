<template>
  <v-container>
    <v-row>
      <v-col class="mt-2" cols="12">
        <h2 style="font-size: 1.5em; color: #fff;text-transform:uppercase">{{title}}</h2>
      </v-col>
      <v-col v-for="(serie, j) in data" :key="j" cols="6" sm="4" md="3">
        <v-card color="transparent" style="box-shadow: unset" class="mx-auto">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <n-link
            :to="
              '/animes/' + serie.title.replaceAll(' ', '-').replaceAll(':', '')
            "
          >
            <v-img
              :height="height"
              :src="serie.image_url"
              aspect-ratio="1"
              class="grey lighten-2"
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
          </n-link>
          <h3 style="color: #fff">{{ serie.title }}</h3>
          <v-card-text>
            <v-row>
              <v-icon
                style="
                  font-size: 20px;
                  line-hieght: 1.2;
                  margin-left: -5px;
                  color: gold !important;
                "
                >mdi-star</v-icon
              >
              <div class="grey--text ms-2">
                {{ serie.score }}
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props:{
    data:Array,
    title:String
  },
  methods:{
    height() {
      let height;
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
          height = 300
          break
        case 'md':
          height = 350
          break
        case 'lg':
          height = 375
          break
        case 'xl':
          height = 400
          break
        default:
          height = 175
      }
      return height
    },
  }
}
</script>

<style>
</style>
