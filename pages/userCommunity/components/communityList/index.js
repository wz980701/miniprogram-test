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
        }
    }
});