//index.js
//获取应用实例
const app = getApp()

import {  getCommunityInfo } from '../../utils/interface/community';
import { removeComment } from '../../utils/interface/dynamic';

import API from '../../utils/api';

Page({
  data: {
    motto: 'Hello Jeremyu',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getTestToken();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    const userInfo = e.detail.userInfo;
    app.globalData.userInfo = userInfo;
    wx.setStorageSync('isRegist', true);
    const { nickName, gender, avatarUrl } = userInfo;

    app.wxRequest(API.setUserInfo, {
      method: "post",
      data: {
        nickName,
        gender,
        avatarUrl
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
    
    this.setData({
      userInfo,
      hasUserInfo: true
    });
  },
  getTestToken() {
    getCommunityInfo().then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  },
  handleClick() {
    removeComment().then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  },
  onUpload() {
    wx.chooseImage({
      count: 1,
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        for (let item of tempFilePaths) {
          wx.uploadFile({
            url: 'http://localhost:3000/api/dynamic/userRelease',
            filePath: item,
            name: 'file',
            header: {
              'content-type': 'multipart/form-data',
              'Authorization': `Bearer ${wx.getStorageSync('token') || ''}`
            },
            formData: {
              content: 'xixi2'
            },
            success: function (res) {
              console.log(res);
            },
            fail: function (err) {
              console.log(err);
            }
          });
        }
      }
    });
  },
  onEditDynamic() {
    wx.downloadFile({
      url: "http://graduation-jeremy.oss-cn-beijing.aliyuncs.com/community/1/wxff61119691f8a0d5.o6zAJs4MekovglIXHeJI-_olRW_I.PLa0odBFc47s7081b38aa759f9c00d1ab0ee294d3fd0.png",
      success: function (res) {
        const tempFilePath = res.tempFilePath;
        wx.uploadFile({
          url: 'http://localhost:3000/api/dynamic/edit',
          filePath: tempFilePath,
          name: 'file',
          header: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${wx.getStorageSync('token') || ''}`
          },
          formData: {
            dynamicId: 6,
            content: 'xixi4'
          },
          success: function (res) {
            console.log(res);
          },
          fail: function (err) {
            console.log(err);
          }
        });
      }
    })
  }
});
