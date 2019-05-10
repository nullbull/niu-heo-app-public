var api = require('../../api.js');
export default Page({
  data: {
    '__code__': {
      readme: ''
    },

    addressList: [],
    user: ''
  },
  onShow() {
    this.onLoad();
  },
  onLoad() {
    var page = this;
    console.log('获取地址列表');
    let user = wx.getStorageSync('user');
    this.setData({
      user: user
    });
    let user_id = user.id;
    console.log(user.id);
    this.getAddress(user_id);
  },
  getAddress(user_id) {
    var page = this;
    wx.request({
      url: api.user.getMyAddresses + "/" + user_id,
      data: {
        '__code__': {
          readme: ''
        },

        user_id: user_id
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        page.setData({ addressList: res.data });
        wx.setStorageSync('addressList', res.data);
      }
    });
  },
  addAddress() {
    console.log('添加地址');
    wx.navigateTo({
      url: '/pages/addAddress/index?id=no'
    });
  },
  editAddress(event) {
    console.log('修改地址');
    // console.log(event);
    let idx = event.currentTarget.id;
    console.log(idx);
    wx.navigateTo({
      url: '/pages/addAddress/index?id=' + idx
    });
  },
  deleteAddress(event) {
    console.log('删除地址');
    // console.log(event);
    let address_id = event.currentTarget.id;
    let idx = event.currentTarget.dataset.idx;
    let user = wx.getStorageSync('user');
    let user_id = user.id;
    console.log(idx);
    console.log(address_id);
    var page = this;
    wx.request({
      url: api.user.delAddress + "/" + address_id,
      data: {
        '__code__': {
          readme: ''
        },

        addressId: address_id,
        user_id: user_id
      },
      method: 'GET',
      // header: {
      //   'Accept': 'application/json',
      //   'Authorization': 'Bearer ' + wx.getStorageSync('user').data.token
      // },
      success: function (res) {
        if (res.data == 1) {
          let addressList = page.data.addressList;
          for (let i = 0; i < addressList.length; i++) {
            if (i == idx) {
              addressList[i].id = 0;
              addressList.splice(i, 1);
            }
          }
          page.setData({
            addressList: addressList
          });
          wx.setStorageSync('addressList', addressList);
        } else {
          //console.log('设置默认地址失败');
          wx.showToast({
            title: '设置默认地址失败',
            duration: 1000,
            icon: 'none'

          });
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '异常错误',
          duration: 1000,
          icon: 'none'
        });
      }
    });
  },
  setDefaultAddress(event) {
    // console.log(event.currentTarget);
    console.log('设置默认地址');
    let address_id = event.currentTarget.id;
    let idx = event.currentTarget.dataset.idx;
    let user = wx.getStorageSync('user');
    let user_id = user.id;
    var page = this;
    wx.request({
      url: api.user.setDefaultAddress,
      data: {
        '__code__': {
          readme: ''
        },

        addressId: address_id,
        userId: user_id
      },
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + wx.getStorageSync('user').data.token
      },
      success: function (res) {
        if (res.data.length) {
          page.getAddress(user_id);
        } else {
          console.log('设置默认地址失败');
          wx.showToast({
            title: '设置默认地址失败',
            duration: 1000,
            icon: 'none'

          });
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '异常错误',
          duration: 1000,
          icon: 'none'

        });
      }
    });
  }
});