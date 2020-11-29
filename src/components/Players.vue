<template>
  <v-container fluid class="d-flex justify-center">
    <v-card
        class="mx-auto"
        max-width="350"
        data-app
    >
      <v-img
          height="200px"
          :src="require('../assets/' + current.picture)"
          alt="currentTrackSong"
      >
        <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
        >
          <v-spacer/>
          <playlist-dialog :filter-list="filterList" :is-favorite="isFavorite"/>
        </v-app-bar>
      </v-img>

      <v-card-text>
        <v-row dense class="d-flex justify-center">
          <v-col class="d-flex justify-center flex-column align-center">
           <KnobControl :min="0" :max="1" :stepSize="0.01" v-model="current.volume" @input="updateVolume" ></KnobControl>
          </v-col>
          <v-col class="d-flex justify-center flex-column align-center">
            <p class="pa-0 ma-0">{{ current.track }}</p>
            <p class="pa-0 ma-0">{{ current.artist }}</p>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-card-actions>
              <v-btn
                  class="mx-2"
                  fab
                  small
                  @click="backSong"
              >
                <v-icon>
                  mdi-skip-backward
                </v-icon>
              </v-btn>

              <!-- play-->
              <v-btn
                  v-if="!isPlay"
                  class="mx-2"
                  fab
                  small
                  @click="playSong"
              >
                <v-icon>
                  mdi-play
                </v-icon>
              </v-btn>

              <v-btn
                  v-else
                  class="mx-2"
                  fab
                  small
                  @click="stopSong"
              >
                <v-icon>
                  mdi-pause
                </v-icon>
              </v-btn>

              <!--stop -->
              <v-btn
                  class="mx-2"
                  fab
                  small
                  @click="nextSong"
              >
                <v-icon>
                  mdi-skip-forward
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-text>
      <v-progress-linear height="5" style="background-color: red" v-model="trackProgression" />
      <p v-if="current.trackDuration"> {{ current.currentTrackDuration }} / {{ current.trackDuration }}</p>
    </v-card>
  </v-container>

</template>

<script>
import KnobControl from 'vue-knob-control';
import {mapState} from 'vuex';
import PlaylistDialog from "@/components/PlaylistDialog";

export default {
  name: "HelloWorld",
  components:{PlaylistDialog, KnobControl},
  data: function () {
    return {
      isPlay: false,
      indexPlaylist: 0,
      dialog: false,
      player: new Audio(),
      current: {
        sound: '',
        artist: '',
        volume: 0.5,
        picture: '',
        track: '',
        trackDuration: '',
        currentTrackDuration: 0,
        playerTimer: 0,
      }
    }
  },
  methods: {
    playSong(){
      if (typeof this.current.sound !== undefined) {
        this.isPlay = false
        this.player.src = this.current.sound;
      }
      this.player.play();
      this.isPlay = true;
      this.listenersWhenPlay();
    },
    listenersWhenPlay() {
      this.player.addEventListener("timeupdate", () => {
        this.current.playerTimer = this.player.currentTime;
        this.current.trackDuration = this.formatTimer(this.player.duration);
        this.current.currentTrackDuration = this.formatTimer(this.current.playerTimer);
        this.current.percent = (this.current.playerTimer * 100) / this.current.trackDuration;
        this.isPlaying = true;
      });
      this.player.addEventListener(
          "ended",
          function() {
            this.nextSong();
          }.bind(this)
      );
    },
    formatTimer(seconds) {
      let minutes = parseInt(seconds / 60).toString();
      seconds = parseInt(seconds % 60).toString();

      let output = minutes >= 10 ? `${minutes}` : `0${minutes}`;
      output += seconds >= 10 ? `:${seconds}` : `:0${seconds}`;

      return output;
    },
    stopSong(){
      this.player.pause();
      this.isPlay = false
    },
    nextSong() {
      this.indexPlaylist += 1;
      if (this.indexPlaylist >= this.playlist.length) {
        this.indexPlaylist -= 1;
      }
    },
    backSong() {
      this.indexPlaylist -= 1;
      if (this.indexPlaylist < 0 ) {
        this.indexPlaylist += 1;
      }
    },
    selectMusique(key) {
      this.indexPlaylist = key
      this.dialog = false
      this.playSong();
    },
    updateVolume () {
      this.player.volume = this.current.volume;
    },
  },
  computed: {
    ...mapState([
        "playlist",
        "isFavorite",
    ]),
    filterList() {
      if (this.isFavorite) {
        return (this.playlist.filter(item => (item.favorite === true) ));
      }
      return this.playlist;
    },
    trackProgression() {
      return (this.current.playerTimer / this.player.duration) * 100
    },
  },
  watch: {
    indexPlaylist(val) {
      this.current.artist = this.playlist[val].artist;
      this.current.track = this.playlist[val].track;
      this.current.picture = this.playlist[val].picture;
      this.current.sound = require("@/assets/"+this.playlist[val].url);
      this.current.currentTrackDuration = 0
      this.playSong();
    }
  },
  created() {
    this.current.artist = this.playlist[this.indexPlaylist].artist;
    this.current.track = this.playlist[this.indexPlaylist].track;
    this.current.picture = this.playlist[this.indexPlaylist].picture
    this.current.sound = require("@/assets/"+this.playlist[this.indexPlaylist].url);
  },
  destroyed() {
    this.stopSong();
  }
};
</script>
<style>
#dialog-playlist{
  color: white;
}
.container{
  display: flex;
  justify-content: center;
}
.v-progress-linear__background{
  opacity: 1;
  background-color: black;
}
</style>
