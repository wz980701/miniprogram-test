const app = getApp();

Page({
    data: {
        searchContent: '',
        swiperImgList: ['https://graduation-jeremy.oss-cn-beijing.aliyuncs.com/lamp/lamp1.jfif', 'https://graduation-jeremy.oss-cn-beijing.aliyuncs.com/lamp/lamp2.jfif', 'https://graduation-jeremy.oss-cn-beijing.aliyuncs.com/lamp/lamp3.jfif'],
        filterTag: 100,
        filterList: [
            { text: '已申请', value: 0 },
            { text: '已加入', value: 1 },
            { text: '已创建', value: 100 }
        ],
        communityList: [],
        total: 0,
        totalPage: 0
    },
    onLoad () {
        this.initCommunityList();
    },
    initCommunityList (e) {
        app.wxRequest('/community/getSelectCommunityList', {
            data: {
                level: e ? e.detail : this.data.filterTag
            }
        }).then((res) => {
            res && this.setData({
                communityList: res.data,
                total: res.count,
                totalPage: res.totalPage
            });
        }).catch((err) => {
            console.log(err);
        });
    },
    routeToInfo (e) {
        const { id } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/communityInfo/index?id=${id}`
        });
    }
});