// pages/teacher/teacher-own/info-course/info-course.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //课程信息
    list: [],
    ishave: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '课程管理',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    //获取班级名称
    var that = this;
    wx.request({
      url: app.globalData.localhttp + 'course/getAll',
      method: 'GET',
      data: {
        'teaopenId': app.globalData.openid
      },
      success: function(res) {
        var list = res.data.dataList; //获取数据
        if (list.length == 0) {
          that.setData({
            ishave: true
          })
        } else {
          that.setData({
            list: list, //设置变量
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 创建课程
   */
  addCourse: function(e) {
    wx.navigateTo({
      url: 'info-course-operation/info-course-operation?courseId=-1',
    })
  }
})