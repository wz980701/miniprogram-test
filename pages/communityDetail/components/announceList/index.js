const app = getApp();
import { INIT_PAGE, INIT_SIZE, scrollConf } from '../../../../config/config';

Component({
    properties: {
        communityId: {
            type: String
        }
    },
    data: {
        size: INIT_SIZE,
        page: INIT_PAGE,
        scroll: scrollConf,
        announceList: {}
    },
    ready () {
        this.getAnnounceList();
    },
    methods: {
        refresh () {
            this.setData({
                page: 1,
                'scroll.pagination.page': 1
            });
            this.getAnnounceList();
        },
        loadMore () {
            const nextPage = this.data.page + 1;
            this.setData({
                page: nextPage,
                'scroll.pagination.page': nextPage
            });
            this.getAnnounceList('loadMore');
        },
        getAnnounceList (type) {
            const { size, page, announceList } = this.data;
            app.wxRequest('/community/getAnnounceList', {
                data: {
                    size,
                    page,
                    communityId: this.data.communityId
                }
            }).then((res) => {
                res && this.setData({
                    announceList: type === 'loadMore' ? [...announceList, ...res.data] : res.data,
                    'scroll.pagination.length': res.count,
                    'scroll.pagination.totalPage': res.totalPage
                });
                wx.hideNavigationBarLoading();
            }).catch((err) => {
                console.log(err);
            });
        },
        delete (e) {
            const that = this;
            wx.showModal({
                content: '是否要删除该公告',
                success (res) {
                    if (res.confirm) {
                        const { id } = e.currentTarget.dataset;
                        app.wxRequest('/community/deleteAnnounce', {
                            data: {
                                id
                            }
                        }).then((res) => {
                            console.log(res);
                            that.refresh();
                        }).catch((err) => {
                            wx.showToast({
                                icon: 'none',
                                title: '删除失败'
                            });
                        });
                    }
                },
                fail (err) {
                    console.log(err);
                }
            });
        }
    }
});