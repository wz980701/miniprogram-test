const app = getApp();

Component({
    properties: {
        communityId: {
            type: String
        },
        level: {
            type: Number
        }
    },
    ready() {

    },
    methods: {
        checkPhoto() {
            wx.navigateTo({
                url: `/pages/photo/index?communityId=${this.data.communityId}`
            });
        },
        uploadPhoto() {
            wx.navigateTo({
                url: `/pages/uploadImg/index?communityId=${this.data.communityId}`
            });
        },
        addManager() {
            wx.navigateTo({
                url: `/pages/addManager/index?communityId=${this.data.communityId}`
            });
        },
        checkApplyList() {
            wx.navigateTo({
                url: `/pages/applyList/index?communityId=${this.data.communityId}`
            });
        },
        modifyCommunityInfo() {
            wx.navigateTo({
                url: `/pages/modifyCommunityInfo/index?communityId=${this.data.communityId}&type=update`
            });
        },
        sendDynamic() {
            wx.navigateTo({
                url: `/pages/dynamicEdit/index?communityId=${this.data.communityId}`
            });
        },
        addAnnounce() {
            wx.navigateTo({
                url: `/pages/announceEdit/index?communityId=${this.data.communityId}`
            });
        },
        exitCommunity() {
            const that = this;
            wx.showModal({
                content: '是否要退出该社团',
                success (res) {
                    if (res.confirm) {
                        app.wxRequest('/community/removeUser', {
                            data: {
                                communityId: that.data.communityId
                            }
                        }).then((res) => {
                            wx.showToast({
                                title: '已退出社团'
                            });
                            wx.redirectTo({
                                url: `/pages/communityInfo/index?id=${that.data.communityId}`
                            });
                        }).catch((err) => {
                            wx.showToast({
                                icon: 'none',
                                title: err.data.msg
                            });
                        });
                    }
                },
                fail (err) {
                    console.log(err);
                }
            });
        }
    }
});