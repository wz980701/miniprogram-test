const app = getApp();

Page({
    data: {
        communityInfo: {}
    },
    onLoad(options) {
        const { level, id } = options;
        this.setData({
            level,
            id
        });
        this.getCommuntiyInfo();
    },
    getCommuntiyInfo () {
        app.wxRequest('/community/getInfo', {
            data: {
                communityId: this.data.id
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
    },
});
