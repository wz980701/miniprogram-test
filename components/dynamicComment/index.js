const app = getApp();
import { INIT_PAGE, INIT_SIZE, scrollConf } from '../../config/config';

Component({
    properties: {
        currentId: Number,
        scrollViewHeight: Number
    },
    data: {
        size: INIT_SIZE,
        page: INIT_PAGE,
        scroll: scrollConf,
        commentList: []
    },
    lifetimes: {
        attached: function () {
            const { currentId, scrollViewHeight } = this.data;
            this.setData({
                dynamicId: currentId,
                curScrollViewHeight: scrollViewHeight
            });
            this.getCommentList();
        }
    },
    observers: {
        'currentId' (val) {
            if (val) {
                this.setData({
                    dynamicId: val
                });
                this.getCommentList();
            }
        },
        'scrollViewHeight' (scrollViewHeight) {
            this.setData({
                curScrollViewHeight: scrollViewHeight
            });
        }
    },
    methods: {
        getCommentList (type) {
            const { size, page, commentList, dynamicId } = this.data;
            app.wxRequest('/dynamic/commentList', {
                data: {
                    dynamicId,
                    size,
                    page
                }
            }).then((res) => {
                res && this.setData({
                    commentList: type === 'loadMore' ? [...commentList, ...res.data] : res.data,
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
            this.getCommentList();
        },
        loadMore () {
            const nextPage = this.data.page + 1;
            this.setData({
                page: nextPage,
                'scroll.pagination.page': nextPage
            });
            this.getCommentList('loadMore');
        }
    }
});