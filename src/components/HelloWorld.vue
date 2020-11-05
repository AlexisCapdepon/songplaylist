<template>
  <v-container fluid>
    {{secondTiming}}
    <v-card
        class="mx-auto"
        max-width="350"
    >
      <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="250px"
      ></v-img>
      <v-row dense class="d-flex justify-center">
        <v-col class="d-flex justify-center flex-column align-center">
          <p class="pa-0 ma-0">{{morceau}}</p>
          <p class="pa-0 ma-0">{{artist}}</p>
          <p v-if="songTiming">  / {{songTiming}}</p>
        </v-col>
        <v-col class="d-flex justify-center align-center">
          <v-card-actions>
            <v-btn
                class="mx-2"
                fab
                dark
                small
                color="blue"
            >
              <v-icon dark>
                mdi-skip-backward
              </v-icon>
            </v-btn>

            <!-- play-->
            <v-btn
                v-if="!played"
                class="mx-2"
                fab
                dark
                small
                @click="startSong"
                color="blue"
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
                color="blue"
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
                color="blue"
            >
              <v-icon dark>
                mdi-skip-forward
              </v-icon>
            </v-btn>
            <v-row>
              <v-col>

              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-container>

</template>

<script>

export default {
  name: "HelloWorld",
  data: function () {
    return {
      sound: '',
      played: false,
      artist: 'Jul',
      morceau: 'En Y !',
      songTiming: '',
    }
  },
  methods: {
    startSong(){
      this.sound.play();
      this.secondTiming = this.sound.duration
      this.played = true
      this.ParsingTiming();
      this.songTiming = new Date(this.sound.duration * 1000).toISOString().substr(11, 8);
    },
    stopSong(){
      this.sound.pause();
      this.played = false
    },
    ParsingTiming() {
        let minutes = Math.floor(this.secondTiming / 60);
        let secs = this.secondTiming%60;
        let hours = Math.floor(minutes/60)
        minutes = minutes%60;
        this.duration = (`${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`);
    },
    pad(num) {
      return ("0"+num).slice(-2);
    },
  },
  computed: {},
  watch: {},
  created() {
    this.sound = new Audio(require("@/assets/JUL - EN Y _ CLIP OFFICIEL _ D'OR ET DE PLATINE _ 2015.mp3"));
  }
};
</script>
