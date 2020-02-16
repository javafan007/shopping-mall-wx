//app.js
import api from './api/api-request';

App({
  onLaunch: function () {
    const userToken = wx.getStorageSync('userToken');
    if(userToken) {
      wx.checkSession({
        success () {
          api.setHeader({ userToken });
        },
        fail () {
          doLogin();
        }
      })
    } else {
      doLogin();
    }

    function doLogin() {
      // 登录
      wx.login({
        success({ code }) {
          api.get(`mini/getSessionKey/${code}`).then( res => {
            console.log('---->', res);
            // wx.setStorageSync('userToken', res.userToken);
            // api.setHeader({ userToken: 1324324 });
          })
        },
        fail () {
          console.log('login error');
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})