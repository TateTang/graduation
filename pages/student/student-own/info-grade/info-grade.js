// pages/student/sudent-own/info-grade/info-grade.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradearray: [],//班级数组
    gradeId: [],//班级id
    gradeindex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加入班级',
    })
    var that = this;
    var gradeNameArr = [];
    var gradeIdArr = [];
    //获取班级名称信息
    wx.request({
      url: app.globalData.localhttp + '/grade/getName',
      method: 'GET',
      data: {},
      success: function (res) {
        var list = res.data.dataList;//获取数据
        //console.log(list);
        if (list == null) {
          var toastText = '获取数据失败' + res.data.msg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          })
        } else {
          for (var i = 0; i < list.length; i++) {
            gradeNameArr.push(list[i].name);
            gradeIdArr.push(list[i].id);
          }
          that.setData({
            gradearray: gradeNameArr,//设置变量
            gradeId: gradeIdArr
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
  bindGradeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      gradeindex: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;//获取表单中的数据 //formData['roleobj.id'] = that.data.moldvalue;
    //console.log(app.globalData.openid);
    formData.gradeobj = { 'id': that.data.gradeId[that.data.gradeindex]};
    console.log(JSON.stringify(formData));

    wx.request({
      url: app.globalData.localhttp + 'user/update?openId=' + app.globalData.openid,
      data: JSON.stringify(formData),//json转字符串
      method: 'PUT',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var result = res.data.code;
        var toastText = '操作成功！';
        app.operator(result);
        if (result == '200') {//添加成功返回到班级信息界面
          setTimeout(function () {//2s后返回
            wx.redirectTo({
              url: '../info-grade',
            })
          }, 1000)
        }
      }
    });
  }
})