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
    }
});