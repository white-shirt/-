<template>
  <div class="captureView">
    <div class="captureImg" v-if="AxiosCapData">
      <div class="imgBox">
        <img @load="ImgLoad" class="ImgItem" :src="capData.url" />
        <div v-if="AxiosCapData.location.width" :style="{width: capData.location.width + 'px', height: capData.location.height + 'px', top: capData.location.y + 'px', left: capData.location.x + 'px'}" class="mask"></div>
        <div class="captureInfo">
          <div v-if="isNormalCapture" class="infoItem word">车牌号:{{AxiosCapData.word || "未识别到车牌"}}</div>
          <div v-if="isNormalCapture" class="infoItem where">拍摄地点:{{posName[AxiosCapData.where] || "位置错误"}}</div>
          <div v-if="isParkCapture" class="infoItem">车牌号:鄂A12345</div>
          <div v-if="isParkCapture" class="infoItem">停车场:{{parkStatus.park}}</div>
          <div v-if="isParkCapture" class="infoItem">状态:{{parkStatus.status}}</div>
          <div v-if="isParkCapture && parkStatus.status == '驶出'" class="infoItem">停车时长:{{parseInt((parkStatus.leftTime - parkStatus.enterTime) / 1000)}}秒</div>
          <div v-if="isParkCapture && parkStatus.status == '驶出'" class="infoItem">停车收费:{{parseInt((parkStatus.leftTime - parkStatus.enterTime) / 1000 * 0.8)}}元</div>
          <div v-if="isEtcCapture" class="infoItem">ETC:{{ETCStatus.ETC}}</div>
          <div v-if="isEtcCapture" class="infoItem">状态:{{ETCStatus.status}}</div>
          <div v-if="isEtcCapture && ETCStatus.status == '驶出'" class="infoItem">进入时长:{{parseInt((ETCStatus.leftTime - ETCStatus.enterTime) / 1000)}}秒</div>
          <div v-if="isEtcCapture && ETCStatus.status == '驶出'" class="infoItem">收费:{{parseInt((ETCStatus.leftTime - ETCStatus.enterTime) / 1000 * 1.5)}}元</div>
          <div v-if="isFace" class="infoItem face">
            <div v-if="AxiosCapData.location.width">
              <span class="faceInfoItem">人脸识别成功</span>
              <span class="faceInfoItem">性别:{{AxiosCapData.gender.value == "male" ? "男" : "女"}}</span>
              <span class="faceInfoItem">年龄:{{AxiosCapData.age.value}}</span>
              <span class="faceInfoItem">眼镜:{{AxiosCapData.glass.has == false ? "无" : "有"}}</span>
            </div>
            <span v-if="!AxiosCapData.location.width">人脸识别失败</span>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import testPic from "../assets/test.png";

