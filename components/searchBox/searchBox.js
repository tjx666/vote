const app = getApp();

Component({
    properties: {

    },
    data: {
        showResultList: false,
        searchResultList: [
            {
                id: 1,
                name: '张三',
                acquiredCount: 180,
            },
            {
                id: 2,
                name: '李四',
                acquiredCount: 160,
            },
            {
                id: 3,
                name: '王二',
                acquiredCount: 120
            }
        ]
    },
    methods: {
        handleFocus(event){
            this.setData({
                showResultList: true
            });
        },
        handleSelect(event) {
            this.setData({
                showResultList: false
            });
            const candidateId = event.currentTarget.dataset.selectCandidateId;
            this.triggerEvent('selectcandidate', {candidateId}, { bubbles: false, composed: false })
        },
        handleInput(event) {
        },
        handleChange(event) {
            // !: 没有服务器下面的处理不要打开
            return;
            const fuzzyName = event.detail.value;
            const fuzzySearchCandidate = new Promise((resolve, reject) => {
                wx.request({
                    url: `${ app.globalData.serverDomain }/api/v1/candidates`,
                    method: 'get',
                    data: {
                        fuzzyName
                    },
                    success (res) {
                        resolve(res.data);
                    },
                    fail() {
                        reject('get candidates from server failed by fuzzyName');
                    }
                })
            });

            fuzzySearchCandidate
                .then(candidates => {
                    this.setData({
                        searchResultList: candidates
                    })
                });
        },
        pullResultList() {
            this.setData({
                showResultList: false
            });
        }
    }
})