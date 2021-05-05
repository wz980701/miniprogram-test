const app = getApp();

Page({
    data: {
        searchText: ''
    },
    onLoad(options) {
        this.setData({
            communityId: options.communityId
        });
        this.userList = this.selectComponent('#userList');
        this.initScrollHeight();
    },
    initScrollHeight() {
        const that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: res.windowHeight - 54
                });
            }
        });  
    },
    onSearch() {
        const { searchText } = this.data;
        this.userList.getUserList('', {
            text: searchText
        });
    },
    onClear() {
        this.userList.clearUserList();
    },
    addManager(e) {
        wx.showModal({
            content: '是否要添加为管理员',
            success (res) {
                if (res.confirm) {
                    const { id } = e.detail;
                    app.wxRequest('/community/addManager', {
                        data: {
                            id
                        }
                    }).then((res) => {
                        wx.showToast({
                            title: '添加管理员成功'
                        });
                        this.setData({
                            searchText: ''
                        });
                        this.userList.clearUserList();
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