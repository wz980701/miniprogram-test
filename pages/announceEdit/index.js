const app = getApp();

Page({
    data: {
        content: ''
    },
    onLoad(options) {
        this.setData({
            communityId: options.communityId
        });
    },
    onSubmit() {
        const { content, communityId } = this.data;
        if (!content) {
            wx.showToast({
                icon: 'none',
                title: '输入内容不能为空'
            });
        }
        app.wxRequest('/community/addAnnounce', {
            method: 'post',
            data: {
                content,
                communityId
            }
        }).then((res) => {
            console.log(res);
            wx.showToast({
                title: '发布成功'
            });
            this.setData({
                content: ''
            });
        }).catch((err) => {
            console.log(err);
            wx.showToast({
                type: 'error',
                title: '发布失败'
            });
        });
    }
});