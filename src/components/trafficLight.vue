<template>
  <div class="trafficLightView">
    <div class="red light">
      <div class="redlightSign"></div>
      <div class="lightNum">
        <input type="number" v-model="redNum" @blur="onBlur" />
        <span>S</span>
      </div>
    </div>
    <div class="yellow light">
      <div class="yellowlightSign"></div>
      <div class="lightNum">
        <input class="disableInput" type="number" :placeholder="yellowNum" disabled="true" />
        <span>S</span>
      </div>
    </div>
    <div class="green light">
      <div class="greenlightSign"></div>
      <div class="lightNum">
        <input class="disableInput" type="number" :placeholder="redNum - 3" disabled="true" />
        <span>S</span>
      </div>
    </div>
    <div class="light setDone" @click="set">
      {{setText}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "trafficLightView",
  data() {
    return {
      redNum: 18,
      yellowNum: 3,
      greenNum: 15,
      setText: "OK",
      Timer: ""
    }
  },
  methods: {
    set() {
      clearTimeout(this.Timer);
      this.$store.dispatch("_axios/_axiosPost", {
        url: "http://10.1.1.203:8080/interface",
        data: "RedLightTime=" + this.redNum
      })
    },
    onBlur() {
      if (this.redNum < 4) {
        this.redNum = 4;
      } else if (this.redNum > 60) {
        this.redNum = 60;
      }
    }
  },
  computed: {
    ...mapGetters("_axios", {
      setResult: "getRedSet"
    })
  },
  watch: {
    setResult: {
      handler(val) {
        var _this = this;
        if(val == "OK") {
          this.setText = "Done";
          this.Timer = setTimeout(function () {
            _this.setText = "OK";  
          }, 2000);
        }
      }
    }
  }
}
</script>

<style scoped>
.trafficLightView {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 30%;
  height: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 30px;
  border: 3px solid #fff;
  box-sizing: border-box;
  background: rgb(0, 8, 46);
  border-radius: 40px;
}

.light {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: auto;
}

.redlightSign, .yellowlightSign, .greenlightSign {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.redlightSign {
  background: red;
}

.yellowlightSign {
  background: yellow;
}

.greenlightSign {
  background: green;
}

.lightNum {
  width: auto;
  height: 40px;
  color: #fff;
}

.lightNum input {
  width: 60px;
  height: 100%;
  overflow: hidden;
  outline-style: none;
  border: none;
  background: none;
  border-bottom: 2px solid #fff;
  font-size: 20px;
  color: #fff;
  box-sizing: border-box;
}

.lightNum span {
  font-size: 20px;
  font-weight: bolder;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.lightNum span {
  display: inline-block;
  margin-left: 10px;
}

.setDone {
  width: 80%;
  height: 40px;
  font-size: 20px;
  color: black;
  font-weight: bolder;
  border-radius: 12px;
  cursor: pointer;
  background: #fff;
}

</style>