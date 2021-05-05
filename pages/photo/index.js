const app = getApp();

Page({
    data: {
        imgList: []
    },
    onLoad(options) {
        this.setData({
            communityId: options.communityId
        });
        this.getPhotoList();
    },
    getPhotoList() {
        app.wxRequest('/file/getImgs', {
            data: {
                communityId: this.data.communityId
            }
        }).then(res => {
            const arr = [];
            res.data.map((item) => {
                arr.push(item.url);
            });
            this.setData({
                imgList: arr
            });
        }).catch(err => {
            console.log(err);
        });
    },
    onPreviewImg(e) {
        const { src } = e.currentTarget.dataset;
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: this.data.imgList // 需要预览的图片http链接列表
        });
    }
});