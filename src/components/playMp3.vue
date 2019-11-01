<template>
  <div class="playMp3">
    <audio ref="audio" :src="testUrl" autoplay></audio>
    <audio ref="bgm" :src="bgm" autoplay loop></audio>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import bgm from "../assets/audio/background_music.mp3";

export default {
  name: "playMp3",
  data() {
    return {
      testUrl: "",
      bgm,
      src: "",
      posName: {
        "14": "1号停车场入口",
        "15": "1号高速入口",
        "16": "3号停车场入口",
        "17": "3号停车场出口",
        "18": "2号高速入口",
        "19": "2号高速出口",
        "24": "1号高速出口",
        "25": "1号停车场出口",
        "26": "斑马线",
        "27": "斑马线",
        "48": "转盘入口",
        "49": "斑马线",
        "50": "斑马线",
        "51": "斑马线",
        "52": "斑马线",
        "53": "斑马线"
      },
      token: "24.97ba8614212ac44fc6f29b52d5059ca3.2592000.1575094093.282335-17660926"
    }
  },
  methods: {

  },
  mounted() {
    var _this = this;
    this.$refs.bgm.volume = 0.3;
    this.$refs.audio.volume = 0.9;
    document.body.addEventListener('mousedown', function(){
      _this.$refs.bgm.play();
    }, false);
  },
  computed: {
    ...mapGetters("_axios", {
      AxiosCapData: "getLocation"
    })
  },
  watch: {
    "AxiosCapData.where": {
      handler(newval) {
        if (newval !== undefined) {
          var apiUrl = "http://tsn.baidu.com/text2audio"
          var text = this.posName[newval];
          text = encodeURI(encodeURI(text));
          this.testUrl = apiUrl + "?tex=" + text + "&lan=zh&cuid=17660926&ctp=1&aue=3&per=1&tok=" + this.token;
          this.$refs.audio.play();
        }
      },
      deep: true,
      immediate:true //数据首次更新触发
    }
  }
}
</script>

<style scoped>
.playMp3 {
  position: absolute;
  width: 0;
  height: 0;
  top: 0;
  left: 0;
}
</style>

