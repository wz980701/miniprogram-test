const app = getApp();
import bus from 'iny-bus';

Page({
    data: {
        dynamic: {},
        scrollViewHeight: 0
    },
    onLoad (options) {
        this.getDetail(options.id);
        this.initScrollHeight();
        this.setListener();
        this.updateBrowseTimes(options.id);
    },
    onUnload () {
        bus.remove('UPDATE_DYNAMIC', this.eventId);
    },
    setListener () {
        this.eventId = bus.on('UPDATE_DYNAMIC', (id) => {
            +id === this.data.dynamic.id && this.getDetail(id);
        });
    },
    updateBrowseTimes(id) {
        app.wxRequest('/dynamic/updateBrowseTimes', {
            data: {
                id
            }
        });
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
    onEdit () {
        wx.navigateTo({
            url: `/pages/dynamicEdit/index?id=${this.data.dynamic.id}`
        });
    },
    onDel () {
        const that = this;
        wx.showModal({
            content: '是否要删除该动态',
            success (res) {
                if (res.confirm) {
                    app.wxRequest('/dynamic/delete', {
                        data: {
                            dynamicId: that.data.dynamic.id
                        }
                    }).then((data) => {
                        bus.emit('UPDATE_DYNAMIC');
                        wx.navigateBack();
                    }).catch((err) => {
                        console.log(err);
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
});