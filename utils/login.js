export const SESSION_KEY = 'sessionId';

import API from './api';

let isLogining = false;

export function doLogin() {
    return new Promise((resolve, reject) => {
        const session = wx.getStorageSync(SESSION_KEY);
        const token = wx.getStorageSync('token');
        if (session && token) {
            resolve();
        } else if (isLogining) {
            setTimeout(() => {
                doLogin().then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            }, 500);
        } else {
            isLogining = true;
            wx.login({
                success: (res) => {
                    if (res.code) {
                        wx.request({
                            method: 'post',
                            url: API.login,
                            data: {
                                code: res.code
                            },
                            success: (resp) => {
                                const res = resp.data;
                                console.log(res);
                                isLogining = false;
                                if (res.code === 200) {
                                    const { token, session_key } = res.data;
                                    wx.setStorageSync(SESSION_KEY, session_key);
                                    wx.setStorageSync('token', token);
                                    resolve();
                                } else {
                                    reject(res.msg);
                                }
                            },
                            fail: err => {
                                isLogining = false;
                                reject(err);
                            }
                        });
                    } else {
                        isLogining = false;
                        reject();
                    }
                },
                fail: (err) => {
                    isLogining = false;
                    reject(err);
                }
            })
        }
    });
}