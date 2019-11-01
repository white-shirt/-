<template>
  <div id="app">
    <div class="head">智能网联无人车教学平台</div>
    <div class="mp3">
      <playMp3></playMp3>
    </div>
    <div class="flowBox" v-if="curFlow !== ''">
      <div class="closeFlow" @click="closeFlow">
        <img :src="closePic" style="position: absolute; top: 0; left: 0; display: block; width:100%; height: 100%" />
      </div>
      <img :src="noticeBg" style="position: absolute; top: 0; left: 0; display: block; width:100%; height: 100%" />
      <component :is="curFlow" v-on:changeBg="onChangeBg"></component>
    </div>
    <div class="content">
      <div class="videoWrap">
        <videoBox></videoBox>
      </div>
      <div class="rightBtn">
        <div class="mapBgBox">
          <img class="mapBg" :src="mapBg" />
          <div class="mapBox">
            <img class="map" :src="map" />
            <div class="trafficBtn">
              <img class="tBtn tBtn1" :src="trafficLight" @click="trafficControl" />
              <img class="tBtn tBtn2" :src="trafficLight" @click="trafficControl" />
              <img class="tBtn tBtn3" :src="trafficLight" @click="trafficControl" />
              <img class="tBtn tBtn4" :src="trafficLight" @click="trafficControl" />
              <img class="tBtn tBtn5" :src="trafficLight" @click="trafficControl" />
              <img class="tBtn tBtn6" :src="trafficLight" @click="trafficControl" />
            </div>
            <div class="CarPosition">
              <span :class="['pos pos1', curPos == 15 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos2', curPos == 16 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos3', curPos == 17 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos4', curPos == 18 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos5', curPos == 48 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos6', curPos == 50 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos7', curPos == 49 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos8', curPos == 51 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos9', curPos == 53 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos10', curPos == 27 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos11', curPos == 52 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos12', curPos == 26 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos13', curPos == 14 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos14', curPos == 25 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos15', curPos == 24 ? 'posRED' : 'posFFF']"></span>
              <span :class="['pos pos16', curPos == 19 ? 'posRED' : 'posFFF']"></span>
              <span class="park park1">P1</span>
              <span class="park park2">P2</span>
              <span class="park park3">P3</span>
              <span class="ETC ETCwest">西ETC</span>
              <span class="ETC ETCeast">东ETC</span>
            </div>
            <div class="demoPosition" v-if="demoShow">
              <demos :curDemo="curDemo"></demos>
            </div>
            <div class="demoBtnBox">
              <div class="demoBtn demo1" @click="demo('demo1')"><img class="demoImg" :src="demo1" /></div>  
              <div class="demoBtn demo2" @click="demo('demo2')"><img class="demoImg" :src="demo2" /></div>  
              <div class="demoBtn demo3" @click="demo('demo3')"><img class="demoImg" :src="demo3" /></div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mapBg from "./assets/map_bg.png";
import map from "./assets/map.png";
import trafficLight from "./assets/trafficLight.png";
import normalBg from "./assets/normalBg.png";
import normalclose from "./assets/normalclose.png";
import parkBg from "./assets/parkBg.png";
import parkclose from "./assets/parkclose.png";
import ETCBg from "./assets/ETCBg.png";
import ETCclose from "./assets/ETCclose.png";
import demo1 from "./assets/demo1.png";
import demo2 from "./assets/demo2.png";
import demo3 from "./assets/demo3.png";


import { mapGetters } from "vuex";
import videoBox from "./components/videoBox.vue";
import trafficLightCpt from "./components/trafficLight.vue";
import capture from "./components/capture.vue";
import demos from "./components/demos.vue";
import playMp3 from "./components/playMp3.vue";

export default {
  name: 'app',
  data() {
    return {
      mapBg, map, trafficLight, normalBg, normalclose, parkBg, parkclose, ETCBg, ETCclose, demo1, demo2, demo3,
      curFlow: "",
      timer: "",
      curPos: "",
      noticeBg: "",
      closePic: "",
      curDemo: "",
      demoShow: false
    }
  },
  components: { videoBox, trafficLightCpt, capture, demos, playMp3 },
  methods: {
    trafficControl() {
      this.curFlow = trafficLightCpt;
    },
    closeFlow() {
      this.curFlow = "";
    },
    onChangeBg(val) {
      if (val == "normal") {
        this.noticeBg = normalBg;
        this.closePic = normalclose;
      }
      if (val == "park") {
        this.noticeBg = parkBg;
        this.closePic = parkclose;
      }
      if (val == "ETC") {
        this.noticeBg = ETCBg;
        this.closePic = ETCclose;
      }
    },
    demo(val) {
      console.log(val);
      this.demoShow = true;
      this.curDemo = val;
    }
  },
  mounted: function () {
    var _this = this;
    clearInterval(_this.timer);
    _this.timer = setInterval(function () {
      _this.$store.dispatch("_axios/_axiosGet", "http://10.1.1.203:8080/interface");
    },1000);
  },
  computed: {
    ...mapGetters("_axios", {
      AxiosCapData: "getLocation"
    })
  },
  watch: {
    'AxiosCapData.url': {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.curFlow = capture;
          this.curPos = this.AxiosCapData.where;
        }
      },
      deep: true
    }
  }
}
</script>

