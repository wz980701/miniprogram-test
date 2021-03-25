const app = getApp();

Component({
    properties: {
        item: Object
    },
    observers: {
        'item' (val) {
            if (val) {
                this.setData({
                    dynamic: val
                });
            }
        }
    },
    lifetimes: {
        attached: function () {
            this.setData({
                dynamic: this.data.item
            });
        }
    },
    data: {
        dynamic: {}
    },
    methods: {
        onPreviewImage (e) {
            const { imgsrc } = e.currentTarget.dataset;
            wx.previewImage({
                current: imgsrc,
                urls: [imgsrc]
            });
        },
        routeToDetail () {
            wx.navigateTo({
                url: `/pages/dynamicDetail/index?id=${this.data.dynamic.id}`
            });
        }
    }
});