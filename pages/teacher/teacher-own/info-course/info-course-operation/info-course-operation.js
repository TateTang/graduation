// pages/teacher/teacher-own/info-course/info-course-operation/info-course-operation.js
import WxValidate from '../../../../../src/wx-validate/WxValidate.js'
const app = getApp();
var util = require('../../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starttime: "08:00", //开始时间
    endtime: "10:00", //结束时间
    // weekarray: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'], //星期数组
    // weekid: ['0', '1', '2', '3', '4', '5', '6'],
    gradearray: [], //班级数组
    gradeId: [], //班级id
    index: 0,
    gradeindex: 0,
    // isedit:false,//发布课程可改变，编辑课程除了课程名称其他都不能改变。


    courseId: -1,
    courseName: '',
    coursestarttime: '',
    courseendtime: '',
    courseyzm: '',
    coursegradename: '',
    addUrl: app.globalData.localhttp + 'course/create',
    updateUrl: app.globalData.localhttp + '/course/update',
    form: {
      name: '',
      phone: ''
    },
    pageType: true,
    operatortitle: '保存',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initValidate() //验证规则函数
    rules: {}
    messages: {}

    wx.setNavigationBarTitle({
      title: '课程信息',
    })
    //按钮设置
    if (options.courseId == -1) {
      this.setData({
        pageType: false,
        operatortitle: '发布'
      })
    }
    var that = this;
    var gradeNameArr = [];
    var gradeIdArr = [];
    //获取班级名称信息
    wx.request({
      url: app.globalData.localhttp + '/grade/getName',
      method: 'GET',
      data: {},
      success: function(res) {
        var list = res.data.dataList; //获取数据
        // console.log(list);
        // console.log(list.length);
        if (list.length == 0) {
          return;
        }
        for (var i = 0; i < list.length; i++) {
          gradeNameArr.push(list[i].name);
          gradeIdArr.push(list[i].id);
        }
        that.setData({
          gradearray: gradeNameArr, //设置变量
          gradeId: gradeIdArr
        })

      },
    })
    //var that = this; //页面初始化，options为页面跳转所带来的的参数
    //console.log(options.courseId);
    that.setData({
      courseId: options.courseId
    });
    if (options.courseId == -1) { //没有参数的时候 说明点击的是添加课程按钮,直接跳出   
      return;
    }
    // console.log(options.gradeId);
    //点击编辑按钮时，查询出单个的班级信息，可以修改
    wx.request({
      url: app.globalData.localhttp + '/course/getOne',
      data: {
        'courseId': options.courseId
      },
      method: 'GET',
      success: function(res) {
        console.log(res);
        // console.log(Date.parse(res.data.data.startTime));
        // console.log(util.formatTimeTwo(Date.parse(res.data.data.startTime)));
        // console.log(util.formatTimeTwo(Date.parse(res.data.data.endTime)));
        var course = res.data.data;
        if (course == undefined) {
          var toastText = '获取课程信息失败' + res.data.msg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({ //设置变量
            courseName: course.name,
            coursestarttime: util.formatDateThree(util.chaistr(course.startTime)),
            courseendtime: util.formatDateThree(util.chaistr(course.endTime)),
            coursegradename: course.gradeobj.name,
            courseyzm: course.yzm,
          });
        }
      }
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
  //改变选择框的时候 改变值
  bindStartTimeChange: function(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.data.coursestarttime != '') { //也就是说是编辑操作 所以改变的时候 当前值也要改变
      this.setData({
        coursestarttime: e.detail.value
      })
    }
    this.setData({
      starttime: e.detail.value
    })
  },
  bindEndTimeChange: function(e) {
    if (this.data.courseendtime != '') { //也就是说是编辑操作 所以改变的时候 当前值也要改变
      this.setData({
        courseendtime: e.detail.value
      })
    }
    this.setData({
      endtime: e.detail.value
    })
  },
  // bindWeekChange: function(e) {
  //   if (this.data.courseweek != '') { //也就是说是编辑操作 所以改变的时候 当前值也要改变
  //     this.setData({
  //       courseweek: this.data.weekarray[e.detail.value]
  //     })
  //   }
  //   this.setData({
  //     index: e.detail.value
  //   })
  // },
  bindGradeChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.data.coursegradename != '') { //也就是说是编辑操作 所以改变的时候 当前值也要改变
      this.setData({
        coursegradename: this.data.gradearray[e.detail.value]
      })
    }
    this.setData({
      gradeindex: e.detail.value
    })
  },
  formSubmit: function(e) {
    //校验表单
    const params = e.detail.value;
    var stime = util.formatDate(new Date()) + " " + e.detail.value.startTime;
    var etime = util.formatDate(new Date()) + " " + e.detail.value.endTime;

    let start = parseInt(new Date(stime.replace(/-/g, '/')).getTime());
    let end = parseInt(new Date(etime.replace(/-/g, '/')).getTime());
    if (end < start) {
      // console.log(1);
      wx.showModal({
        content: '选择的时间不合理，开始时间应小于结束时间',
        showCancel: false,
      })
      return false;
    }
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false;
    }
    var that = this;
    var formData = e.detail.value; //获取表单中的数据 //formData['roleobj.id'] = that.data.moldvalue;
    var idData = {
      "id": that.data.gradeId[e.detail.value.gradeobj]
    }; //json对象
    // console.log(idData);
    formData.gradeobj = idData;
    // formData.week = that.data.weekarray[e.detail.value.week]; //week value值
    formData.teacherobj = {
      'openid': app.globalData.openid
    };
    var startTime = util.formatDate(new Date()) + " " + e.detail.value.startTime;
    var endTime = util.formatDate(new Date()) + " " + e.detail.value.endTime;
    formData.startTime = Date.parse(startTime.replace(/-/g, '/')); //转换
    formData.endTime = Date.parse(endTime.replace(/-/g, '/'));
    console.log(JSON.stringify(formData)); //打印表单中的数据
    var url = that.data.addUrl; //添加课程信息的url
    var method = 'POST';
    if (that.data.courseId != -1) { //点击的是编辑按钮， 
      formData.id = that.data.courseId;
      url = that.data.updateUrl + "?courseId=" + that.data.courseId; //编辑按钮 修改课程信息
      formData.startTime = ''; //转换
      formData.endTime = '';
      console.log(JSON.stringify(formData)); //编辑的话时间不会修改
      method = 'PUT';
    }
    wx.request({
      url: url,
      data: JSON.stringify(formData), //json转字符串
      method: method,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // var result = res.data.code;
        var url = '../info-course'
        app.navigator(res, url, '操作成功');
      }
    });
  },
  deleteCourse: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除课程[' + e.target.dataset.coursename + ']吗？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.localhttp + '/course/delete/' + e.target.dataset.courseid,
            data: {},
            method: 'DELETE',
            success: function(res) {
              // var result = res.data.code;
              var url = '../info-course'
              app.navigator(res, url, '删除成功');
            }
          })
        }
      }
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true
      },
      gradeobj: {
        required: true
      },
      yzm: {
        required: true,
        minlength: 6,
        maxlength: 6
      }
    }
    const messages = {
      name: {
        required: '请输入课程名称'
      },
      gradeobj: {
        required: '请选择班级，如没有班级，请先创建班级'
      },
      yzm: {
        required: '请输入6位签到码',
        minlength: '最少6位签到码',
        maxlength: '最多6位签到码'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
})