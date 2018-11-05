let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    orderCount: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取当前用户信息
    this.getUserDetail();
  },

  /**
   * 获取当前用户信息
   */
  getUserDetail: function () {
    // wx.showToast({
    //   title: '12312321'
    // })
    let _this = this;
    App._get('user.index/detail', {}, function (result) {
      // 本页面的信息
      _this.setData(result.data);
      // 用户信息存全局
      App.globalData.glUserInfo = result.data.userInfo
    });
  },

  /**
   * 重新获取用户的身份信息
   */
  refresh: function () {
    this.getUserDetail()
  },

  /**
   * 手机号码认证的点击事件
   */
  telAuth: function () {
    let tel = App.globalData.glUserInfo.tel;
    if (tel === '') {
      // 为空 => 手机号码认证页面
      wx.navigateTo({
        url: '../telAuth/index'
      })
    } else{
      // 不为空 => 修改手机号页面
      wx.navigateTo({
        url: '../telAuth/changeTel'
      })
    }
  }
})