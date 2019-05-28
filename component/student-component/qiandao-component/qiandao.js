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
    length: 0,
    isFocus: false, //控制input 聚焦
    yzm_flag: false, //验证码输入遮罩,
    courseyzm: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showBox: function(e) {
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
    //签到按钮
    pass: function(e) {
      var that = this;
      wx.scanCode({
        onlyFromCamera: true,
        // onlyFromCamera: false,
        success(res) {
          console.log(res);
          wx.request({
            url: app.globalData.localhttp + '/course/getCourseByYzm',
            method: 'GET',
            data: {
              'courseId': e.target.dataset.courseid,
              'yzm': res.result
            },
            success: function(res) {
              var result = res.data.data;
              console.log(result);
              if (result == null) { //验证码不正确 不进行签到 提示签到失败，清空验证码 自动聚焦isFocus:true
                wx.showToast({
                  title: '签到二维码错误\r\n请重新扫描',
                  icon: "none",
                  duration: 1500
                })
                return;
              } else { //验证码校验正确 进行签到 插入签到信息
                console.log('验证码正确');
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
                    app.navigator(result, url, '课程签到成功');
                  }
                });
              }
            }
          })
        }
      })
      /*
      that.setData({
        
        yzm_flag: true,
        isFocus: true
        
      })
*/
      // var that = this;
      // wx.showModal({
      //   title: '课程签到提示',
      //   content: '确定要进行\r\n课程[' + e.target.dataset.coursename + ']的签到吗？',
      //   success: function(res) {
      //     if (res.confirm) {
      //       var formData = that.data.formData;
      //       wx.request({
      //         url: app.globalData.localhttp + 'arrive/create',
      //         data: JSON.stringify(formData), //json转字符串
      //         method: 'POST',
      //         header: {
      //           'Content-Type': 'application/json'
      //         },
      //         success: function(result) {
      //           // console.log(result);
      //           var url = 'student-index?type=1';
      //           app.navigator(result, url);
      //         }
      //       });
      //     }
      //   }
      // })
    },
    setyzm: function(e) {
      this.setData({
        yzm: e.detail.value
      })
      var yzm = e.detail.value;
      if (this.data.yzm.length == 6) { //验证码输入6位后自动去进行验证
        // console.log(yzm); 
        this.setData({
          courseyzm: yzm
        })
        this.chenkyzm(e);
      }
    },
    closeyzm: function(e) { //关闭验证码输入
      this.setData({
        isFocus: false, //失去焦点
        yzm_flag: false,
      })
    },
    set_Focus: function(e) { //聚焦input
      this.setData({
        isFocus: true
      })
    },
    set_notFocus: function(e) { //失去焦点
      this.setData({
        isFocus: false
      })
    },
    chenkyzm: function(e) {
      var that = this;
      // console.log('请求');
      // console.log(that.data.courseyzm) //验证码
      // console.log(e.target.dataset.courseid); //课程id
      //请求 根据验证码和课程id去查询信息

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
        'stuopenId': app.globalData.openid
      },
      success: function(res) {
        var list = res.data.dataList; //获取数据
        // console.log(list);
        that.setData({
          length: list.length
        })
        if (list.length == 0) {
          return;
        }
        for (var i = 0; i < list.length; i++) {
          // var date = list[i].startTime;
          starttime.push(util.formatDateOne(util.chaistr(list[i].startTime)));
          endtime.push(util.formatDateOne(util.chaistr(list[i].endTime)));
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