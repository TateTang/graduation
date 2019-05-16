// pages/student/qiandao/qiandao.js
//获取应用实例
const app = getApp()
var util = require('../../../utils/util.js');
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
    list: [],
    starttime: [],
    endtime: [],
    index: 0,
    showIndex: null,
    formData: '',
    length:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
      var that = this;
      var index = e.target.dataset.index;
      wx.showModal({
        title: '课程签到提示',
        content: '确定要进行\r\n课程[' + e.target.dataset.coursename + ']的签到吗？',
        success: function(res) {
          if (res.confirm) {
            var formData = that.data.formData;
            wx.request({
              url: app.globalData.localhttp + 'arrive/create',
              data: JSON.stringify(formData), //json转字符串
              method: 'POST',
              header: {
                'Content-Type': 'application/json'
              },
              success: function(result) {
                // console.log(result);
                var url = 'student-index?type=1';
                app.navigator(result, url);
              }
            });
          }
        }
      })
    },
    /**
     * 表单提交事件 对话框确认按钮点击事件
     */
    formSubmit: function(e) {
      var that = this;
      var formData = e.detail.value; //获取表单中的数据
      formData.courseobj = {
        'id': formData.courseobj
      };
      formData.studentobj = {
        'openid': app.globalData.openid
      };
      var formData = formData;
      that.setData({
        formData: formData
      })
      // console.log(formData);
    },
  },
  created() {
    wx.setNavigationBarTitle({
      title: '签到',
    })
    var starttime = [];
    var endtime = [];
    var that = this;
    //查询需要签到的课程,签到了的课程不再显示出来
    wx.request({
      url: app.globalData.localhttp + '/course/getNoSignIn',
      method: 'GET',
      data: {
        'gradeId': app.globalData.studnetgradeid,
        'stuopenId':app.globalData.openid
      },
      success: function(res) {
        var list = res.data.dataList; //获取数据
        // console.log(list);
        that.setData({
          length:list.length
        })
        if (list.length == 0) {
          return;
        }
        for (var i = 0; i < list.length; i++) {
          // console.log(list[i].startTime);
          // console.log(list[i].startTime.replace(/-/g, '/'));
          starttime.push(util.formatTimeFive(Date.parse(list[i].startTime)));
          endtime.push(util.formatTimeFive(Date.parse(list[i].endTime)));
        }
        that.setData({
          list: list,
          starttime: starttime,
          endtime: endtime,
        })
      },
    })
  },
})