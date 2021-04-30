import { wxRequest } from './utils/request';
import { uploadFile } from './utils/uploadFile';

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    if (wx.getStorageSync('isRegist')) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wxRequest('/userInfo/get', {}).then((res) => {
            const { avatarUrl, nickName, gender } = res;
            this.globalData.userInfo = {
              avatarUrl,
              nickName,
              gender
            };
          }).catch((err) => {
            console.log(err);
          });
          // wx.getUserProfile({
          //   success: res => {
          //     console.log('res>>>', res);
          //     this.globalData.userInfo = res.userInfo;
          //     wx.setStorageSync('userInfo', userInfo);

          //     const { avatarUrl, nickName, gender } = res.userInfo;

          //     wxRequest('/userInfo/update', {
          //       method: 'post',
          //       data: {
          //         avatarUrl,
          //         nickName,
          //         gender
          //       }
          //     }).then((res) => {
          //       console.log(res);
          //     }).catch((err) => {
          //       console.log(err);
          //     });

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res);
          //     }
          //   },
          //   fail (err) {
          //     console.log('err>>>', err);
          //   }
          // })
    }
  },
  globalData: {
    userInfo: null
  },
  wxRequest,
  uploadFile
})