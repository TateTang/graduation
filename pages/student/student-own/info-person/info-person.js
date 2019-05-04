// pages/student/sudent-own/info-person/info-person.js
const app = getApp();
import WxValidate from '../../../../src/wx-validate/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    account: '',
    have:true,
    gradearray: [],//班级数组
    gradeId: [],//班级id
    gradeindex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate() //验证规则函数
    rules: { }
    messages: { }

    wx.setNavigationBarTitle({
      title: '个人信息',
    })
    //  console.log(app.globalData.openid);
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
          return;
        }
        for (var i = 0; i < list.length; i++) {
            gradeNameArr.push(list[i].name);
            gradeIdArr.push(list[i].id);
          }
          that.setData({
            gradearray: gradeNameArr,//设置变量
            gradeId: gradeIdArr,
          })
      },
    })
    // if(that.data.name==''){//不存在的时候，第一次进入 不去查询表
    //   return;
    // }
    wx.request({
      url: app.globalData.localhttp + 'student/getStudentByOpenId',
      data: {
        'openId': app.globalData.openid
      },
      method: 'GET',
      success: function (res) {
        var result = res.data.data
        if (result==null){
          return;
        }
        console.log(result);
        that.setData({
          name: result.name,
          account: result.account,
          gradeindex:(result.gradeobj.id -1)
        })
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
    var formData = e.detail.value;//获取表单中的数据
    formData.gradeobj = { 'id': that.data.gradeId[that.data.gradeindex]};
    formData.openid = app.globalData.openid;
    formData.roleobj = {"id":2};
    console.log(JSON.stringify(formData));
    wx.request({
      url: app.globalData.localhttp + 'student/update?openId=' + app.globalData.openid,
      data: JSON.stringify(formData),
      method: 'PUT',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log(res);
        // var result = res.data.code;
        var url = '../../student-index';
        app.navigator(res, url);
      }
    })
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
        required: '请填写学生学号'
      },
      name: {
        required: '请填写学生姓名'
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
  bindGradeChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      gradeindex: e.detail.value
    })
  },
})