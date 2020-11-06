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
            <p v-if="current.trackDuration"> {{ datingTime }} / {{ current.trackDuration }}</p>
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
      dialog: false,
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

      this.current.audio.addEventListener('timeupdate', () => {
        console.log(this.current.audio.duration);
      });
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
    }
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
    indexPlaylist(val) {
      this.current.artist = this.playlist[val].artist;
      this.current.track = this.playlist[val].track;
      this.current.picture = this.playlist[val].picture;
      this.current.sound = new Audio(require("@/assets/"+this.playlist[val].url));
      this.current.currentTrackDuration = 0
      this.startSong();
      console.log(this.current.sound);
    }

  },
  created() {
    this.current.artist = this.playlist[this.indexPlaylist].artist;
    this.current.track = this.playlist[this.indexPlaylist].track;
    this.current.picture = this.playlist[this.indexPlaylist].picture
    this.current.sound = new Audio(require("@/assets/"+this.playlist[this.indexPlaylist].url));
  }
};
</script>
<style>
#dialog-playlist{
  color: white;
}
</style>