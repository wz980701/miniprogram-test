const app = getApp();

Component({
    properties: {
        itemId: Number
    },
    data: {
        showDialog: false,
        content: ''
    },
    lifetimes: {
        attached: function () {
            this.setData({
                dynamicId: this.data.itemId
            });
        }
    },
    observers: {
        'itemId' (val) {
            if (val) {
                this.setData({
                    dynamicId: val
                });
            }
        }
    },
    methods: {
        showDialog () {
            this.setData({
                showDialog: true
            });
        },
        onCloseDialog () {
            this.setData({
                showDialog: false
            });
        },
        onInput (e) {
            this.setData({
                content: e.detail.value
            });
        },
        onSendComment () {
            const { content, dynamicId } = this.data;
            app.wxRequest('/dynamic/addComment', {
                method: 'post',
                data: {
                    content,
                    dynamicId
                }
            }).then((res) => {
                this.setData({
                    showDialog: false,
                    content: ''
                });
                wx.showToast({
                    icon: 'none',
                    title: '评论成功'
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    }
});