// pages/teacher/teacher-qiandao/teacher-qiandao.js\
var util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    satarttime: [],
    endtime: [],
    arrivetime: [],
    index: 0,
    status: [],
    showIndex: null,
    title: '暂无学生签到信息',

    //请假的信息
    leavelist:[],
    leavestatus:[],
    leavetime:[],
    leaveindex:0,
    showLeaveIndex:null,
    leavetitle: '暂无学生请假信息',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({ //设置导航栏标题
      title: '签到'
    })
    // console.log(options);
    var courseId = options.courseId;
    var satarttime = [];
    var endtime = [];
    var arrivetime = [];
    var status = [];
    var that = this;
    //获取全部签到信息
    wx.request({
      url: app.globalData.localhttp + '/arrive/getAll',
      method: 'GET',
      data: {
        'courseId': courseId
      },
      success: function(res) {
        var list = res.data.dataList; //获取数据
        if (list.length == 0) {
          return;
        }
        for (var i = 0; i < list.length; i++) {
          var stime = util.formatDateOne(util.chaistr(list[i].courseobj.startTime));
          var etime = util.formatDateOne(util.chaistr(list[i].courseobj.endTime));
          var atime = util.formatDateOne(util.chaistr(list[i].arrivetime));
          satarttime.push(stime);
          endtime.push(etime);
          arrivetime.push(atime);
          if (list[i].status == 0) {
            status.push("迟到");
          } else if (list[i].status == 1) {
            status.push("已签到");
          } else {
            status.push("旷课");
          }
        }
        that.setData({
          list: list,
          satarttime: satarttime,
          endtime: endtime,
          arrivetime: arrivetime,
          index: list.length,
          status: status,
          title: '学生签到信息 ' +list.length + '人已签到'
        })
        // var str = that.data.list.length + '人已签到'
        // wx.setNavigationBarTitle({ //设置导航栏标题
        //   title: str
        // })
      },
    })
    var leavetime =[];
    var leavestatus = [];
    //获取全部请假信息
    wx.request({
      url: app.globalData.localhttp + '/leave/getAll',
      method: 'GET',
      data: {
        'teaopenId': app.globalData.openid,
        // 'status': 0 //已经提交的 还没有具体的请假申请
        'courseId': courseId
      },
      success: function(res) {
        var leavelist = res.data.dataList; //获取数据
        if (leavelist.length == 0) {
          return;
        }
        for (var i = 0; i < leavelist.length; i++) {
          // leavetime.push(util.formatDateTwo(util.chaistr(leavelist[i].leavetime)));
          leavelist[i].leavetime = util.formatDateTwo(util.chaistr(leavelist[i].leavetime));
          if (leavelist[i].status == 1) {
            // leavestatus.push("已通过");
            leavelist[i].status = '已通过'
          } else if (leavelist[i].status == 2) {
            // leavestatus.push("未通过");
            leavelist[i].status = '未通过'
          } else if (leavelist[i].status == 0) {
            // leavestatus.push("已提交");
            leavelist[i].status = '已提交'
          }
        }
        that.setData({
          leavelist: leavelist,
          leaveindex: leavelist.length,
          leavetitle: '学生请假信息 ' + leavelist.length+ '人已请假'
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

  showLeaveBox: function(e) {
    // console.log(e)
    if (this.data.showLeaveIndex == e.currentTarget.dataset.leaveindex) {
      this.setData({
        showLeaveIndex: null
      })
    } else {
      this.setData({
        showLeaveIndex: e.currentTarget.dataset.leaveindex
      })
    }
  }
})