const app = getApp();

Page({
    data: {
        searchContent: '',
        communityList: [],
        size: 20,
        page: 1,
        scroll: {
            pagination: {
                page: 1,
                totalPage: 0,
                limit: 20,
                length: 0
            },
            refresh: {
                type: 'default',
                style: 'black',
                background: '#000'
            },
            loadmore: {
                type: 'default',
                icon: 'http://upload-images.jianshu.io/upload_images/5726812-95bd7570a25bd4ee.gif',
                background: '#f2f2f2', 
                title: {
                show: true,
                text: '加载中',
                color: "#999",
                shadow: 5
                }
            }
        }
    },
    onLoad () {
        this.initCommunityList();
    },
    initCommunityList () {
        const { size, page } = this.data;
        app.wxRequest('/community/allCommunityList', {
            size,
            page
        }).then((res) => {
            res && this.setData({
                communityList: res.data,
                'scroll.pagination.length': res.count,
                'scroll.pagination.totalPage': res.totalPage
            });
            wx.hideNavigationBarLoading();
        }).catch((err) => {
            console.log(err);
        });
    },
    routeToInfo (e) {
        const { id } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/communityInfo/index?id=${id}`
        });
    },
    refresh () {
        this.initCommunityList();
    },
    loadMore () {
        
    }
});