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
        scroll: scrollConf
    },
    ready () {
        this.getCommunityDynamicList();
    },
    methods: {
        getCommunityDynamicList (type) {
            const { size, page, communityDynamicList } = this.data;
            app.wxRequest('/dynamic/communityList', {
                data: {
                    size,
                    page,
                    communityId: this.data.communityId
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
        communityRefresh () {
            this.setData({
                page: 1,
                'scroll.pagination.page': 1
            });
            this.getCommunityDynamicList();
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
        }
    }
});