export default {
  name: "captureView",
  data() {
    return {
      testPic,
      capData: {

      },
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
      normalCapturePosition: ["26", "48", "50", "52", "49", "51", "27", "53"],
      parkCapturePosition: ["16", "17", "14", "25"],
      EtcCapturePosition: ["15", "18", "24", "19"],
      isFace: false,
      isNormalCapture: false,
      isParkCapture: false,
      isEtcCapture: false,
      parkStatus: { park: "", status: "", enterTime: "", leftTime: "" },
      ETCStatus: { ETC: "", status: "", enterTime: "", leftTime: "" }
    }
  },
  methods: {
    ImgLoad() {
      if (this.AxiosCapData.url) {
        var img = new Image();
        img.src = this.AxiosCapData.url;
        var imgEle = document.getElementsByClassName("ImgItem")[0];
        var imgEleWidth = imgEle.offsetWidth;
        var imgWidth = img.width;
        var ratio = imgEleWidth / imgWidth;
        if (this.AxiosCapData.location.width) {
          for (var key in this.AxiosCapData.location) {
            this.capData.location[key] = Math.round(this.AxiosCapData.location[key] * ratio);
          }
        }
      }
    }
  },
  created() {
    this.capData = this.AxiosCapData;
  },
  computed: {
    ...mapGetters("_axios", {
      AxiosCapData: "getLocation"
    })
  },
  watch: {
    'AxiosCapData.where': {
      handler(newVal, oldVal) {
        var _this = this;
        var where = _this.AxiosCapData.where;
        var NewDate = new Date();
        if (newVal !== oldVal) {
          _this.capData = _this.AxiosCapData;
          if (_this.AxiosCapData.isface) {
            _this.isFace = true;
            _this.isNormalCapture = false;
            _this.isParkCapture = false;
            _this.isEtcCapture = false;
            _this.$emit("changeBg", "normal");
          }
          if (_this.normalCapturePosition.indexOf(where) !== -1) {
            _this.isFace = false;
            _this.isNormalCapture = true;
            _this.isParkCapture = false;
            _this.isEtcCapture = false;
            _this.$emit("changeBg", "normal");
          }
          if (_this.parkCapturePosition.indexOf(where) !== -1) {
            _this.isFace = false;
            _this.isNormalCapture = false;
            _this.isParkCapture = true;
            _this.isEtcCapture = false;
            _this.AxiosCapData.url = _this.testPic;
            _this.$emit("changeBg", "park");
          }
          if (_this.EtcCapturePosition.indexOf(where) !== -1) {
            _this.isFace = false;
            _this.isNormalCapture = false;
            _this.isParkCapture = false;
            _this.isEtcCapture = true;
            // _this.AxiosCapData.url = _this.testPic;
            _this.$emit("changeBg", "ETC");
          }
          switch(where) {
            case "14":
              _this.parkStatus.park = "P1";
              _this.parkStatus.status = "驶入";
              _this.parkStatus.enterTime = NewDate.getTime();
            break;
            case "25":
              _this.parkStatus.park = "P1";
              _this.parkStatus.status = "驶出";
              _this.parkStatus.leftTime = NewDate.getTime();
            break;
            case "16":
              _this.parkStatus.park = "P3";
              _this.parkStatus.status = "驶入";
              _this.parkStatus.enterTime = NewDate.getTime();
            break;
            case "17":
              _this.parkStatus.park = "P3";
              _this.parkStatus.status = "驶出";
              _this.parkStatus.leftTime = NewDate.getTime();
            break;
            case "15":
              _this.ETCStatus.ETC = "ETC西";
              _this.ETCStatus.status = "驶入";
              _this.ETCStatus.enterTime = NewDate.getTime();
            break;
            case "24":
              _this.ETCStatus.ETC = "ETC西";
              _this.ETCStatus.status = "驶出";
              _this.capData.url = _this.testPic;
              _this.ETCStatus.leftTime = NewDate.getTime();
            break;
            case "18":
              _this.ETCStatus.ETC = "ETC东";
              _this.ETCStatus.status = "驶入";
              _this.ETCStatus.enterTime = NewDate.getTime();
            break;
            case "19":
              _this.ETCStatus.ETC = "ETC东";
              _this.ETCStatus.status = "驶出";
              _this.capData.url = _this.testPic;
              _this.ETCStatus.leftTime = NewDate.getTime();
            break;
          }
        }
      },
      deep: true,
      immediate:true //数据首次更新触发
    }
  }
}
</script>

<style scoped>
.captureView {
  position: relative;
  height: 70%;
  width: 100%;
  top: 50%;
  left: 0;
  padding-left: 20px;
  box-sizing: border-box;
  transform: translateY(-50%);
}

.captureImg {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.imgBox {
  position: relative;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ImgItem {
  float: left;
  display: block;
  width: auto;
  height: 100%;
  border: 2px solid #fff;
  box-sizing: border-box;
} 

.mask {
  position: absolute;
  background: rgba(255, 1, 1, 0.3);
  border: 1px solid red;
}

.captureInfo {
  float: left;
  width: auto;
  height: 100%;
  padding: 0 20px;
  font-size: 18px;
  color: #fff;
  text-align: left;
}

.infoItem {
  margin-bottom: 10px;
}

.faceInfoItem {
  display: block;
}
</style>