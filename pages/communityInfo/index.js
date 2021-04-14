const app = getApp();

Page({
    data: {
        communityInfo: {},
        isJoin: false
    },
    onLoad(options) {
        this.setData({
            id: options.id
        });
        this.getCommuntiyInfo();
        this.getCurrentUserLevel();
    },
    getCurrentUserLevel() {
        app.wxRequest('/community/getCurrentUserLevel', {
            data: {
                communityId: this.data.id
            }
        }).then((res) => {
            const { level } = res;
            if (level >= 1) {
                this.setData({
                    isJoin: true,
                    level
                });
            }
        }).catch((err) => {
            console.log(err);
        });
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
    joinCommunity () { // 加入社团
        const that = this;
        wx.showModal({
            content: '是否要加入该社团',
            success (res) {
                if (res.confirm) {
                    app.wxRequest('/community/join', {
                        data: {
                            communityId: that.data.communityInfo.id
                        }
                    }).then((data) => {
                        console.log(data);
                        wx.showToast({
                            icon: 'none',
                            title: '已提交申请'
                        });
                    }).catch((err) => {
                        console.log(err);
                        wx.showToast({
                            icon: 'none',
                            title: '加入失败'
                        });
                    });
                }
            },
            fail (err) {
                console.log(err);
            }
        });
    },
    onShareAppMessage () {
        const { communityInfo } = this.data;
        return {
            title: `欢迎加入${communityInfo.communityName}`,
            path: `/pages/communityInfo/index?id=${communityInfo.id}`,
            imgPathUrl: 'https://graduation-jeremy.oss-cn-beijing.aliyuncs.com/default/2d5eda9d2b9691d1318d1920715d4a11.jpg'
        }
    },
    routeToDetail() {
        wx.navigateTo({
            url: `/pages/communityDetail/index?level=${this.data.level}&id=${this.data.id}`
        });
    }
});