// pages/teacher/teacher-own/info-grade/info-grade-operation/info-grade-operation.js
//引入js
import WxValidate from '../../../../../src/wx-validate/WxValidate.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradeId: -1,
    gradeName: '',
    gradeCount: '',
    addUrl: app.globalData.localhttp + 'grade/create',
    updateUrl: app.globalData.localhttp + 'grade/update',
    form: {
      name: '',
      phone: ''
    },
    pageType: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.gradeId == -1) {
      this.setData({
        pageType: false
      })
    }
    this.initValidate() //验证规则函数
    rules: {}
    messages: {}
    wx.setNavigationBarTitle({
      title: '班级信息',
    })

    var that = this; //页面初始化，options为页面跳转所带来的的参数
    that.setData({
      gradeId: options.gradeId
    });
    if (options.gradeId == -1) { //没有参数的时候 说明点击的是创建班级按钮,直接跳出   
      return;

    }
    // console.log(options.gradeId);
    //点击编辑按钮时，查询出单个的班级信息，可以修改
    wx.request({
      url: app.globalData.localhttp + 'grade/getOne',
      data: {
        'gradeId': options.gradeId
      },
      method: 'GET',
      success: function(res) {
        var grade = res.data.data;
        console.log(grade);
        if (grade == undefined) {
          var toastText = '获取班级信息失败' + res.data.msg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({ //设置变量
            gradeName: grade.name,
            gradeCount: grade.counttotal
          });
        }
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
    //校验表单
    const params = e.detail.value;
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false;
    }
    var that = this;
    var formData = e.detail.value; //获取表单中的数据
    formData.teacherobj = {
      "openid": app.globalData.openid
    }; //json对象

    var url = that.data.addUrl; //添加班级信息的url
    var method = 'POST';
    if (that.data.gradeId != -1) { //点击的是编辑按钮， 判断是修改还是添加
      formData.id = that.data.gradeId;
      url = that.data.updateUrl + "?gradeId=" + that.data.gradeId; //编辑按钮 修改班级信息
      method = 'PUT';
    }
    console.log(JSON.stringify(formData));
    wx.request({
      url: url,
      data: JSON.stringify(formData), //json转字符串
      method: method,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var result = res.data.code;
        var url = '../info-grade';
        app.navigator(result, url);
      }
    });
  },
  /**
   * 删除班级信息
   */
  deleteGrade: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除班级[' + e.target.dataset.gradename + ']吗？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.localhttp + 'grade/delete/' + e.target.dataset.gradeid,
            data: {

            },
            method: 'DELETE',
            success: function(res) {
              var result = res.data.code;
              var url = '../info-grade';
              app.navigator(result, url);
            }
          })
        }
      }
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
        maxlength: 15
      },
      counttotal: {
        required: true
      }
    }
    const messages = {
      name: {
        required: '请填写班级名称',
        maxlength: '班级名称不得超过15个字'
      },
      counttotal: {
        required: '请填写班级人数'
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