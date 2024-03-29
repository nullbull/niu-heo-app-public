var _api_root = "http://localhost:8004/";
var api = {
  index: _api_root + "default/index",
  user: {
    saveFormId: _api_root + "user/saveFormId",
    register: _api_root + "user/register",
    login: _api_root + "user/login",
    getUserInfo: _api_root + "user/getUserInfo", //查询与用户所有信息
    getMoblie: _api_root + "user/getMoblie",
    saveMoblie: _api_root + "user/saveMoblie",
    getTicket: _api_root + "ticket/getTicket",
    getMyAddresses: _api_root + "address/getByUser",
    setDefaultAddress: _api_root + "user/setDefaultAddress",
    delAddress: _api_root + "address/doDelete",
    editAddress: _api_root + "user/editAddress",
    saveAddress: _api_root + "address/saveAddress",
    getMyCoupons: _api_root + "user/getMyCoupons",
    isDriver: _api_root + "driver/get",
    ifSiJi: _api_root + "user/ifSiJi",
    uploadCardImg: _api_root + "other/uplode"
  },
  driver: {
    newDriver: _api_root + "driver/register",
    register: _api_root + "driver/register",
    getPassenger: _api_root + "boat/getByDriverId",
    passengerDetail: _api_root + "ticket/boatDetail"
  },
  bus: {
    newBus: _api_root + "boat/create",
    searchBus: _api_root + "boat/query",
    searchBus1: _api_root + "bus/searchBus1",
    searchBus2: _api_root + "bus/searchBus2",
    searchBus3: _api_root + "bus/searchBus3",
    searchBus4: _api_root + "bus/searchBus4",
    getBusInfo: _api_root + "bus/getBusInfo",
    changeStatus: _api_root + "bus/changeStatus"
  },
  order: {
    pay: _api_root + "ticket/create",
    payok: _api_root + "boat/makeOrder",
    confirmReceived: _api_root + "ticket/end"
  },
  other: {
    getSite: _api_root + "other/getSite",
    uploadImage: _api_root + "other/uploadImage",
    sendFeedback: _api_root + "other/sendFeedback",
    searchSchool: _api_root + "other/searchSchool",
    selectAllSchool: _api_root + "other/selectAllSchool"
  }
};
module.exports = api;