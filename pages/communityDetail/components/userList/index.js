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
        userList: {}
    },
    ready () {
        this.getUserList();
    },
    methods: {
        refresh () {
            this.setData({
                page: 1,
                'scroll.pagination.page': 1
            });
            this.getUserList();
        },
        loadMore () {
            const nextPage = this.data.page + 1;
            this.setData({
                page: nextPage,
                'scroll.pagination.page': nextPage
            });
            this.getUserList('loadMore');
        },
        getUserList (type) {
            const { size, page, userList } = this.data;
            app.wxRequest('/community/getUsers', {
                data: {
                    size,
                    page,
                    communityId: this.data.communityId
                }
            }).then((res) => {
                res && this.setData({
                    userList: type === 'loadMore' ? [...userList, ...res.data] : res.data,
                    'scroll.pagination.length': res.count,
                    'scroll.pagination.totalPage': res.totalPage
                });
                wx.hideNavigationBarLoading();
            }).catch((err) => {
                console.log(err);
            });
        }
    }
});