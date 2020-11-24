import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playlist: [
      {
        url: 'JUL - EN Y _ CLIP OFFICIEL _ D\'OR ET DE PLATINE _ 2015.mp3',
        picture: 'jul.jpg',
        artist: 'RRul',
        track: 'En Y !',
        favorite: false,
      },
      {
        url: 'JUL - EN Y _ CLIP OFFICIEL _ D\'OR ET DE PLATINE _ 2015.mp3',
        picture: 'jul.jpg',
        artist: 'Ju',
        track: 'EnY !',
        favorite: false,
      },
      {
        url: 'JUL - EN Y _ CLIP OFFICIEL _ D\'OR ET DE PLATINE _ 2015.mp3',
        picture: 'jul.jpg',
        artist: 'l',
        track: ' Y !',
        favorite: true,
      },
    ],
    isFavorite: false,
    isShowPlayList: false,
    item: {},
  },
  mutations: {
    ADD_TO_FAVORITE(state, key){
      state.playlist[key].favorite = true;
    },
    REMOVE_TO_FAVORITE(state, key){
      state.playlist[key].favorite = false;
    },
    CHECKED_IS_FAVORITE(state, isFavorite) {
      state.isFavorite = isFavorite;
    },
    SHOW_PLAYLIST(state, isShowPlaylist) {
      state.showPlayList = isShowPlaylist;
    },
    SET_ITEM(state, key){
      state.item = state.playlist[key];
    }
  },
  actions: {
    addToFavorite({commit}, payload){
      commit('ADD_TO_FAVORITE', payload);
    },
    removeToFavorite({commit}, payload){
      commit('REMOVE_TO_FAVORITE', payload);
    },
    isFavoriteCheck({commit}, isFavorite) {
      commit('CHECKED_IS_FAVORITE', isFavorite)
    },
    showPlaylist({commit}, isShowPlaylist) {
      commit('SHOW_PLAYLIST', isShowPlaylist)
    },
    setItem({commit}, key) {
      commit('SET_ITEM', key);
    }
  },
})
