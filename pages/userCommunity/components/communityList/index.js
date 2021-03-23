const app = getApp();

const INIT_PAGE = 1;
const INIT_SIZE = 8;
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