const app = getApp();
import { INIT_PAGE, INIT_SIZE, scrollConf } from '../../config/config';

Component({
    properties: {
        communityId: {
            type: String
        },
        listType: {
            type: String
        },
        scrollHeight: {
            type: Number
        }
    },
    data: {
        size: INIT_SIZE,
        page: INIT_PAGE,
        scroll: scrollConf,
        userList: {}
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
        getUserList (type, remainData = {}) {
            const { size, page, userList, listType } = this.data;
            app.wxRequest(`/community/${listType}`, {
                data: {
                    size,
                    page,
                    communityId: this.data.communityId,
                    ...remainData
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
        },
        clearUserList() {
            this.setData({
                size: INIT_SIZE,
                page: INIT_PAGE,
                userList: {}
            });
        },
        addManager(e) {
            this.triggerEvent('addManager', {
                id: e.currentTarget.dataset.id
            });
        },
        getApplyList(e) {
            this.triggerEvent('getApplyList', {
                id: e.currentTarget.dataset.id
            });
        }
    }
});