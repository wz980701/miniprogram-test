const app = getApp();

Page({
    data: {
        communityInfo: {},
        active: 'userList'
    },
    onLoad(options) {
        const { level, id } = options;
        this.setData({
            level,
            id
        });
        this.getCommuntiyInfo();
        this.setUserIdentity();
    },
    onShow() {
        this.getCommuntiyInfo();
    },
    getCommuntiyInfo () {
        app.wxRequest('/community/getInfo', {
            data: {
                communityId: this.data.id
            }
        }).then((res) => {
            console.log(res);
            this.setData({
                communityInfo: res
            });
        }).catch((err) => {
            console.log(err);
            wx.showToast({
                title: '获取社团信息失败'
            });
        })
    },
    setUserIdentity () {
        let ident;
        console.log('level>>', this.data.level);
        switch (this.data.level) {
            case '1': 
                ident = '成员';
                break;
            case '10': 
                ident = '管理员';
                break;
            case '100':
                ident = '社长';
                break;
        }
        console.log('ident>>', ident);
        this.setData({
            userIdent: ident
        });
    }
});
