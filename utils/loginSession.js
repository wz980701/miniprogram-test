import { doLogin, SESSION_KEY } from './login';

let isCheckingSession = false;
let isSessionFresh = false;

export function checkSession() {
    return new Promise((resolve, reject) => {
        const session = wx.getStorageSync(SESSION_KEY);
        if (isCheckingSession) {
            setTimeout(() => {
                checkSession().then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            }, 500);
        } else if (!isSessionFresh && session) {
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
        } else {
            doLogin().then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        }
    });
}

