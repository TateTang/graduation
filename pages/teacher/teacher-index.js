// pages/teacher/teacher.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowPage: "thirdPage",
    nowIndex: 2,
    tabBar: [
      {
        "iconClass": "iconfont icon-qiandao",
        "text": "签到",
        "tapFunction": "toFirst",
        "active": "active"
      },
      {
        "iconClass": "iconfont icon-gongzuotai",
        "text": "控制台",
        "tapFunction": "toSecond",
        "active": ""
      },
      {
        "iconClass": "iconfont icon-ziyuan",
        "text": "我的",
        "tapFunction": "toThird",
        "active": ""
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  toFirst() {
    this.setData({
      nowPage: "firstPage",
      nowIndex: 0
    })
  },
  toSecond() {
    this.setData({
      nowPage: "secondPage",
      nowIndex: 1
    })
  },
  toThird() {
    this.setData({
      nowPage: "thirdPage",
      nowIndex: 2
    })
  }
})