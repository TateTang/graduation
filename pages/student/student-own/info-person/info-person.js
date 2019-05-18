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
    have: true,
    gradearray: [], //班级数组
    gradeId: [], //班级id
    gradeindex: 0,
    isedit: true, //值不可改变
    gradename: '',
    ishave: false, //是否拥有
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initValidate() //验证规则函数
    rules: {}
    messages: {}

    wx.setNavigationBarTitle({
      title: '我的信息',
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
      success: function(res) {
        var list = res.data.dataList; //获取数据
        // console.log(list);
        // console.log(list.length);
        if (list.length == 0) {
          return;
        }
        for (var i = 0; i < list.length; i++) {
          gradeNameArr.push(list[i].name);
          gradeIdArr.push(list[i].id);
        }
        that.setData({
          gradearray: gradeNameArr, //设置变量
          gradeId: gradeIdArr,
        })
      },
    })
    wx.request({
      url: app.globalData.localhttp + 'student/getStudentByOpenId',
      data: {
        'openId': app.globalData.openid
      },
      method: 'GET',
      success: function(res) {
        var result = res.data.data
        // console.log(result);
        // console.log(result.length);
        if (result == null) { //说明是没有值的
          that.setData({
            isedit: false
          })
          return;
        }
        console.log(result);
        that.setData({
          name: result.name,
          account: result.account,
          gradename: result.gradeobj.name
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
    // console.log(that.data.ishave);
    if (that.data.ishave) { //没有该学号 可以进行插入  有该学号提示不可以插入
      wx.showModal({
        content: '该学号已经被使用请重新输入',
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
    formData.gradeobj = {
      'id': that.data.gradeId[e.detail.value.gradeobj]
    };
    formData.openid = app.globalData.openid;
    formData.roleobj = {
      "id": 2
    };
    console.log(JSON.stringify(formData));
    wx.request({
      url: app.globalData.localhttp + 'student/update?openId=' + app.globalData.openid,
      data: JSON.stringify(formData),
      method: 'PUT',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        //console.log(res);
        // var result = res.data.code;
        var url = '../../student-index';
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
  bindGradeChange: function(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.data.gradename != '') { //也就是说是编辑操作 所以改变的时候 当前值也要改变
      this.setData({
        gradename: this.data.gradearray[e.detail.value]
      })
    }
    this.setData({
      gradeindex: e.detail.value
    })
  },
  getAccount: function(e) {
    var that = this;
    // console.log(e.detail.value);
    //判断学号有没有被使用过
    wx.request({
      url: app.globalData.localhttp + 'student/getAll',
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