const app = getApp();

Page({
    data: {
        searchContent: '',
        hotList: [],
        swiperImgList: ['https://graduation-jeremy.oss-cn-beijing.aliyuncs.com/lamp/lamp1.jfif', 'https://graduation-jeremy.oss-cn-beijing.aliyuncs.com/lamp/lamp2.jfif', 'https://graduation-jeremy.oss-cn-beijing.aliyuncs.com/lamp/lamp3.jfif'],
    },
    onLoad () {
        this.getHotList();
    },
    onShow() {
        this.getHotList();
    },
    getHotList() {
        app.wxRequest('/dynamic/getHotList', {}).then((res) => {
            this.setData({
                hotList: res
            });
        }).catch((err) => {
            console.log(err);
        });
    }
});