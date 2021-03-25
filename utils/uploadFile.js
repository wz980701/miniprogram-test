import { host } from './request';

export const uploadFile = (subUrl, tempFilePath, formData = {}) => {
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: `${host}${subUrl}`,
            filePath: tempFilePath,
            name: 'file',
            header: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${wx.getStorageSync('token') || ''}`
            },
            formData,
            success: function () {
                resolve();
            },
            fail: function () {
                reject();
            }
        });
    });
}