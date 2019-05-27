// pages/teacher/qiandao/qiandao.js
//获取应用实例
const app = getApp();
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
    //课程信息
    list: [],
    ishave: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showBox: function(e) {
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
    wx.setNavigationBarTitle({ //设置导航栏标题
      title: '签到'
    })
    //获取对应的课程信息
    var that = this;
    wx.request({
      url: app.globalData.localhttp + 'course/getAll',
      method: 'GET',
      data: {
        'teaopenId': app.globalData.openid
      },
      success: function(res) {
        var list = res.data.dataList; //获取数据
        console.log(list);
        if (list.length == 0) {
          that.setData({
            ishave: true
          })
        } else {
          that.setData({
            list: list, //设置变量
          })
        }
      },
    })
  }
})