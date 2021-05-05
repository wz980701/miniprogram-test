const app = getApp();

Page({
    data: {

    },
    onLoad(options) {
        this.setData({
            communityId: options.communityId
        });
        this.initScrollHeight();
        this.selectComponent('#userList').getUserList();
    },
    initScrollHeight() {
        const that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: res.windowHeight
                });
            }
        });  
    },
    sendApplyRequest(e) {
        const that = this;
        wx.showModal({
            content: '是否通过该申请',
            success (res) {
                if (res.confirm) {
                    const { id } = e.detail;
                    app.wxRequest('/community/passUser', {
                        data: {
                            id
                        }
                    }).then((res) => {
                        wx.showToast({
                            title: '该用户成功加入社团'
                        });
                        that.selectComponent('#userList').getUserList();
                    }).catch((err) => {
                        wx.showToast({
                            icon: 'none',
                            title: err.data.msg
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