<style>
html,body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background: rgb(0, 8, 46);
  overflow: hidden;
}

* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.mp3 {
  position: absolute;
  width: 0;
  height: 0;
}

.head {
  flex-shrink: 0;
  width: 100%;
  height: 120px;
  font-size: 35px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  line-height: 120px;
}

.flowBox {
  position: absolute;
  width: 45vw;
  height: 23.8vw;
  min-width: 600px;
  min-height: 317px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.closeFlow {
  position: absolute;
  width: 65px;
  height: 65px;
  top: -30px;
  right: -50px;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 50px 100px 50px;
  box-sizing: border-box;
}

.videoWrap {
  flex-shrink: 0;
  width: 73%;
  height: 100%;
}

.rightBtn {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 400px;
  min-height: 609px;
  padding-left: 50px;
  font-size: 0;
  overflow: hidden;
}

.mapBgBox {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.mapBg {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  height: 100%;
}

.mapBox {
  position: absolute;
  width: 82%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.map {
  width: 100%;
  height: auto;
}

.trafficBtn, .CarPosition, .demoPosition {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.trafficBtn {
  z-index: 10;
}

.CarPosition {
  z-index: 8;
}

.demoPosition {
  z-index: 11;
}

.demoBtnBox {
  position: absolute;
  width: 100%;
  height: 70px;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 11;
}

.demoBtn {
  width: 20%;
  height: auto;
  cursor: pointer;
}

.demoImg {
  display: block;
  width: 100%;
  height: auto;
}

.tBtn {
  position: absolute;
  width: 12px;
  height: auto;
  cursor: pointer;
}

.tBtn1 {
  left: 37%;
  top: 49%;
}

.tBtn2 {
  right: 37%;
  top: 49%;
}

.tBtn3 {
  left: 37%;
  bottom: 36%;
}

.tBtn4 {
  right: 37%;
  bottom: 36%;
}

.tBtn5 {
  left: 37%;
  bottom: 24.5%;
}

.tBtn6 {
  right: 37%;
  bottom: 24.5%;
}

.pos {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.park {
  display: inline-block;
  position: absolute;
  font-size: 24px;
  font-weight: bolder;
  color: rgb(3, 81, 95);
}

.park1 {
  bottom: 24%;
  left: 25%;
}

.park2 {
  bottom: 20%;
  right: 33%; 
}

.park3 {
  top: 1%;
  right: 45%;
}

.ETC {
  position: absolute;
  color: yellow;
  font-size: 18px;
}

.ETCwest {
  top: 20%;
  left: 1%;
}

.ETCeast {
  top: 20%;
  right: 1%;
}

.posFFF {
  background: rgba(0, 0, 0, 0);
}

.posRED {
  background: red;
}

.posRED::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: 10px;
  height: 10px;
  transform-origin: center;
  transform: scale(1);
  border-radius: 50%;
  border: 1px solid red;
  box-sizing: border-box;
  animation: posMove 1s ease infinite;
}

@keyframes posMove {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(2.5);
  }
}

.pos1 {
  top: 8.1%;
  left: 24.2%;
}

.pos2 {
  top: 12%;
  left: 45%;
}

.pos3 {
  top: 13.5%;
  right: 45%;
}

.pos4 {
  top: 13%;
  right: 23.5%;
}

.pos5 {
  top: 37%;
  right: 45%;
}

.pos6 {
  top: 45%;
  right: 52%;
}

.pos7 {
  top: 65.5%;
  left: 23%;
}

.pos8 {
  top: 69.5%;
  left: 30%;
}

.pos9 {
  top: 65.5%;
  right: 30%;
}

.pos10 {
  top: 69.5%;
  right: 23%;
}

.pos11 {
  bottom: 19.5%;
  left: 45%;
}

.pos12 {
  bottom: 21%;
  left: 52%;
}

.pos13 {
  bottom: 20%;
  left: 14%;
}

.pos14 {
  bottom: 15%;
  left: 27.5%;
}

.pos15 {
  top: 62%;
  left: 2.5%;
}

.pos16 {
  top: 62%;
  right: 2.5%;
}

</style>
