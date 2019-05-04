// pages/teacher/qiandao/qiandao.js
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
    satarttime: [],
    endtime: [],
    index: 0,
    status: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  created() {
    wx.setNavigationBarTitle({//设置导航栏标题
      title: '签到'
    })
    var satarttime = [];
    var endtime = [];
    var status = [];
    var that = this;
    //获取全部签到信息
    wx.request({
      url: app.globalData.localhttp + '/arrive/getAll',
      method: 'GET',
      data: {
        // 'teaopenId': app.globalData.openid
      },
      success: function (res) {
        var list = res.data.dataList; //获取数据
        console.log(list);
        if (list == null) {
          return;
        }
        for (var i = 0; i < list.length; i++) {
          var stime = util.formatTimeFive(Date.parse(list[i].courseobj.startTime));
          var etime = util.formatTimeFive(Date.parse(list[i].courseobj.endTime));
          var atime = util.formatTimeFive(Date.parse(list[i].arrivetime));
          satarttime.push(util.formatTimeFour(Date.parse(list[i].courseobj.startTime)));
          endtime.push(util.formatTimeFour(Date.parse(list[i].courseobj.endTime)));
          // console.log(atime);
          // console.log(stime);
          if (atime>stime && atime<etime){
            status.push("迟到");
            console.log("迟到");
          } else if (atime == null || atime > etime) {
            status.push("旷课");
            console.log("旷课");
          }else{
            status.push("已签到");
            console.log("签到");
          }
        }
        that.setData({
          list: list,
          satarttime: satarttime,
          endtime: endtime,
          index: list.length,
          status: status,
        })
      },
    })
  }
})
