import Vue from "vue";

const state = {
  tempUrl: "",
  redLightSet: "",
  location: "",
  carmeraInfo: {
    Token1: "at.asil74d748b4v8hnc1ev37hxaaijbmgn-5q5evoesh8-1k6lbd0-seqlkhpkt", //球机北
    Token2: "at.asil74d748b4v8hnc1ev37hxaaijbmgn-5q5evoesh8-1k6lbd0-seqlkhpkt", //球机南
    Token3: "at.asil74d748b4v8hnc1ev37hxaaijbmgn-5q5evoesh8-1k6lbd0-seqlkhpkt", //枪机东
    Token4: "at.axp6z95f6aykxgnt39sbsjqt9sz735it-2dmp1baafu-1nzscrm-jsmlx0cgo", //枪机西
    deviceSerial1: "D51120977", //球机北
    deviceSerial2: "D54784144",  //球机南
    deviceSerial3: "D63945634",  //枪机东
    deviceSerial4: "D74887059"  //枪机西
  }
}



const getters = {
  getLocation(state) {
    return state.location;
  },
  getRedSet(state) {
    return state.redLightSet;
  },
  getCarmeraInfo(state) {
    return state.carmeraInfo;
  }
}

const actions = {
  _axiosPost(state, obj) {
    Vue.axios({
      method: "POST",
      url: obj.url,
      data: obj.data,
      async: false
    })
    .then(function (res) {
      if (res.data == "ok") {
        state.state.redLightSet = "OK";
        console.log(JSON.stringify(res.data));
      } else if (res.data.url) {
        state.state.location = res.data;
        console.log(res.data)
      }
    })
  },
  _axiosGet(state, url) {
    Vue.axios({
      method: "GET",
      url: url,
      async: false
    })
    .then(function (res) {
      console.log(res.data)
      if (typeof res.data == "object" && res.data.url) {
        if (state.state.tempUrl !== res.data.url) {
          state.state.tempUrl = res.data.url;
          state.state.location = res.data;
          console.log(res.data) 
        }
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
}