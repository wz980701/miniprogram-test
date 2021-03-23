Page({
    data: {
        active: 'user'
    },
    onTabChange (e) {
        this.setData({
            active: e.detail.name
        });
    }
});