const host = 'http://localhost:3000/api';
const app = getApp();

import { checkSession } from './loginSession';

const mergeRequestParams = (defaults, params) => {
    return Object.assign({}, defaults, params);
}

const wxRequest = async (subUrl, params = {}) => {
    const defaults = {
        header: {
            "Content-Type": "application/json"
        },
        method: "GET",
        data: {}
    }

    const options = mergeRequestParams(defaults, params);
    let res = await new Promise((resolve, reject) => {
        const status = wx.getStorageSync('isRegist');
        if (!status) reject('未授权');
        checkSession().then(() => {
            let url = host + subUrl;
            const { header, method, data } = options;
            wx.request({
                url,
                header: {
                    ...header,
                    "Authorization": `Bearer ${wx.getStorageSync('token') || ''}`
                }, 
                method,
                data,
                success: async res => {
                    const { code, data: resData } = res.data;
                    if (res && code === 200) {
                        if (resData) resolve(resData);
                        else resolve(res.data);
                    } else {
                        let err = {
                            request: res.request,
                            response: res.data
                        }
                        res.err = err;
                        if (res.data && (res.data.error_code === 10001)) {
                            wx.removeStorageSync('token');
                            return await wxRequest(subUrl, params);
                        }
                        reject(res);
                    }
                },
                fail: err => {
                    reject(err);
                }
            });
        }).catch((err) => {
            reject(err);
        });
    });
    return res;
}

export {
    wxRequest
}