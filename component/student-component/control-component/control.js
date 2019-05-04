// pages/student/control/control.js
var util = require('../../../utils/util.js');
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    leavetime: [],
    leavestatus: [],
    index: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  created() {
    wx.setNavigationBarTitle({ //设置导航栏标题
      title: '控制台'
    })
    var leavetime = [];
    var leavestatus = [];
    var that = this;
    //获取请假信息信息
    wx.request({
      url: app.globalData.localhttp + '/leave/getAll',
      method: 'GET',
      data: {
        'stuopenId': app.globalData.openid,
      },
      success: function (res) {
        var list = res.data.dataList; //获取数据
        console.log(list);
        if (list == null) {
          return;
        }
        for (var i = 0; i < list.length; i++) {
          leavetime.push(util.formatTimeThree(Date.parse(list[i].leavetime)));
          if (list[i].status == 1) {
            leavestatus.push("已通过");
          } else if (list[i].status == 2) {
            leavestatus.push("未通过");
          } else if (list[i].status==0){
            leavestatus.push("已提交");
          }
        }
        that.setData({
          list: list,
          leavetime: leavetime,
          index: list.length,
          leavestatus: leavestatus,
        })
      },
    })
  }
})
