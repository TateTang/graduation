// pages/student/control/control.js
var util = require('../../../utils/util.js');
import WxValidate from '../../../src/wx-validate/WxValidate.js'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    date: util.formatDate(new Date()),
    coursearray: [], //课程选择器
    courseId: [],
    courseindex: 0,

    teacherOpenId: [],//教师选择器
    teacherarray: [],
    teacherId: [],
    teacherindex: 0,

    username: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
      //校验表单
      const params = e.detail.value;
      if (!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0];
        this.showModal(error);
        return false;
      }
      var that = this;
      var formData = e.detail.value; //获取表单中的数据 //formData['roleobj.id'] = that.data.moldvalue;
      var leavetime = e.detail.value.leavetime + " 08:00:00";
      //var idData = { "id": that.data.gradeId[e.detail.value.gradeobj] };//json对象
      formData.leavetime = Date.parse(leavetime); //转换
      formData.courseobj = {
        'id': that.data.courseId[that.data.courseindex]
      };;
      formData.studentobj = {
        'openid': app.globalData.openid
      };
      formData.teacherobj = {
        'openid': that.data.teacherOpenId[that.data.teacherindex]
      };
      console.log(JSON.stringify(formData)); //打印表单中的数据
      var url = app.globalData.localhttp + 'leave/create';
      wx.request({
        url: url,
        data: JSON.stringify(formData),//json转字符串
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          // var result = res.data.code;
          var url = '../../student-index';
          app.navigator(res, url);
        }
      });
    },
    //验证函数
    initValidate() {
      const rules = {
        leavecontent: {
          required: true
        },
      }
      const messages = {
        leavecontent: {
          required: '请填写请假原因'
        },
      }
      this.WxValidate = new WxValidate(rules, messages)
    },
    //报错 
    showModal(error) {
      wx.showModal({
        content: error.msg,
        showCancel: false,
      })
    }
  },
  created() {
    this.initValidate() //验证规则函数
    rules: { }
    messages: { }

    wx.setNavigationBarTitle({ //设置导航栏标题
      title: '请假'
    })
    var that = this;
    wx.request({
      url: app.globalData.localhttp + 'student/getStudentByOpenId',
      data: {
        'openId': app.globalData.openid
      },
      method: 'GET',
      success: function (res) {
        var userdata = res.data.data;
        //console.log(userdata);
        that.setData({
          username: userdata.name
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
        var list = res.data.dataList; //获取数据
        // console.log(list);
        if (list == null) {
          return;
        }
        for (var i = 0; i < list.length; i++) {
          courseNameArr.push(list[i].name);
          courseIdArr.push(list[i].id);
        }
        that.setData({
          coursearray: courseNameArr, //设置变量
          courseId: courseIdArr
        })

      },
    })
    var teacherNameArr = [];
    var teacherIdArr = [];
    var teacherOpenIdArr = [];
    //获取老师姓名信息
    wx.request({
      url: app.globalData.localhttp + '/teacher/getAll',
      method: 'GET',
      data: {},
      success: function (res) {
        var list = res.data.dataList; //获取数据
        // console.log(list);
        if (list == null) {
          return;
        }
        for (var i = 0; i < list.length; i++) {
          teacherNameArr.push(list[i].name);
          teacherIdArr.push(list[i].id);
          teacherOpenIdArr.push(list[i].openid);
        }
        that.setData({
          teacherarray: teacherNameArr, //设置变量
          teacherId: teacherIdArr,
          teacherOpenId: teacherOpenIdArr
        })
      },
    })
  }
})
