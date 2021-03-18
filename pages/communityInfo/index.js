const app = getApp();

Page({
    data: {
        communityInfo: {}
    },
    onLoad (options) {
        this.getCommuntiyInfo(options);
    },
    getCommuntiyInfo (options) {
        app.wxRequest('/community/getInfo', {
            data: {
                communityId: options.id
            }
        }).then((res) => {
            console.log(res);
            this.setData({
                communityInfo: res
            });
        }).catch((err) => {
            console.log(err);
            wx.showToast({
                title: '获取社团信息失败'
            });
        })
    }
});