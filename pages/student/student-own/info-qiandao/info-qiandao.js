// pages/student/sudent-own/info-arrivetime/info-arrivetime.js
const app = getApp();
var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    arrivetime: [],
    status: [],
    actuallystarttime:[],
    actuallyendtime:[],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ //设置导航栏标题
      title: '我的签到'
    })
    var arrivetime = [];
    var status = [];
    var actuallystarttime = [];
    var actuallyendtime = [];
    var that = this;
    //获取请假信息信息
    wx.request({
      url: app.globalData.localhttp + '/arrive/getAll',
      method: 'GET',
      data: {
        'stuopenId': app.globalData.openid,
      },
      success: function (res) {
        var list = res.data.dataList; //获取数据
        // console.log(list);
        if (list == null) {
          return;
        }
        for (var i = 0; i < list.length; i++) {
          // console.log(util.formatTimeFive(Date.parse(list[i].arrivetime)));
          arrivetime.push(util.formatTimeFive(Date.parse(list[i].arrivetime)));
          actuallystarttime.push(util.formatTimeFive(Date.parse(list[i].courseobj.startTime)))
          actuallyendtime.push(util.formatTimeFive(Date.parse(list[i].courseobj.endTime)))
          if (list[i].status == 0) {
            status.push("迟到");
          } else if (list[i].status == 1) {
            status.push("签到");
          } else if (list[i].status == 2) {
            status.push("旷课");
          }
        }
        that.setData({
          list: list,
          arrivetime: arrivetime,
          actuallystarttime: actuallystarttime,
          actuallyendtime: actuallyendtime,
          index: list.length,
          status: status,
        })
      },
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

  }
})