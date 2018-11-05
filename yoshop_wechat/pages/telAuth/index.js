// pages/telAuth/index.js
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.tel = App.globalData.glUserInfo.tel
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  formSubmit: function (e) {
    let tel = e.detail.value.tel
    let until = require('../../utils/util.js')
    let user_id = App.getUserId()
    let _this = this
    // 验证手机号格式
    if(tel === '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
      })
      return false
    }
    if (!until.telMatch(tel)) {
      wx.showToast({
        title: '手机号码格式不正确',
        icon: 'none',
      })
      return false
    }

    // 发送用户信息
    App._post_form('user/authTel'
      , {
        user_id: user_id,
        tel: tel
      }
      , function (result) {
        //修改全局tel的值
        wx.showToast({
          title: result.msg,
        })
        App.globalData.glUserInfo.tel = result.data.tel
        console.log(App.globalData.glUserInfo)
        // 跳转回原页面
        _this.navigateBack();
      }
      , false
      , function () {
        wx.hideLoading();
      });
  }
})