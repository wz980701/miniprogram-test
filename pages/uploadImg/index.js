const app = getApp();
const MAX_COUNT = 9;

Page({
    data: {
        imgList: [],
        deletePhoto: true,
        isUploading: false
    },
    onLoad(options) {
        this.setData({
            maxCount: options.maxCount || MAX_COUNT,
            communityId: options.communityId,
            imgType: options.imgType || 'uploadImgs'
        });
    },
    onChooseImage() {
        wx.chooseImage({
            count: this.data.maxCount,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                this.setData({
                    imgList: [...this.data.imgList, ...res.tempFilePaths]
                });
            }
        });
    },
    onDelImage(e) {
        const imgList = this.data.imgList.filter((item) => {
            return item !== e.currentTarget.dataset.imgsrc
        });
        this.setData({
            imgList
        });
    },
    onPreviewImage (e) {
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.imgsrc
        });
    },
    delete() {
        this.setData({
            deletePhoto: !this.data.deletePhoto
        });
    },
    upload() {
        const promises = [];
        const { imgType, imgList, communityId, maxCount } = this.data;
        if (imgList.length > maxCount) {
            wx.showToast({
                icon: 'none',
                title: '上传图片超过限制，请重新上传'
            });
            return;
        }
        wx.showLoading({
            title: '上传中',
            mask: true
        });
        for (let item of imgList) {
            const promise = app.uploadFile(`/file/${imgType}`, item, {
                communityId
            });
            promises.push(promise);
        }
        Promise.all(promises).then((res) => {
            wx.hideLoading();
            wx.showToast({
                title: '上传成功'
            });
        }).catch((err) => {
            console.log(err);
            wx.hideLoading();
            wx.showToast({
                icon: 'error',
                title: '上传失败'
            });
        });
    }
});