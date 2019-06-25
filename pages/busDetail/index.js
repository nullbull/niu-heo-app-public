var api = require("../../api.js");
export default Page({
  data: {
    ticketList: "",
    user: ""
  },
  onLoad(option) {
    var that = this;
    let user = wx.getStorageSync("user");
    let bus_id = option.id;
    console.log(bus_id);
    this.setData({
      user: user
    });
    wx.request({
      url: api.driver.passengerDetail + "/" + bus_id,
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.length) {
          let bus = res.data;
          for (var i = 0; i < bus.length; i++) {
            if (bus[i].packageType == 1) {
              bus[i].type = "小件";
            } else if (bus[i].packageType == 2) {
              bus[i].type = "中件";
            } else if (bus[i].packageType == 3) {
              bus[i].type = "大件";
            }
            if (bus[i].status == 3) {
              bus[i].received = "乘客已确认";
            } else {
              bus[i].received = "未确认收件";
            }
          }
          that.setData({
            ticketList: bus
          });
        }
      },
      fai: function () {
        wx.showToast({
          title: "通信异常,请稍后再试",
          icon: "none",
          duration: 1500
        });
      }
    });
  }
});