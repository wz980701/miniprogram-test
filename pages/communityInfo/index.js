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
    },
    joinCommunity () { // 加入社团
        
    },
    onShareAppMessage () {
        const { communityInfo } = this.data;
        return {
            title: `欢迎加入${communityInfo.communityName}`,
            path: `/pages/communityInfo/index?id=${communityInfo.id}`,
            imgPathUrl: 'https://graduation-jeremy.oss-cn-beijing.aliyuncs.com/default/2d5eda9d2b9691d1318d1920715d4a11.jpg'
        }
    }
});