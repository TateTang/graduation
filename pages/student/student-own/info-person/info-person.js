// pages/student/sudent-own/info-person/info-person.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    account: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人信息',
    })
    //  console.log(app.globalData.openid);
    var that = this;
    wx.request({
      url: app.globalData.localhttp + 'user/getUserByOpenId',
      data: {
        'openId': app.globalData.openid
      },
      method: 'GET',
      success: function (res) {
        var result = res.data.data;
        console.log(res);
        that.setData({
          name: result.name,
          account: result.account
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;//获取表单中的数据
    console.log(JSON.stringify(formData));

    wx.request({
      url: app.globalData.localhttp + 'user/update?openId=' + app.globalData.openid,
      data: JSON.stringify(formData),
      method: 'PUT',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log(res);
        var result = res.data.code;
        app.operator(result);
        if (result == '200') { //添加成功返回到班级信息界面
          setTimeout(function () { //2s后返回
            wx.redirectTo({
              url: '../../student-index',
            })
          }, 1000)
        }
      }
    })

  }
})