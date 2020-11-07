<template>
  <v-container fluid>
    <v-card
        class="mx-auto"
        max-width="350"
        data-app
    >
      <v-img
          height="200px"
          :src="require('../assets/' + current.picture)"
      >
        <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
        >
          <v-spacer></v-spacer>
          <v-dialog
              v-model="dialog"
              width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn

                  icon
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon id="dialog-playlist">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                Playlist
              </v-card-title>

              <v-list>
                <v-list-item
                    v-for="(item, key) in playlist"
                    :key="key"
                    @click="selectMusique(key)"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.track"/>
                    <v-list-item-subtitle v-text="item.artist"/>
                  </v-list-item-content>

                  <v-list-item-avatar>
                    <v-img
                        :src="require('../assets/' + item.picture)"
                    />
                  </v-list-item-avatar>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-app-bar>
      </v-img>

      <v-card-text>
        <v-row dense class="d-flex justify-center">
          <v-col class="d-flex justify-center flex-column align-center">
            <p class="pa-0 ma-0">{{ current.track }}</p>
            <p class="pa-0 ma-0">{{ current.artist }}</p>
            <p v-if="current.trackDuration"> {{ current.currentTrackDuration }} / {{ current.trackDuration }}</p>
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
      <v-slider
          color="lime accent-4"
          track-color="blue-grey darken-4"
          :max="current.trackDuration"
          :v-model="current.currentTrackDuration"
      />
      <v-slider v-model="current.volume" @input="updateVolume" max="1" step="0.01"></v-slider>
      {{  currentVolume }}
    </v-card>
  </v-container>

</template>

<script>

export default {
  name: "HelloWorld",
  data: function () {
    return {
      isPlay: false,
      indexPlaylist: 0,
      dialog: false,
      player: new Audio(),
      playlist: [
        {
          url: 'JUL - EN Y _ CLIP OFFICIEL _ D\'OR ET DE PLATINE _ 2015.mp3',
          picture: 'jul.jpg',
          artist: 'RRul',
          track: 'En Y !',
        },
        {
          url: 'JUL - EN Y _ CLIP OFFICIEL _ D\'OR ET DE PLATINE _ 2015.mp3',
          picture: 'jul.jpg',
          artist: 'Ju',
          track: 'EnY !',
        },
        {
          url: 'JUL - EN Y _ CLIP OFFICIEL _ D\'OR ET DE PLATINE _ 2015.mp3',
          picture: 'jul.jpg',
          artist: 'l',
          track: ' Y !',
        },
      ],
      current: {
        sound: '',
        artist: '',
        volume: 0.5,
        picture: '',
        track: '',
        trackDuration: '',
        interval: null,
        currentTrackDuration: 0,
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
        let playerTimer = this.player.currentTime;
        this.current.trackDuration = this.formatTimer(this.player.duration);
        this.current.currentTrackDuration = this.formatTimer(playerTimer);
        this.current.percent = (playerTimer * 100) / this.current.trackDuration;
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
    currentVolume() {
      return this.current.volume * 100 + '%'
    }
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
  }
};
</script>
<style>
#dialog-playlist{
  color: white;
}
</style>