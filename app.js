var api = require("./api.js");
export default App({
  data: {
    today: {
      currentYear: "",
      currentMonth: "",
      currentDate: "",
      currentWeekday: ""
    },
    schoolList: ""
  },
  globalData: {
    hasLogin: false,
    userInfo: ""
  },
  onLaunch: function() {
    var that = this;
    let shoolList = wx.getStorageSync("schoolList");
    if (!shoolList.length) {
      var list = [{
        value: '1',
        title: '山东科技大学'
      }];
      wx.setStorageSync("schoolList", list);
    }
    this.setDate();
  },
  setDate() {
    let today = new Date();
    //console.log(today.getFullYear() + '年' + today.getMonth() + '月' + today.getDate() + '日')
    this.data.today.currentYear = today.getFullYear();
    this.data.today.currentMonth = today.getMonth() + 1;
    this.data.today.currentDate = today.getDate();
    let dateIndex = today.getDay();
    let weekday = ["日", "一", "二", "三", "四", "五", "六"];
    this.data.today.currentWeekday = weekday[dateIndex];
    wx.setStorageSync("today", this.data.today);
  }
});