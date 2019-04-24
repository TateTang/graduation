//index.js
//获取应用实例
const app = getApp()
//引入js
import WxValidate from '../../src/wx-validate/WxValidate.js'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    items: [
      { name: 1, value: '我是老师', checked: 'true' },
      { name: 2, value: '我是学生' },
    ],
    mold: '工号',
    moldname: '请输入工号',
    moldvalue: 1,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onReady() {
  },
  onLoad: function () {
    this.initValidate()//验证规则函数
    rules: { }
    messages: { }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        //console.log(code);
        // var appId = "wxc17bd0526af4ec36";
        // var appSecret = "ef8cae843d7f4b2b17b16da7e91eaa14";
        // var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + appSecret + '&js_code=' + code + '&grant_type=authorization_code'
        //调用后端，获取微信的session_key,secret
        wx.request({
          url: app.globalData.localhttp + 'wxLogin/wxLogin?code=' + code,
          method: 'POST',
          success(res) {
            console.log(res);
            app.globalData.openid = res.data.data.openid;
            console.log(app.globalData.openid);
            wx.request({
              url: app.globalData.localhttp+'user/getUserByOpenId',
              data: {
                'openId': res.data.data.openid
              },
              method: 'GET',
              success: function (res) {
                var userdata = res.data.data;
                console.log(userdata);
                if (userdata != null) {//跳转
                  if (userdata.roleobj.id == 1) {
                    wx.redirectTo({
                      url: '/pages/teacher/teacher-index',
                    })
                  } else {
                    wx.redirectTo({
                      url: '/pages/student/student-index',
                    })
                  }
                }

              }
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.globalData.userInfo = res.userInfo
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(app.globalData.userInfo);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  radioChange: function (e) {
    var that = this;
    //console.log('radio发生change事件，携带value值为：', e.detail.value);
    if (e.detail.value == 1) {
      that.setData({
        mold: '工号',
        moldname: '请输入工号',
        moldvalue: 1,
      })
    } else {
      that.setData({
        mold: '学号',
        moldname: '请输入学号',
        moldvalue: 2,
      })
    }
  },
  //表单验证
  formSubmit: function (e) {
    //校验表单
    const params = e.detail.value;
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false;
    }
    var that = this;
    console.log(app.globalData.openid);
    var formData = e.detail.value;//获取表单中的数据 //formData['roleobj.id'] = that.data.moldvalue;
    var idData = { "id": that.data.moldvalue};//json对象
    //console.log(idData);
    formData.roleobj = idData;
    formData.openid = app.globalData.openid;
    console.log(JSON.stringify(formData));
    //操作用户表
    wx.request({
      url: app.globalData.localhttp+'user/create',
      data: JSON.stringify(formData),//json转字符串
      method:'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
       console.log(res);
      }
    })
    if (that.data.userInfo) {
      if (that.data.moldvalue == 1) {
        wx.redirectTo({
          url: '/pages/teacher/teacher-index',
        })
      } else {
        wx.redirectTo({
          url: '/pages/student/student-index',
        })
      }
    }
  },
  //验证函数
  initValidate() {
    const rules = {
      account: {
        required: true
      },
      name: {
        required: true
      }
    }
    const messages = {
      account: {
        required: '请输入工号/学号'
      },
      name: {
        required: '请输入姓名'
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
