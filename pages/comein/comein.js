// pages/comein/comein.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //var that = this
        var code = res.code;
        var appid = "wxc17bd0526af4ec36";
        var secret = "60b1262733a3e3f110f215ca9776ae0a";
        var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code'
        wx.request({
          url: url,
          success(res) {
            //console.log(res);
            
            app.globalData.openid = res.data.openid
            that.setData({
              openid: app.globalData.openid
            })
            console.log(that.data.openid);
            wx.request({
              url: app.globalData.localhttp+'user/getUserByOpenId',
              data:{
                'openId': that.data.openid
              },
              method:'GET',
              success:function(res){
                var userdata = res.data.data;
                console.log(userdata);
                if(userdata!=null){//
                    if(userdata.roleobj.id == 1){
                      wx.redirectTo({
                        url: '/pages/teacher/teacher-index',
                      })
                    }else{
                      wx.redirectTo({
                        url: '/pages/student/student-index',
                      })
                    }
                }else{
                  wx.redirectTo({
                    url: '/pages/index',
                  })
                }
              }
            })
          }
          
        })
      }
    }),
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
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
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

  }
})