//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    // items: [
    //   { name: 1, value: '我是老师', checked: 'true' },
    //   { name: 2, value: '我是学生' },
    // ],
    // mold: '工号',
    // moldname: '请输入工号',
    // moldvalue: 1,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        wx.request({
          url: app.globalData.localhttp + 'wxLogin/wxLogin?code=' + code,
          method: 'POST',
          success(res) {
            console.log(res);
            app.globalData.openid = res.data.data.openid;
            //console.log(app.globalData.openid);
            wx.request({ //判断角色
              url: app.globalData.localhttp +'wxLogin/getWxLoginByOpenId',
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
  teacherLogin: function (e) { //教师登录
    console.log(e.detail.userInfo);
    //更新表
    wx.request({
      url: app.globalData.localhttp + 'wxLogin/updateRoleObj?roleId=1&openId=' + app.globalData.openid,
      method: 'PUT',
      success(res) {
        console.log(res);
      }
    })
    wx.redirectTo({
      url: '/pages/teacher/teacher-index',
    })
  },
  studentLogin: function (e) { //学生登录
    console.log(e.detail.userInfo);
    wx.request({
      url: app.globalData.localhttp + 'wxLogin/updateRoleObj?roleId=2&openId=' + app.globalData.openid,
      method: 'PUT',
      success(res) {
        console.log(res);
      }
    })
    wx.redirectTo({
      url: '/pages/student/student-index',
    })
  }
})
