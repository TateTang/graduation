// pages/student/control/control.js
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
   /*
  *生命周期
  */
  // lifetimes: {
  //   attached() {
  //     wx.setNavigationBarTitle({
  //       title: '控制台'
  //     })
  //   }
  // }
  created() { //在组件实例刚刚被创建时执行
      wx.setNavigationBarTitle({
        title: '控制台'
      })
    }
})
