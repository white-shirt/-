<template>
  <div class="demos">
    <div class="start" @click="start">开始</div>
    <div class="mask"></div>
    <canvas id="demosCanvas" :width="w + 'px'" :height="h + 'px'"></canvas>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "demos",
  props: ["curDemo"],
  data() {
    return {
      timer: null,
      canvasEle: "",
      ctx: "",
      w: "",
      h: "",
      demo1Point: [
        {"x": 0.55, "y": 0.79, "point": 26},
        {"x": 0.55, "y": 0.37, "point": 48},
        {"x": 0.60, "y": 0.23, "point": null},
        {"x": 0.45, "y": 0.12, "point": 16},
        {"x": 0.45, "y": 0.03, "point": null},
        {"x": 0.55, "y": 0.13, "point": 17}
      ],
      curPoint: { "x": 0.55, "y": 0.79 },
      curPointIndex: 0
    }
  },
  methods: {
    drawPoint(x, y) {
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.ctx.fillStyle = "red";
      this.ctx.beginPath();
      this.ctx.arc(x * this.w - 5, y * this.h - 5, 5, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.fill();
    },
    startCptPoint() {
      var prePoint = this.demo1Point[this.curPointIndex];
      var curPointobj = this.curPoint;
      var nextPoint = this.demo1Point[this.curPointIndex + 1];
      var preX = Math.floor(this.w * prePoint.x);
      var preY = Math.floor(this.h * prePoint.y);
      var curX = Math.floor(this.w * curPointobj.x);
      var curY = Math.floor(this.h * curPointobj.y);
      var nextX = Math.floor(this.w * nextPoint.x);
      var nextY = Math.floor(this.h * nextPoint.y);
      var targetDistance = Math.sqrt(Math.pow(nextX - preX, 2) + Math.pow(nextY - preY, 2));
      var curDistance = Math.sqrt(Math.pow(nextX - curX, 2) + Math.pow(nextY - curY, 2));
      if (curDistance <= 3) {
        // window.cancelAnimationFrame(this.curDistance);
        clearInterval(this.timer);
        return;
      }
      var speed = curDistance / targetDistance * 10;
      console.log(curDistance, speed) 
      var targetDistanceX = nextX - preX;
      var targetDistanceY = nextY - preY;
      var ratio = targetDistanceX / targetDistanceY;
      this.curPoint.x = (curX + speed * ratio) / this.w;
      this.curPoint.y = (curY - speed) / this.h;
      // window.requestAnimationFrame(this.startCptPoint);
      this.drawPoint(this.curPoint.x, this.curPoint.y);
    },
    start() {
      var _this = this;
      this.timer = setInterval(function () {
        _this.startCptPoint(_this.demo1Point[0], _this.curPoint, _this.demo1Point[1]);
      }, 500)
    }
  },
  mounted() {
    this.canvasEle = document.getElementById("demosCanvas");
    this.ctx = this.canvasEle.getContext("2d");
    this.h = document.getElementsByClassName("demos")[0].offsetHeight;
    this.w = document.getElementsByClassName("demos")[0].offsetWidth;
  },
  computed: {
    ...mapGetters("_axios", {
      location: "getLocation"
    })
  },
  watch: {
    curDemo: {
      handler(newVal) {
        if (newVal == "demo1") {
          this.curPoint.x = this.demo1Point[0].x;
          this.curPoint.y = this.demo1Point[0].y;
        }
      },
      deep: true,
      immediate:true //数据首次更新触发
    }
  }
}
</script>

<style scoped>
.demos {
  position: absolute;
  width: 100%;
  height: 100%;
}

.start {
  position: absolute;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FFF;
  border-radius: 50%;
  cursor: pointer;
  z-index: 3;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(243, 243, 243, 0.3);
  z-index: 1;
}

#demosCanvas {
  position: absolute;
  z-index: 2;
}

</style>


