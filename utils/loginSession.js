import { doLogin, SESSION_KEY } from './login';

let isCheckingSession = false;
let isSessionFresh = false;

export function checkSession() {
    return new Promise((resolve, reject) => {
        const session = wx.getStorageSync(SESSION_KEY);
        const token = wx.getStorageSync('token');
        if (isCheckingSession) {
            setTimeout(() => {
                checkSession().then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            }, 500);
        } else if (!isSessionFresh && session && token) {
            isCheckingSession = true;
            wx.checkSession({
                success: () => {
                    isSessionFresh = true;
                    resolve(true);
                },
                fail: () => {
                    wx.removeStorage({
                        key: SESSION_KEY,
                        complete: () => {
                            doLogin().then(() => {
                                resolve();
                            }).catch(err => {
                                reject(err);
                            });
                        }
                    });
                },
                complete: () => {
                    isCheckingSession = false;
                }
            });
        } else if (!token) {
            wx.removeStorageSync({ key: SESSION_KEY });
            wx.removeStorageSync({ key: 'token' });
            doLogin().then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        } else {
            doLogin().then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        }
    });
}

