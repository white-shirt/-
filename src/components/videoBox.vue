<template>
  <div class="videoBox">
    <div class="videoWrap">
      <div class="videoItem item1" v-if="CarmeraInfo">
        <iframe class="ysy1" :src="carmera_1"></iframe>
        <div class="carmeraControlBox">
          <carmeraControl :device="1"></carmeraControl>
        </div>
      </div>
      <div class="videoItem item2">
        <iframe class="ysy2" :src="carmera_2"></iframe>
        <div class="carmeraControlBox">
          <carmeraControl :device="2"></carmeraControl>
        </div>
      </div>
      <div class="videoItem item3">
        <iframe class="ysy3" :src="carmera_3"></iframe>
        <div class="carmeraControlBox">
          <carmeraControl :device="4"></carmeraControl>
        </div>
      </div>
      <div class="videoItem item4">
        <iframe class="ysy4" :src="carmera_4"></iframe>
        <div class="carmeraControlBox">
          <carmeraControl :device="3"></carmeraControl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carmeraControl from "./carmeraControl";
import { mapGetters } from "vuex";

export default {
  name: 'videoBox',
  data() {
    return {
      carmera_1: "",
      carmera_2: "",
      carmera_3: "",
      carmera_4: "",
    }
  },
  components: { carmeraControl },
  methods: {

  },
  created() {
    this.carmera_1 = "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/" + this.CarmeraInfo.deviceSerial1 + "/1.hd.live&autoplay=1&accessToken=" + this.CarmeraInfo.Token1;
    this.carmera_2 = "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/" + this.CarmeraInfo.deviceSerial2 + "/1.hd.live&autoplay=1&accessToken=" + this.CarmeraInfo.Token2;
    this.carmera_3 = "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/" + this.CarmeraInfo.deviceSerial3 + "/1.hd.live&autoplay=1&accessToken=" + this.CarmeraInfo.Token3;
    this.carmera_4 = "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/" + this.CarmeraInfo.deviceSerial4 + "/1.hd.live&autoplay=1&accessToken=" + this.CarmeraInfo.Token4;
  },
  computed: {
    ...mapGetters("_axios", {
      CarmeraInfo: "getCarmeraInfo"
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .videoBox {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .videoWrap {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .videoItem {
    position: absolute;
    width: 49%;
    height: 49%;
  }

  .item1 {
    top: 0;
    left: 0;
  }

  .item2 {
    top: 0;
    right: 0;
  }

  .item3 {
    bottom: 0;
    left: 0;
  }

  .item4 {
    bottom: 0;
    right: 0;
  }

  .rightBar {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 3px 3px;
    box-sizing: border-box;
  }

  .ysy1, .ysy2, .ysy3, .ysy4 {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: none;
    overflow: hidden;
  }

  .head {
    flex-shrink: 0;
    width: 100%;
    height: 90px;
    font-size: 20px;
    font-weight: bolder;
    color: #fff;
    text-align: center;
    line-height: 90px;
    background: rgb(53, 53, 53);
    border-radius: 20px;
  }

  .BtnBox {
    width: 100%;
    height: 100%;
    margin-top: 3px;
    margin-bottom: 3px;
    border: 2px solid #555;
    border-radius: 20px;
    box-sizing: border-box;
  }

  .captureBox {
    flex-shrink: 0;
    width: 100%;
    height: 50%;
    border: 2px solid #555;
    box-sizing: border-box;
    border-radius: 20px;
    overflow: hidden;
  }

  .capPic {
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    line-height: 50px;
    background: rgb(53, 53, 53);
  }

  .carmeraControlBox {
    position: absolute;
    width: auto;
    height: auto;
    overflow: hidden;
    bottom: 20px;
    right: 20px ;
  }

</style>
