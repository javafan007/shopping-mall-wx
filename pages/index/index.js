//index.js
const app = getApp()
import Constants from '../../utils/Constants.js';

Page({
  data: {
    navItems: Constants.NAV_ITEM_LIST,
    topCatList: Constants.TOP_CAT_LIST,
    recommendlist: []
  },

  loadRecommendList: function() {
    const me = this;
    wx.request({
      url: 'http://freshcity.top/goo/main?token0=98bdc01d-b4d4-4fad-9196-e2a64ff0fd4a',
      success: function({ data }) {
        me.setData({ recommendlist: data.info });
      }
    });
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tabChange: function() {

  },

  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{ text: '搜索结果', value: 1 }, { text: '搜索结果2', value: 2 }])
      }, 200)
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    this.loadRecommendList();
  }
})
