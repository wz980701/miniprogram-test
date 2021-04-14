const app = getApp();
import { INIT_PAGE, INIT_SIZE, scrollConf } from '../../config/config';
import bus from 'iny-bus';

Page({
    data: {
        active: 'user',
        size: INIT_SIZE,
        page: INIT_PAGE,
        scroll: scrollConf,
        scrollViewHeight: 0,
        headerHeight: 0,
        dynamicList: [],
        communityDynamicList: [],
        isCommunity: false
    },
    onLoad () {
        this.initScrollHeight();
        this.getDynamicList();
        this.getCommunityDynamicList();
        this.setListener();
    },
    setListener () {
        bus.on('UPDATE_DYNAMIC', () => {
            this.refresh();
        });
    },
    getDynamicList (type) {
        const { size, page, dynamicList } = this.data;
        app.wxRequest('/dynamic/userList', {
            data: {
                size,
                page
            }
        }).then((res) => {
            res && this.setData({
                dynamicList: type === 'loadMore' ? [...dynamicList, ...res.data] : res.data,
                'scroll.pagination.length': res.count,
                'scroll.pagination.totalPage': res.totalPage
            });
            wx.hideNavigationBarLoading();
        }).catch((err) => {
            console.log(err);
        });
    },
    getCommunityDynamicList (type) {
        const { size, page, communityDynamicList } = this.data;
        app.wxRequest('/dynamic/communityList', {
            data: {
                size,
                page
            }
        }).then((res) => {
            res && this.setData({
                communityDynamicList: type === 'loadMore' ? [...communityDynamicList, ...res.data] : res.data,
                'scroll.pagination.length': res.count,
                'scroll.pagination.totalPage': res.totalPage
            });
            wx.hideNavigationBarLoading();
        }).catch((err) => {
            console.log(err);
        });
    },
    refresh () {
        this.setData({
            page: 1,
            'scroll.pagination.page': 1
        });
        this.getDynamicList();
    },
    communityRefresh () {
        this.setData({
            page: 1,
            'scroll.pagination.page': 1
        });
        this.getCommunityDynamicList();
    },
    loadMore () {
        const { page, size, dynamicList } = this.data;
        if (dynamicList.length < size)  {
            wx.hideNavigationBarLoading();
            return;
        }
        const nextPage = page + 1;
        this.setData({
            page: nextPage,
            'scroll.pagination.page': nextPage
        });
        this.getDynamicList('loadMore');
    },
    communityLoadMore () {
        const { page, size, communityDynamicList } = this.data;
        if (communityDynamicList.length < size)  {
            wx.hideNavigationBarLoading();
            return;
        }
        const nextPage = page + 1;
        this.setData({
            page: nextPage,
            'scroll.pagination.page': nextPage
        });
        this.getCommunityDynamicList('loadMore');
    },
    onTabChange (e) {
        this.setData({
            active: e.detail.name,
            isCommunity: e.detail.name === 'community'
        });
    },
    initScrollHeight () {
        let windowHeight;
        wx.getSystemInfo({
            success: function(res) {
                windowHeight = res.windowHeight;
            }
        });
        let query = wx.createSelectorQuery().in(this);
        query.select('.tab-list').boundingClientRect();
        query.exec((res) => {
            let headerHeight = res[0].height;

            let scrollViewHeight = windowHeight - headerHeight;

            this.setData({
                scrollViewHeight,
                headerHeight
            });
        });
    },
    routeToEdit () {
        wx.navigateTo({
            url: '/pages/dynamicEdit/index'
        });
    }
});