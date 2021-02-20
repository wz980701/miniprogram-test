export const SESSION_KEY = 'sessionId';
let isLogining = false;

export function doLogin() {
    return new Promise((resolve, reject) => {
        const session = wx.getStorageSync(SESSION_KEY);
        if (session) {
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
                            url: API.login,
                            data: {
                                code: res.code
                            },
                            success: (res) => {
                                const data = res.data;
                                isLogining = false;
                                if (data.code === 200) {
                                    wx.setStorageSync(SESSION_KEY, data[SESSION_KEY]);
                                    resolve();
                                } else {
                                    reject(data.msg);
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