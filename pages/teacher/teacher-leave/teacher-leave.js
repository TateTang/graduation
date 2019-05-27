// pages/teacher/teacher-leave/teacher-leave.js
var util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    leavetime: [],
    leavestatus: [],
    index: 0,
    // rejectreason: [],
    title: '本课程暂无学生请假单信息',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var courseId = options.courseId; //接收传递过来的参数
    // console.log();
    wx.setNavigationBarTitle({ //设置导航栏标题
      title: '请假'
    })
    var leavetime = [];
    var leavestatus = [];
    // var rejectreason = [];
    var that = this;
    //获取请假信息 根据教师id 课程对应的编号 以及请假的状态
    wx.request({
      url: app.globalData.localhttp + '/leave/getAll',
      method: 'GET',
      data: {
        'teaopenId': app.globalData.openid,
        'status': 1, //已通过的请假申请
        'status2': 2, //驳回的申请
        'courseId': courseId
      },
      success: function(res) {
        var list = res.data.dataList; //获取数据
        // console.log(list);
        if (list.length == 0) {
          return;
        }
        for (var i = 0; i < list.length; i++) {
          leavetime.push(util.formatDateTwo(util.chaistr(list[i].leavetime)));
          if (list[i].status == 1) {
            leavestatus.push("已通过");
          } else if (list[i].status == 2) {
            leavestatus.push("未通过");
          }
        }
        that.setData({
          list: list,
          leavetime: leavetime,
          index: list.length,
          leavestatus: leavestatus,
          // rejectreason: rejectreason,
          title: '学生请假单信息',
        })
      },
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

  }
})