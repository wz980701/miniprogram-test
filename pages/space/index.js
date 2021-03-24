const app = getApp();
import { INIT_PAGE, INIT_SIZE, scrollConf } from '../../config/config';

Page({
    data: {
        active: 'user',
        size: INIT_SIZE,
        page: INIT_PAGE,
        scroll: scrollConf,
        windowHeight: 0,
        headerHeight: 0,
        scrollViewHeight: 0,
        dynamicList: []
    },
    onLoad () {
        this.initScrollHeight();
        this.getDynamicList();
    },
    getDynamicList (type) {
        const { size, page } = this.data;
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
    refresh () {
        this.setData({
            page: 1,
            'scroll.pagination.page': 1
        });
        this.getDynamicList();
    },
    loadMore () {
        const nextPage = this.data.page + 1;
        this.setData({
            page: nextPage,
            'scroll.pagination.page': nextPage
        });
        this.getDynamicList('loadMore');
    },
    onTabChange (e) {
        this.setData({
            active: e.detail.name
        });
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
        query.select('.tab-list').boundingClientRect();
        query.exec((res) => {
            let headerHeight = res[0].height;

            let scrollViewHeight = this.data.windowHeight - headerHeight;

            this.setData({
                headerHeight,
                scrollViewHeight
            });
        });
    },
});