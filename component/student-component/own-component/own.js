// pages/student/own/own.js
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

  },
  /**
   * 在组件实例进入页面节点树时执行
   */
  created() {
    wx.setNavigationBarTitle({
      title: '我的'
    }),
    
    console.log(app.globalData.userInfo);
   
  }
})
