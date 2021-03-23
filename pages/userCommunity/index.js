const app = getApp();

Page({
    data: {
        active: 'passing',
        windowHeight: 0,
        headerHeight: 0,
        scrollViewHeight: 0,
    },
    onLoad (options) {
        this.setData({
            active: options.id
        });
        this.initScrollHeight();
    },
    initScrollHeight () {
        const that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    windowHeight: res.windowHeight
                });
            }
        });
        let query = wx.createSelectorQuery().in(this);
        query.select('.tab-list').boundingClientRect();
        query.exec((res) => {
            let headerHeight = res[0].height;

            let scrollViewHeight = this.data.windowHeight - headerHeight;

            this.setData({
                scrollViewHeight
            });
        });
    },
    onTabChange (e) {
        this.setData({
            active: e.detail.name
        });
        console.log(this.data.active);
    }
});