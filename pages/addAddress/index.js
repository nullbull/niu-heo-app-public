var api = require('../../api.js');
export default Page({
  data: {
    school: {
      value: 0,
      title: '请选择学校'
    },
    detail: '',
    leaveName: '',
    leavePhone: '',
    addressId: 0,
    locationId: '',
    locationName: "",
    // 选择区域  start
    area: {
      value: 0,
      title: '请选择区域'
    },
    multiArray: [
      ['A区', 'B区', 'C区', '教学区'],
      ['A1', 'A2', 'A3', 'A4', 'A5']
    ],
    objectMultiArray: [
      ['A1', 'A2', 'A3'],
      ['B1', 'B2', 'B3'],
      ['C1', 'C2', 'C3'],
      ['J1', 'J2', 'J3']
    ],
    valueMultiArray: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12]
    ],
    selectedArea: {
      title: ''
    },
    multiIndex: [0, 0]
    // 选择区域  end
  },
  watchConsignee: function(event) {
    this.setData({
      leaveName: event.detail.value
    });
  },
  watchTel: function(event) {
    this.setData({
      leavePhone: event.detail.value
    });
  },
  watchAddress: function(event) {
    this.setData({
      detail: event.detail.value
    });
  },
  onLoad(option) {
  
    let schoolList = wx.getStorageSync('schoolList');
    this.setData({
      startSites: schoolList
    });
    let currentSchool = wx.getStorageSync('currentSchool');
    if (currentSchool) {
      console.log(currentSchool);
      this.setData({
        school: currentSchool
      });
    }
    if (option.id != 'no') {
      console.log(option);
      let idx = option.id;
      let addressList = wx.getStorageSync('addressList');
      let address = addressList[idx];
      let address_id = this.data.addressId;
      this.setData({
        leaveName: address.leaveName,
        leavePhone: address.leavePhone,
        locationName: address.locationName,
        locationId: address.locationId,
        addressId: address.id,
        detail: address.detail
      });
    }
  },
  noSchool() {
    let school = wx.getStorageSync('schoolList');
    console.log('school list' + school.length);
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', this.data.startSites[e.detail.value]);
    // console.log(e);
    this.setData({
      school: this.data.startSites[e.detail.value]
    });
  },
  addAddress() {
    console.log(this.data.address_id);
    // console.log(this.data.address);
    let leaveName = this.data.leaveName;
    let leavePhone = this.data.leavePhone;
    let school = this.data.school;
    let detail = this.data.detail;
    let addressId = this.data.addressId;
    let locationId = this.data.locationId;
    let user = wx.getStorageSync('user');
    console.log(user);
    this.setData({
      user_id: user.id
    });
    let user_id = user.id;
    if (leavePhone == '' || leaveName == '' || school.title == '' || detail == '' || school.title == '请选择学校' || school.value == '0') {
      wx.showToast({
        title: '请填写相关信息',
        duration: 1000,
        mask: true,
        icon: 'none'
      });
      return;
    }
    if (!/1[3-8]\d{9}/.test(leavePhone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        duration: 1000,
        mask: true,
        icon: 'none'

      });
      return;
    }
    wx.request({
      url: api.user.saveAddress,
      data: {
        leavePhone: this.data.leavePhone,
        leaveName: this.data.leaveName,
        locationId: this.data.locationId,
        locationName: this.data.locationName,
        detail: this.data.detail,
        userId: this.data.user_id,
        id: this.data.addressId,
        status: 2
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data)
        if (res.data.data == 'ok') {
          wx.navigateBack({
            delta: 1
          });
          wx.setStorageSync('addressList', '');
        } else {
          wx.showToast({
            title: '操作失败',
            duration: 1000,
            icon: 'none'

          });
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '未知错误',
          duration: 1000,
          icon: 'none'

        });
      }
    });
  },
  // 区域改变事件
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    this.setData({
      selectedArea: {
        title: this.data.objectMultiArray[e.detail.value[0]][e.detail.value[1]]
      }
    })
    this.setData({
      locationId: this.data.valueMultiArray[e.detail.value[0]][e.detail.value[1]],
    })
    console.log(this.data.locationId)
  },
  bindMultiPickerColumnChange(e) {
    if (e.detail.column == 0) {
      var temp = [];
      temp[0] = this.data.multiArray[0];
      temp[1] = this.data.objectMultiArray[e.detail.value];
      // console.log(temp);
      this.setData({
        multiArray: temp
      })
    }
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    // 知道修改的列以后，就可以通过修改multiIndex中对应元素的值，然后再修改multiArray
  }
});