//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
              //console.log(res);
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    openid: '',
    localhttp:'http://localhost:8080/',
    // localhttp: 'https://www.tfleof.top:8443/',
    studnetgradeid:'',
  },
  operator: function(res){//操作函数 写在全局中 都可以调用
    var toastText = '操作成功！';
    var code = res.data.code;
    if (code != '200') {
      toastText = '操作失败!' + res.data.msg;
    }
    wx.showToast({
      title: toastText,
      icon: 'success',
      duration: 1500,
    });
  },
  navigator:function(res,url){
    var toastText = '操作成功！';
    var code = res.data.code;
    if (code != '200') {
      toastText = '操作失败!' + res.data.msg;
    }
    wx.showToast({
      title: toastText,
      icon: 'success',
      duration: 1500,
    }); 
    if (code == '200') { //添加成功返回到班级信息界面
      setTimeout(function () { //2s后返回
        wx.redirectTo({
          url: url,
        })
      }, 1000)
    }
  }
})