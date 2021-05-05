const app = getApp();

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        token: wx.getStorageSync('token')
    },
    onLoad() {
        const userInfo = wx.getStorageSync('userInfo');
        if (userInfo) {
            this.setData({
                userInfo,
                hasUserInfo: true
            });
        }
    },
    getUserInfo () {
        wx.getUserProfile({
            desc: '获取个人信息',
            success: (res) => {
                console.log(res);
                const userInfo = res.userInfo;
                app.globalData.userInfo = userInfo;
                wx.setStorageSync('isRegist', true);
                wx.setStorageSync('userInfo', userInfo);
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
    },
    routeToUserCommunity (e) {
        const { id } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/userCommunity/index?id=${id}`
        });
    },
    routeToUserInfo () {
        wx.navigateTo({
            url: '/pages/userInfo/index'
        });
    },
    routeToContact () {
        wx.navigateTo({
            url: '/pages/contact/index'
        });
    },
    routeToCreateCommunity() {
        wx.navigateTo({
            url: '/pages/modifyCommunityInfo/index?type=create'
        });
    }
});