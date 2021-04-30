const app = getApp();
import { INIT_PAGE, INIT_SIZE, scrollConf } from '../../config/config';

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
        scroll: scrollConf
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
    onSearch () {
        this.setData({
            size: INIT_SIZE,
            page: INIT_PAGE
        });
        this.getSearchList();
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