const app = getApp();

Page({
    data: {
        userInfo: {},
        hasUserInfo: false
    },
    onLoad() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
        } else {
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    });
                }
            });
        }
    },
    getUserInfo (e) {
        const userInfo = e.detail.userInfo;
        app.globalData.userInfo = userInfo;
        wx.setStorageSync('isRegist', true);
        const { nickName, gender, avatarUrl } = userInfo;

        app.wxRequest('/userInfo/create', {
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
    }
});