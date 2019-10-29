<template>
  <div class="box" v-if="device !== 4">
    <!-- <div class="arrow up" v-if="device == 1" @click="up"></div>
    <div class="arrow down" v-if="device == 1" @click="down"></div> -->
    <div class="arrow left" v-if="device == 1 || device == 2" @click="left"></div>
    <div class="arrow right" v-if="device == 1 || device == 2" @click="right"></div>
    <div class="stop" v-if="device == 1 || device == 2" @click="stop"></div>
    <div class="capture" v-if="device == 3" @click="capture"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "carmeraControl",
  props: ["device"],
  data() {
    return {
      url: "https://open.ys7.com/api/lapp/device/ptz/start",
      Token: "",
      deviceSerial: ""
    }
  },
  methods: {
    up: function () {
      // this.$store.dispatch("_axios/_axiosPost", {
      //   url: this.url,
      //   data: "accessToken=" + this.carmeraInfo.Token1 + "&deviceSerial=" + this.carmeraInfo.deviceSerial1 + "&channelNo=1&direction=0&speed=1"
      // });
    },
    down: function () {
      // this.$store.dispatch("_axios/_axiosPost", {
      //   url: this.url,
      //   data: "accessToken=" + this.carmeraInfo.Token1 + "&deviceSerial=" + this.carmeraInfo.deviceSerial1 + "&channelNo=1&direction=1&speed=1"
      // });
    },
    left: function () {
      this.$store.dispatch("_axios/_axiosPost", {
        url: this.url,
        data: "accessToken=" + this.Token + "&deviceSerial=" + this.deviceSerial + "&channelNo=1&direction=2&speed=1"
      });
    },
    right: function () {
      this.$store.dispatch("_axios/_axiosPost", {
        url: this.url,
        data: "accessToken=" + this.Token + "&deviceSerial=" + this.deviceSerial + "&channelNo=1&direction=3&speed=1"
      });
    },
    stop: function () {
      console.log(this.device);
      this.$store.dispatch("_axios/_axiosPost", {
        url: "https://open.ys7.com/api/lapp/device/ptz/stop",
        data: "accessToken=" + this.Token + "&deviceSerial=" + this.deviceSerial + "&channelNo=1"
      });
    },
    capture: function () {
      this.$store.dispatch("_axios/_axiosPost", {
        url: "http://10.1.1.203:8080/interface",
        data: "facereco=1"
      });
    }
  },
  created() {
    if (this.device == 1) {
      this.Token = this.carmeraInfo.Token1;
      this.deviceSerial = this.carmeraInfo.deviceSerial1;
    } else if (this.device == 2) {
      this.Token = this.carmeraInfo.Token2;
      this.deviceSerial = this.carmeraInfo.deviceSerial2;
    }
  },
  computed: {
    ...mapGetters("_axios", {
      carmeraInfo: "getCarmeraInfo"
    })
  }
}
</script>

<style scoped>
  .box {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgb(6, 124, 191);
  }

  .arrow {
    position: absolute;
    width:0;
    height:0;
    cursor: pointer;
  }

  .up {
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    border-left:12px solid transparent;
    border-right:12px solid transparent;
    border-bottom:12px solid #fff;
  }

  .down {
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    border-left:12px solid transparent;
    border-right:12px solid transparent;
    border-top:12px solid #fff;
  }

  .left {
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    border-bottom:12px solid transparent;
    border-top:12px solid transparent;
    border-right:12px solid #fff;
  }

  .right {
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    border-bottom:12px solid transparent;
    border-top:12px solid transparent;
    border-left:12px solid #fff;
  }

  .stop {
    position: absolute;
    width: 15px;
    height: 15px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    cursor: pointer;
  }

  .capture {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
  }
</style>


