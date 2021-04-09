const app = getApp();

import { INIT_PAGE, INIT_SIZE, scrollConf } from '../../../../config/config';

const MAP = {
    'joined': 1,
    'passing': 0,
    'created': 100
}

Component({
    properties: {
        type: {
            type: String
        },
        scrollHeight: {
            type: Number
        }
    },
    lifetimes: {
        attached: function () {
            this.setData({
                curType: this.data.type
            });
            this.getCommunityList();
        }
    },
    observers: {
        'type': function (type) {
            this.setData({
                curType: type
            });
            this.getCommunityList();
        }
    },
    data: {
        communityList: [],
        size: INIT_SIZE,
        page: INIT_PAGE,
        curType: '',
        scroll: scrollConf
    },
    methods: {
        getCommunityList (type) {
            const { size, page, communityList, curType } = this.data;
            app.wxRequest('/community/getSelectCommunityList', {
                data: {
                    size,
                    page,
                    level: MAP[curType]
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
            this.getCommunityList('loadMore');
        },
        cancelApply (e) {
            const { id } = e.currentTarget.dataset;
            const that = this;
            wx.showModal({
                content: '是否要取消申请',
                success (res) {
                    if (res.confirm) {
                        app.wxRequest('/community/cancelApply', {
                            data: {
                                id
                            }
                        }).then((res) => {
                            console.log(res);
                            wx.showToast({
                                icon: 'none',
                                title: '已取消申请'
                            });
                            that.refresh();
                        }).catch((err) => {
                            console.log(err);
                            wx.showToast({
                                icon: 'none',
                                title: '取消申请失败'
                            });
                        });
                    }
                },
                fail (err) {
                    console.log(err);
                }
            });
        },
        routeToInfo (e) {
            const { id } = e.currentTarget.dataset;
            wx.navigateTo({
                url: `/pages/communityInfo/index?id=${id}`
            });
        },
    }
});