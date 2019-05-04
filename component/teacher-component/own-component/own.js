// pages/teacher/own/own.js
//获取应用实例
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
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onshare:function(e){
      console.log(1);
    },
    onShareAppMessage: function (e) {
      return {
        title: '自定义分享标题',

        desc: '自定义分享描述',

        path: '/page/index?id=123'

      }

    }
  },
  created() {
    wx.setNavigationBarTitle({//设置导航栏标题
      title: '我的'
    })
  }
})
