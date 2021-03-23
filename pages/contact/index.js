const app = getApp();

Page({
    data: {
        message: ''
    },
    onSubmit () {
        app.wxRequest('/user/message', {
            method: 'post',
            data: {
                content: this.data.message
            }
        }).then((res) => {
            wx.showToast({
                icon: 'none',
                title: '提交成功'
            });
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
});