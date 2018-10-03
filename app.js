//  .__                               .__    ________ ________ ________
//  |  | ___.__._______   ____ _____  |  |  /  _____//  _____//  _____/
//  |  |<   |  |\_  __ \_/ __ \\__  \ |  | /   __  \/   __  \/   __  \ 
//  |  |_\___  | |  | \/\  ___/ / __ \|  |_\  |__\  \  |__\  \  |__\  \
//  |____/ ____| |__|    \___  >____  /____/\_____  /\_____  /\_____  /
//       \/                  \/     \/            \/       \/       \/ 

App({
    globalData: {
        serverDomain: 'http://localhost:3000',
        userInfo: {
            openId: '',
        },
    },
    login() {
        const getCode = new Promise((resolve, reject) => {
            wx.login({
                success: res => {
                    if (res.code) {
                        resolve(res.code);
                    } else {
                        reject(res.errMsg)
                    }
                }
            });
        });

        const fetchOpenId = code => {
            return new Promise((resolve, reject) => {
                wx.request({
                    url: `${ this.globalData.serverDomain }/user/login`,
                    method: 'POST',
                    data: {
                        code
                    },
                    success(res) {
                        resolve(res.data);
                    },
                    fail() {
                        reject('服务器获取openId出错');
                    }
                })
            })
        };

        const saveData = data => {
            this.globalData.userInfo.openId = data.openId;
            return new Promise((resolve, reject) => {
                wx.setStorage({
                    key: 'openId',
                    data: data.openId,
                    success() {
                        resolve(data);
                    }
                });
            });
        };

        return new Promise((resolve, reject) => {
            getCode
                .then(fetchOpenId)
                .then(saveData)
                .then(data => resolve(data))
                .catch(err => console.error(err));
        })
    },
    onLaunch: function () {
        // this.login();
    },
})