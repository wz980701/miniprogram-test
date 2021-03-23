const app = getApp();

const INIT_PAGE = 1;
const INIT_SIZE = 8;

Page({
    data: {
        searchContent: '',
        communityList: [],
        size: INIT_SIZE,
        page: INIT_PAGE,
        windowHeight: 0,
        headerHeight: 0,
        scrollViewHeight: 0,
        listType: 'all',
        scroll: {
            pagination: {
                page: INIT_PAGE,
                totalPage: 0,
                limit: INIT_SIZE,
                length: 0
            },
            empty: {
                img: 'https://graduation-jeremy.oss-cn-beijing.aliyuncs.com/default/空.png'
            },
            refresh: {
                type: 'default',
                style: 'black',
                background: '#000'
            },
            loadmore: {
                type: 'default',
                icon: {
                    img:  'http://upload-images.jianshu.io/upload_images/5726812-95bd7570a25bd4ee.gif'
                },
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
        this.initScrollHeight();
        this.getCommunityList();
    },
    initScrollHeight () {
        const that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    windowHeight: res.windowHeight
                });
            }
        });
        let query = wx.createSelectorQuery().in(this);
        query.select('.header').boundingClientRect();
        query.exec((res) => {
            let headerHeight = res[0].height;

            let scrollViewHeight = this.data.windowHeight - headerHeight;

            this.setData({
                scrollViewHeight
            });
        });
    },
    getCommunityList (type) {
        const { size, page, communityList } = this.data;
        app.wxRequest('/community/allCommunityList', {
            data: {
                size,
                page
            }
        }).then((res) => {
            res && this.setData({
                communityList: type === 'loadMore' ? [...communityList, ...res.data] : res.data,
                'scroll.pagination.length': res.count,
                'scroll.pagination.totalPage': res.totalPage
            });
            wx.hideNavigationBarLoading();
        }).catch((err) => {
            console.log(err);
        });
    },
    onChange(e) {
        this.setData({
          searchContent: e.detail,
        });
    },
    onClear () {
        this.refresh();
    },
    onBlur () {
        this.data.searchContent.length === 0 && this.refresh();
    },
    getSearchList (type) {
        const { searchContent, communityList, size, page } = this.data;
        app.wxRequest('/community/search', {
            method: 'post',
            data: {
                text: searchContent,
                size,
                page
            }
        }).then((res) => {
            res && this.setData({
                listType: 'search',
                communityList: type === 'loadMore' ? [...communityList, ...res.data] : res.data,
                'scroll.pagination.length': res.count,
                'scroll.pagination.totalPage': res.totalPage
            });
            wx.hideNavigationBarLoading();
        }).catch((err) => {
            console.log(err);
        })
    },
    routeToInfo (e) {
        const { id } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/communityInfo/index?id=${id}`
        });
    },
    refresh () {
        this.setData({
            page: 1,
            'scroll.pagination.page': 1
        });
        this.getCommunityList();
    },
    loadMore () {
        const nextPage = this.data.page + 1;
        this.setData({
            page: nextPage,
            'scroll.pagination.page': nextPage
        });
        if (this.data.listType === 'all') {
            this.getCommunityList('loadMore');
        } else {
            this.getSearchList('loadMore');
        }
    }
});