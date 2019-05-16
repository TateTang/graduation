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
    arrivetime:[],
    index: 0,
    status: [],
    showIndex:null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showBox: function (e) {
      // console.log(e)
      if (this.data.showIndex == e.currentTarget.dataset.index) {
        this.setData({
          showIndex: null
        })
      } else {
        this.setData({
          showIndex: e.currentTarget.dataset.index
        })
      }
    },
  },
  created() {
    wx.setNavigationBarTitle({//设置导航栏标题
      title: '签到'
    })
    var satarttime = [];
    var endtime = [];
    var arrivetime=[];
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
        console.log(list.length);
        if (list.length == 0) {
          return;
        }
        for (var i = 0; i < list.length; i++) {
          var stime = util.formatTimeFive(Date.parse(list[i].courseobj.startTime));
          var etime = util.formatTimeFive(Date.parse(list[i].courseobj.endTime));
          var atime = util.formatTimeFive(Date.parse(list[i].arrivetime));
          satarttime.push(stime);
          endtime.push(etime);
          arrivetime.push(atime);
          if (list[i].status == 0 ) {
            status.push("迟到");
          } else if (list[i].status == 1) {
            status.push("已签到");
          }else {
            status.push("旷课");
          }
        }
        that.setData({
          list: list,
          satarttime: satarttime,
          endtime: endtime,
          arrivetime: arrivetime,
          index: list.length,
          status: status,
        })
      },
    })
  }
})
