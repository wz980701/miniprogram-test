const app = getApp();

Page({
    data: {
        dynamic: {},
        scrollViewHeight: 0
    },
    onLoad (options) {
        this.getDetail(options.id);
        this.initScrollHeight();
    },
    getDetail (id) {
        app.wxRequest('/dynamic/detail', {
            data: {
                dynamicId: id
            }
        }).then((res) => {
            res && this.setData({
                dynamic: res
            });
        }).catch((err) => {
            console.log(err);
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
        query.select('.header').boundingClientRect();
        query.select('.dynamic-control').boundingClientRect();
        query.exec((res) => {
            let headerHeight = res[0].height;
            let footerHeight = res[1].height;

            let scrollViewHeight = windowHeight - headerHeight - footerHeight;

            this.setData({
                scrollViewHeight
            });
        });
    },
});