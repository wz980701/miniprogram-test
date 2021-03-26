const app = getApp();
import { INIT_PAGE, INIT_SIZE, scrollConf } from '../../config/config';

Page({
    data: {
        active: 'user',
        size: INIT_SIZE,
        page: INIT_PAGE,
        scroll: scrollConf,
        scrollViewHeight: 0,
        headerHeight: 0,
        dynamicList: [],
        fromEdit: false
    },
    onLoad () {
        this.initScrollHeight();
        this.getDynamicList();
    },
    onShow () {
        console.log(this.data.fromEdit);
        if (this.data.fromEdit) {
            this.refresh();
        }
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
    refresh () {
        this.setData({
            page: 1,
            'scroll.pagination.page': 1
        });
        this.getDynamicList();
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
    onTabChange (e) {
        this.setData({
            active: e.detail.name
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