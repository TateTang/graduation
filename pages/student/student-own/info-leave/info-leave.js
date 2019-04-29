// pages/student/sudent-own/info-leave/info-leave.js
const app = getApp();
var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: util.formatDate(new Date()),
    coursearray: [],//课程数组
    courseId: [],//课程id
    courseindex: 0,

    teacherarray: ['ss', 'xx', 'mm'],//老师数组
    teacherindex: 0,

    username:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '请假信息',
    })
    var that = this; 
    wx.request({
      url: app.globalData.localhttp + 'user/getUserByOpenId',
      data: {
        'openId': app.globalData.openid
      },
      method: 'GET',
      success: function (res) {
        var userdata = res.data.data;
        //console.log(userdata);
        that.setData({
          username:userdata.name
        })
        }
    });

    var courseNameArr = [];
    var courseIdArr = [];
    //获取课程名称信息
    wx.request({
      url: app.globalData.localhttp + '/course/getName',
      method: 'GET',
      data: {},
      success: function (res) {
        var list = res.data.dataList;//获取数据
        console.log(list);
        if (list == null) {
          var toastText = '获取数据失败' + res.data.msg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          })
        } else {
          for (var i = 0; i < list.length; i++) {
            courseNameArr.push(list[i].name);
            courseIdArr.push(list[i].id);
          }
          that.setData({
            coursearray: courseNameArr,//设置变量
            courseId: courseIdArr
          })
        }
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

  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTeacherChange: function (e) {
    this.setData({
      teacherindex: e.detail.value
    })
  },
  bindCourseChange: function (e) {
    this.setData({
      courseindex: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;//获取表单中的数据 //formData['roleobj.id'] = that.data.moldvalue;
    var leavetime = e.detail.value.leavetime + " 08:00:00";
    //var idData = { "id": that.data.gradeId[e.detail.value.gradeobj] };//json对象
    var courseobj = { 'id': that.data.courseId[that.data.courseindex]};
    var userobj = { 'openid': app.globalData.openid };
    formData.courseobj = courseobj;
    formData.leavetime = Date.parse(leavetime);//转换
    formData.userobj = userobj;
    formData.teachername = that.data.teacherarray[that.data.teacherindex];
    console.log(JSON.stringify(formData));//打印表单中的数据
    var url = app.globalData.localhttp + 'leave/create';
    wx.request({
      url: url,
      data: JSON.stringify(formData),//json转字符串
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var result = res.data.code;
        app.operator(result);
        if (result == '200') {//添加成功返回到班级信息界面
          setTimeout(function () {//2s后返回
            wx.redirectTo({
              url: '../../student-index', 
            })
          }, 1000)
        }
      }
    });
  }
})