const app = getApp();
const MAX_WORDS_NUM = 140;
import bus from 'iny-bus';

Page({
    data: {
        wordsNum: 0,
        footerBottom: 0,
        image: '',
        selectPhoto: true,
        content: '',
        fromEdit: false
    },
    onLoad (options) {
        options.id && this.getDynamicDetail(options.id);
    },
    getDynamicDetail (id) {
        const that = this;
        app.wxRequest('/dynamic/detail', {
            data: {
                dynamicId: id
            }
        }).then((res) => {
            if (res) {
                wx.downloadFile({
                    url: res.img,
                    success (files) {
                      const tempFilePath = files.tempFilePath;
                      that.setData({
                        content: res.content,
                        wordsNum: res.content.length,
                        image: tempFilePath,
                        selectPhoto: false,
                        fromEdit: true,
                        dynamicId: id
                      });
                    },
                    fail (err) {
                        console.log(err);
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
        });
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
    async send () {
        const { image, content, fromEdit, dynamicId } = this.data;
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
        const formData = { content };
        fromEdit && (formData.dynamicId = dynamicId);
        app.uploadFile(`/dynamic/${fromEdit ? 'edit' : 'userRelease'}`, image, formData).then((res) => {
            bus.emit('UPDATE_DYNAMIC', dynamicId);
            wx.hideLoading();
            wx.showToast({
                title: '发布成功'
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