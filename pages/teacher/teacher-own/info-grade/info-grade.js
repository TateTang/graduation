// pages/teacher/teacher-own/info-grade/info-grade.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //班级信息
    list:[] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     wx.setNavigationBarTitle({
       title: '班级管理',
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
      var that = this;
      wx.request({
        url: app.globalData.localhttp+'grade/getAll',  
        method:'GET',
        data: {'teacheropenId':app.globalData.openid},
        success: function(res){
          var list =  res.data.dataList;//获取数据
          if(list==null){
            var toastText = '获取数据失败'+res.data.msg;
            wx.showToast({
              title: toastText,
              icon:'',
              duration:2000
            })
          }else{
            that.setData({
              list : list,//设置变量
            })
          }
        },
      })
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
  /**
   * 创建班级
   */
  addGrade:function(e){
      wx.navigateTo({
        url: 'info-grade-operation/info-grade-operation?gradeId=-1',
      })
  }
 
})