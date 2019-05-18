// pages/teacher/teacher-own/info-leave/info-leave.js
var util = require('../../../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    leavetime: [],
    leavestatus: [],
    index: 0,
    showIndex: null,
    leaveid: '',
    ishave: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({ //设置导航栏标题
      title: '请假审批'
    })
    var leavetime = [];
    var leavestatus = [];
    var that = this;
    //获取请假信息信息
    wx.request({
      url: app.globalData.localhttp + '/leave/getAll',
      method: 'GET',
      data: {
        'teaopenId': app.globalData.openid,
        'status': 0 //已经提交的 还没有具体的请假申请
      },
      success: function(res) {
        var list = res.data.dataList; //获取数据
        // console.log(list);
        if (list.length == 0) {
          that.setData({
            ishave: true
          })
          return;
        }
        for (var i = 0; i < list.length; i++) {
          leavetime.push(util.formatDateTwo(util.chaistr(list[i].leavetime)));
          if (list[i].status == 0) {
            leavestatus.push("已提交");
          }
        }
        that.setData({
          list: list,
          leavetime: leavetime,
          index: list.length,
          leavestatus: leavestatus
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

  },
  showBox: function(e) {
    // console.log(e)
    if (this.data.showIndex == e.currentTarget.dataset.index) {
      this.setData({
        showIndex: null
      })
    } else {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    }
  },
  pass: function(e) {
    // console.log(e.target.dataset.leaveid);
    var that = this;
    wx.showModal({
      title: '请假通过提示',
      content: '确定要通过\r\n[' + e.target.dataset.leavegrade + '-' + e.target.dataset.leavename + '-' + e.target.dataset.leaveaccount + ']的请假信息吗？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.localhttp + 'leave/updateStatus?leaveId=' + e.target.dataset.leaveid + '&status=1', //已通过
            data: {},
            method: 'PUT',
            success: function(res) {
              var url = 'info-leave'
              console.log(res);
              app.navigator(res, url, '请假审批成功');
            }
          })
        }
      }
    })
  },
  reject: function(e) {
    // console.log(e.target.dataset.leaveid);
    var leaveid = e.target.dataset.leaveid;
    this.setData({
      showModal: true,
      leaveid: leaveid
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  formSubmit: function(e) {
    var that = this;
    var formData = e.detail.value; //获取表单中的数据
    // console.log(leaveid);
    formData.status = 2; //申请驳回
    console.log(JSON.stringify(formData));
    var url = app.globalData.localhttp + 'leave/update' + "?leaveId=" + that.data.leaveid;
    wx.request({
      url: url,
      data: JSON.stringify(formData), //json转字符串
      method: 'PUT',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // var result = res.data.code;
        var url = 'info-leave';
        app.navigator(res, url, '请假驳回成功');
      }
    });
  },
})