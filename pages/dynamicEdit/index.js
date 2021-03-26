const app = getApp();
const MAX_WORDS_NUM = 140;

Page({
    data: {
        wordsNum: 0,
        footerBottom: 0,
        image: '',
        selectPhoto: true,
        content: ''
    },
    onInput (e) {
        let wordsNum = e.detail.value.length;
        if (wordsNum >= MAX_WORDS_NUM) {
            wordsNum = `最大字数为${MAX_WORDS_NUM}`
        }
        this.setData({
            wordsNum,
            content: e.detail.value
        });
    },
    onFocus (e) {
        this.setData({
            footerBottom: e.detail.height
        });
    },
    onBlur () {
        this.setData({
            footerBottom: 0
        });
    },
    onChooseImage () {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                this.setData({
                    image: res.tempFilePaths[0],
                    selectPhoto: false
                });
            }
        });
    },
    onDelImage (e) {
        this.setData({
            image: '',
            selectPhoto: true
        });
    },
    onPreviewImage (e) {
        wx.previewImage({
            urls: [this.data.image],
            current: e.currentTarget.dataset.imgsrc
        });
    },
    send () {
        const { image, content } = this.data;
        if (content.trim() === '') {
            wx.showModal({
                title: '请输入内容',
                content: ''
            });
            return;
        }
        wx.showLoading({
            title: '发布中',
            mask: true
        });
        app.uploadFile('/dynamic/userRelease', image, {
            content
        }).then((res) => {
            wx.hideLoading();
            wx.showToast({
                title: '发布成功'
            });

            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.setData({
                fromEdit: true
            });

            wx.navigateBack();
        }).catch((err) => {
            wx.hideLoading();
            wx.showToast({
                title: '发布失败'
            });
        });
    }
});