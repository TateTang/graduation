// pages/teacher/control/control.js
//获取应用实例
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
    // rejectreason: [],
    title: '暂无学生请假单信息',
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  created() {
    wx.setNavigationBarTitle({ //设置导航栏标题
      title: '请假'
    })
    var leavetime = [];
    var leavestatus = [];
    // var rejectreason = [];
    var that = this;
    //获取请假信息信息
    wx.request({
      url: app.globalData.localhttp + '/leave/getAll',
      method: 'GET',
      data: {
        'teaopenId': app.globalData.openid,
        'status': 1, //已通过的请假申请
        'status2': 2 //驳回的申请
      },
      success: function (res) {
        var list = res.data.dataList; //获取数据
        // console.log(list);
        if (list.length == 0) {
          return;
        }
        for (var i = 0; i < list.length; i++) {
          leavetime.push(util.formatDateTwo(util.chaistr(list[i].leavetime)));
          if (list[i].status == 1) {
            leavestatus.push("已通过");
          } else if (list[i].status == 2) {
            leavestatus.push("未通过");
            // console.log(list[i].rejectreason);
            // if (list[i].rejectreason != null) { //有驳回原因的时候
            //   rejectreason.push(list[i].rejectreason);
            // } else { //驳回原因没有的时候
            //   rejectreason.push("无原因");
            // }
          }
        }
        that.setData({
          list: list,
          leavetime: leavetime,
          index: list.length,
          leavestatus: leavestatus,
          // rejectreason: rejectreason,
          title: '学生请假单信息',
        })
      },
    })
  }
})