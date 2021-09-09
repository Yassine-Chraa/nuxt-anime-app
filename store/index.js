const options = {
  method: 'GET',
  url: '',
  headers: {
    'x-rapidapi-host': 'jikan1.p.rapidapi.com',
    'x-rapidapi-key': process.env.API_TOKEN
  }
};

export const state = () => ({
  topAnimes:[],
  airingAnimes:[],
  upcomingAnimes:[],
  movies:[],
  anime:[],
  animeEpisodes:[]
})
export const actions = {
  getTopAnimes ({commit}) {
    options.url = 'https://jikan1.p.rapidapi.com/top/anime/1/favorite'
    this.$axios.$request(options).then(function (res) {
      commit('updataTopAnimes',res.top)
    })
  },
  getAiringAnimes({commit}) {
    options.url = 'https://jikan1.p.rapidapi.com/top/anime/1/airing'
    this.$axios.$request(options).then(function (res) {
      commit('updateAiringAnimes',res.top)
    })
  },
  getUpcomingAnimes({commit}) {
    options.url = 'https://jikan1.p.rapidapi.com/top/anime/1/upcoming'
    this.$axios.$request(options).then(function (res) {
      commit('updateUpcomingAnimes',res.top)
    })
  },
  getMovies({commit}){
    options.url = 'https://jikan1.p.rapidapi.com/top/anime/1/movie'
    this.$axios.$request(options).then(function (res) {
      commit('updateMovies',res.top)
    })
  },
  getAnime({commit,dispatch},anime){
    options.url = `https://jikan1.p.rapidapi.com/search/anime?q=${anime}/`
    this.$axios.$request(options).then(function (res) {
      commit('updateAnime',res.results)
      dispatch('getAnimeEpisodes', res.results[0].mal_id)
    }).catch((error)=>{
      if(error.response.status === 503){
        dispatch('getAnime', anime)
      }
    })
  },
  clearAnimeDetails({commit}){
    commit('clearAnimeDetails')
  },
  getAnimeEpisodes({commit},id){
    options.url = `https://jikan1.p.rapidapi.com/anime/${id}/episodes`
    this.$axios.$request(options).then(function (res) {
      commit('updateAnimeEpisodes',res.episodes)
    })
  }
}
export const mutations = {
  updataTopAnimes(state,data) {
    state.topAnimes = data
  },
  updateAiringAnimes(state,data) {
    state.airingAnimes = data
  },
  updateUpcomingAnimes(state,data) {
    state.upcomingAnimes = data
  },
  updateMovies(state,data) {
    state.movies = data
  },
  updateAnime(state,data) {
    state.anime = data
  },
  clearAnimeDetails(state){
    state.anime = []
  },
  updateAnimeEpisodes(state,data){
    state.animeEpisodes = data
  }
}

