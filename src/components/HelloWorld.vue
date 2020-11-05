<template>
  <v-container fluid>
    <v-card
        class="mx-auto"
        max-width="350"
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

          <v-btn
              icon
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>
      </v-img>

      <v-card-text>
        <v-row dense class="d-flex justify-center">
          <v-col class="d-flex justify-center flex-column align-center">
            <p class="pa-0 ma-0">{{ current.track }}</p>
            <p class="pa-0 ma-0">{{ current.artist }}</p>
            <p v-if="current.trackDuration"> {{ datingTime }} / {{ current.trackDuration }}</p>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-card-actions>
              <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  @click="backSong"
              >
                <v-icon>
                  mdi-skip-backward
                </v-icon>
              </v-btn>

              <!-- play-->
              <v-btn
                  v-if="!played"
                  class="mx-2"
                  fab
                  small
                  @click="startSong"
              >
                <v-icon>
                  mdi-play
                </v-icon>
              </v-btn>

              <v-btn
                  v-else
                  class="mx-2"
                  fab
                  dark
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
                  dark
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
    </v-card>
  </v-container>

</template>

<script>

export default {
  name: "HelloWorld",
  data: function () {
    return {
      played: false,
      indexPlaylist: 0,
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
        picture: '',
        track: '',
        trackDuration: '',
        interval: null,
        currentTrackDuration: 0,
      }
    }
  },
  methods: {
    startSong(){
      this.current.sound.play();
      this.seekUpdate();
      this.played = true;
      this.current.trackDuration = new Date(this.current.sound.duration * 1000).toISOString().substr(11, 8);
    },
    stopSong(){
      this.current.sound.pause();
      this.played = false
      clearInterval(this.current.interval);
    },
    seekUpdate() {
      this.current.interval = setInterval(() => {
       this.current.currentTrackDuration += 1
      }, 1000);
    },
    nextSong() {
      this.indexPlaylist += 1;
      if (this.indexPlaylist >= this.playlist.length) {
        this.indexPlaylist -= 1;
      }
      this.current.artist = this.playlist[this.indexPlaylist].artist;
      this.current.track = this.playlist[this.indexPlaylist].track;
      this.current.sound = new Audio(require("@/assets/"+this.playlist[this.indexPlaylist].url));
    },
    backSong() {
      this.indexPlaylist -= 1;
      if (this.indexPlaylist < 0 ) {
        this.indexPlaylist += 1;
      }
      this.current.artist = this.playlist[this.indexPlaylist].artist;
      this.current.track = this.playlist[this.indexPlaylist].track;
      this.current.picture = this.playlist[this.indexPlaylist].picture;
      this.current.sound = new Audio(require("@/assets/"+this.playlist[this.indexPlaylist].url));
    },
  },
  computed: {
    datingTime: function () {
      return new Date(this.current.currentTrackDuration * 1000).toISOString().substr(11, 8);
    }
  },
  watch: {
    currentTrackDuration(val) {
      if (val > this.current.sound.duration) {
        clearInterval(this.current.interval);
        this.current.trackDuration = 0;
        this.played = false;
      }
    },
  },
  created() {
    this.current.artist = this.playlist[this.indexPlaylist].artist;
    this.current.track = this.playlist[this.indexPlaylist].track;
    this.current.picture = this.playlist[this.indexPlaylist].picture
    this.current.sound = new Audio(require("@/assets/"+this.playlist[this.indexPlaylist].url));
  }
};
</script>
