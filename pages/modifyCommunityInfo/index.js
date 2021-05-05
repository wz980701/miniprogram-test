const app = getApp();

Page({
    data: {
        communityName: '',
        communityInfo: ''
    },
    onLoad(options) {
        this.setData({
            communityId: options.communityId,
            type: options.type
        });
        this.data.type === 'update' && this.getCommuntiyInfo();
    },
    getCommuntiyInfo () {
        app.wxRequest('/community/getInfo', {
            data: {
                communityId: this.data.communityId
            }
        }).then((res) => {
            this.setData({
                communityName: res.communityName,
                communityInfo: res.info,
                backgroundUrl: res.backgroundUrl,
                avatarUrl: res.avatarUrl
            });
        }).catch((err) => {
            console.log(err);
            wx.showToast({
                title: '获取社团信息失败'
            });
        });
    },
    update() {
        const { communityId, communityName, communityInfo, type } = this.data;
        const data = {};
        type === 'update' && (data.id = communityId);
        app.wxRequest(`/community/${type}`, {
            method: 'post',
            data: {
                communityName,
                info: communityInfo,
                ...data
            }
        }).then(res => {
            wx.showToast({
                icon: 'none',
                title: '更新社团信息成功'
            });
            this.setData({
                communityName: '',
                communityInfo: ''
            });
        }).catch(err => {
            console.log(err);
            wx.showToast({
                icon: 'none',
                title: err.data.msg
            });
        });
    },
    routeToUploadImg(e) {
        const { type } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/uploadImg/index?communityId=${this.data.communityId}&imgType=${type}`
        });
    }
});