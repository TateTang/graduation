// pages/teacher/teacher-own/info-person/info-person.js
const app = getApp();
import WxValidate from '../../../../src/wx-validate/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    account: '',
    isedit: true, //不可编辑的
    ishava: false, //工号是否已经存在
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initValidate() //验证规则函数
    rules: {}
    messages: {}
    wx.setNavigationBarTitle({
      title: '个人信息',
    })
    //  console.log(app.globalData.openid);
    var that = this;
    wx.request({
      url: app.globalData.localhttp + 'teacher/getTeacherByOpenId',
      data: {
        'openId': app.globalData.openid
      },
      method: 'GET',
      success: function(res) {
        var result = res.data.data;
        // console.log(result);
        // console.log(result.length);
        if (result == null) {
          that.setData({
            isedit: false //设置可改变值
          })
          return;
        }
        // console.log(res);
        that.setData({
          name: result.name,
          account: result.account
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  formSubmit: function(e) {
    var that = this;
    //校验表单
    const params = e.detail.value;
    if (that.data.ishave) { //没有该学号 可以进行插入  有该学号提示不可以插入
      wx.showModal({
        content: '该工号已经被使用请重新输入',
        showCancel: false
      })
      return false;
    }
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false;
    }
    var formData = e.detail.value; //获取表单中的数据
    formData.openid = app.globalData.openid;
    formData.roleobj = {
      "id": 1
    };
    console.log(JSON.stringify(formData));
    wx.request({
      url: app.globalData.localhttp + 'teacher/update?openId=' + app.globalData.openid,
      data: JSON.stringify(formData),
      method: 'PUT',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // console.log(res);
        var url = '../../teacher-index';
        app.navigator(res, url, '操作成功');
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
        required: '请输入教师工号'
      },
      name: {
        required: '请填写教师姓名'
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
  getAccount: function(e) {
    var that = this;
    // console.log(e.detail.value);
    //判断学号有没有被使用过
    wx.request({
      url: app.globalData.localhttp + 'teacher/getAll',
      data: {
        'account': e.detail.value,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var result = res.data.dataList;
        // console.log(result.length);
        if (result.length == 0) { //该学号是否已经存在
          that.setData({
            ishave: false
          })
        } else {
          that.setData({
            ishave: true
          })
        }
        // console.log(that.data.ishave);
      }
    })
  }
})